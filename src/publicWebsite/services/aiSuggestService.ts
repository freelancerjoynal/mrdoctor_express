// Thana-portal "can't figure out the category?" box.
// Same triage idea as the WhatsApp chatbot: DeepSeek picks ONE category
// from the FULL master speciality list using problem + age + weight,
// then doctors are searched LOCALLY (chambers in this thana only).
// Isolated from whatsappChatbot — the DeepSeek call is duplicated here
// on purpose so publicWebsite never imports across modules.
import OpenAI from 'openai';
import { prisma } from '../../lib/prisma.js';
import { DOCTOR_SPECIALITIES } from '../../lib/doctorSpeciality.js';
import { env } from '../../config/env.js';

const openai = new OpenAI({
  apiKey: env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com',
});

export interface AiSuggestInput {
  problem: string;
  age?: number | null;
  weight?: number | null;
  gender?: 'male' | 'female' | null;
  division?: string;
  district?: string;
  thana?: string;
  limit?: number;
}

export interface AiSuggestResult {
  speciality_bn: string;
  speciality_en: string;
  doctors: any[];
  total: number;
}

const MASTER = DOCTOR_SPECIALITIES.map((s) => ({ bn: s.specialty_bn, en: s.specialty_en }));

/** DeepSeek triage over the FULL master list (never the tiny thana list). */
async function pickCategory(
  problem: string,
  age?: number | null,
  weight?: number | null,
  gender?: 'male' | 'female' | null,
) {
  const cleanProblem = (problem || '').trim().replace(/\s+/g, ' ').slice(0, 300);
  if (cleanProblem.length < 3) return null;
  const vitals: string[] = [];
  if (gender === 'male' || gender === 'female') vitals.push(`Gender: ${gender}`);
  if (Number.isFinite(age as number) && (age as number) > 0) vitals.push(`Age: ${age}`);
  if (Number.isFinite(weight as number) && (weight as number) > 0) vitals.push(`Weight: ${weight} kg`);

  const prompt =
    `You are a Bangladesh medical symptom triage classifier.\n` +
    `Rules (follow strictly):\n` +
    `- Fever, cold, cough, sneezing, runny nose, headache, weakness, acidity, stomach pain, diarrhea, vomiting, flu -> the General Medicine entry (মেডিসিন বিশেষজ্ঞ).\n` +
    `- Pick a specialized entry ONLY when symptoms clearly match it: chest pain/pressure -> Cardiology, skin rash/itch/allergy -> Dermatology, pregnancy/menstrual/delivery -> Gynecology, child/baby patient -> Pediatrics, tooth pain -> Dentistry, eye problem -> Ophthalmology, ear/nose/throat pain -> ENT, bone/joint fracture -> Orthopedic, kidney/urine -> Nephrology/Urology, diabetes/thyroid -> Diabetes & Hormone, mental stress/sleep -> Psychiatry, breathing/asthma -> Pulmonology/Chest, back/body pain lasting weeks -> Physical Medicine.\n` +
    `- Consider age/weight/gender when given (child patient -> Pediatrics entry; pregnancy/menstrual/delivery symptoms in a female patient -> Gynecology entry).\n` +
    `- If unsure, pick the General Medicine entry.\n` +
    `- Never invent a name. Reply with ONE exact Bengali name from the allowed list.\n` +
    `Patient problem: ${cleanProblem}\n` +
    (vitals.length ? `${vitals.join('. ')}\n` : '') +
    `Allowed specialities:\n${MASTER.map((s) => `- ${s.bn}`).join('\n')}\n` +
    `Reply with JSON ONLY, no other text: {"speciality":"<one exact name from the allowed list>"}`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'deepseek-chat',
      temperature: 0,
      max_tokens: 150,
      messages: [
        { role: 'system', content: 'You are a medical triage classifier. Reply with JSON only.' },
        { role: 'user', content: prompt },
      ],
    });
    const reply = completion.choices[0]?.message?.content || '';
    const start = reply.indexOf('{');
    const end = reply.lastIndexOf('}');
    if (start === -1 || end === -1 || end <= start) return null;
    const obj = JSON.parse(reply.slice(start, end + 1)) as { speciality?: unknown };
    const pick = typeof obj.speciality === 'string' ? obj.speciality.trim() : '';
    if (!pick) return null;
    const exact = MASTER.find((s) => s.bn === pick);
    if (exact) return exact;
    return MASTER.find((s) => pick.includes(s.bn) || s.bn.includes(pick)) ?? null;
  } catch (e) {
    console.error('❌ ai-suggest triage error:', e);
    return null;
  }
}

export async function suggestDoctorsForPortal(input: AiSuggestInput): Promise<AiSuggestResult | null> {
  const { division, district, thana } = input;
  const limit = Math.min(Math.max(input.limit ?? 12, 1), 24);
  const picked = await pickCategory(input.problem, input.age, input.weight, input.gender);
  if (!picked) return null;

  const where: any = { status: 'APPROVED', speciality: picked.bn };
  if (division || district || thana) {
    where.chambers = {
      some: {
        ...(division ? { division: { contains: division, mode: 'insensitive' as const } } : {}),
        ...(district ? { district: { contains: district, mode: 'insensitive' as const } } : {}),
        ...(thana ? { thana: { contains: thana, mode: 'insensitive' as const } } : {}),
      },
    };
  }

  const [total, doctors] = await prisma.$transaction([
    prisma.doctor.count({ where }),
    prisma.doctor.findMany({
      where,
      select: {
        username: true,
        name: true,
        degree: true,
        speciality: true,
        tagline: true,
        profilePicture: true,
        chambers: {
          where: {
            ...(division ? { division: { contains: division, mode: 'insensitive' as const } } : {}),
            ...(district ? { district: { contains: district, mode: 'insensitive' as const } } : {}),
            ...(thana ? { thana: { contains: thana, mode: 'insensitive' as const } } : {}),
          },
          take: 3,
          select: {
            id: true,
            chamberName: true,
            addressLine: true,
            thana: true,
            district: true,
            division: true,
            newPatientFee: true,
            oldPatientFee: true,
            hospital: { select: { slug: true, name: true } },
          },
        },
      },
      orderBy: { name: 'asc' },
      take: limit,
    }),
  ]);

  return { speciality_bn: picked.bn, speciality_en: picked.en, doctors, total };
}
