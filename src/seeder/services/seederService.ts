// Pure seeding logic for the seeder module.
// No Express req/res here — the controller in ../controllers/ handles HTTP.
// Throws on failure so the controller can map it to a 500 response.
// Auth is enforced by protectedRoute on the route (SUPER_ADMIN only),
// so no inline auth check is needed here.
import bcrypt from 'bcrypt';
import { prisma } from '../../lib/prisma.js';

// ================================================================
// 10 HOSPITALS
// ================================================================
const HOSPITALS = [
  { slug: 'nilphamari-sadar-hospital',       name: 'নীলফামারী সদর হাসপাতাল (২৫০ শয্যা)',  address: 'সদর, নীলফামারী',         phone: '0551-61333',  establishedYear: 1982, thana: 'নীলফামারী সদর' },
  { slug: 'nilphamari-medical-college',       name: 'নীলফামারী মেডিকেল কলেজ ও হাসপাতাল',   address: 'নীলফামারী সদর, নীলফামারী', phone: '0551-61888',  establishedYear: 2018, thana: 'নীলফামারী সদর' },
  { slug: 'ar-general-hospital',              name: 'এ আর জেনারেল হাসপাতাল',              address: 'স্টেশন রোড, নীলফামারী সদর', phone: '01733077000', establishedYear: 2005, thana: 'নীলফামারী সদর' },
  { slug: 'saidpur-100-bed-hospital',         name: 'সৈয়দপুর ১০০ শয্যা বিশিষ্ট হাসপাতাল',  address: 'সৈয়দপুর, নীলফামারী',     phone: '05526-72222', establishedYear: 1975, thana: 'সৈয়দপুর' },
  { slug: 'saidpur-modern-hospital',          name: 'সৈয়দপুর আধুনিক হাসপাতাল',             address: 'সৈয়দপুর, নীলফামারী',     phone: '01717000004', establishedYear: 2010, thana: 'সৈয়দপুর' },
  { slug: 'shahid-dr-shamsul-haque-hospital', name: 'শহীদ ডাক্তার শামসুল হক হসপিটাল',       address: 'সৈয়দপুর, নীলফামারী',     phone: '01717000001', establishedYear: 2008, thana: 'সৈয়দপুর' },
  { slug: 'domar-health-complex',             name: 'ডোমার উপজেলা স্বাস্থ্য কমপ্লেক্স',      address: 'ডোমার, নীলফামারী',         phone: '05524-56022', establishedYear: 1995, thana: 'ডোমার' },
  { slug: 'jaldhaka-health-complex',          name: 'জলঢাকা উপজেলা স্বাস্থ্য কমপ্লেক্স',     address: 'জলঢাকা, নীলফামারী',       phone: '05523-56033', establishedYear: 1990, thana: 'জলঢাকা' },
  { slug: 'kishoreganj-health-complex',       name: 'কিশোরগঞ্জ উপজেলা স্বাস্থ্য কমপ্লেক্স',  address: 'কিশোরগঞ্জ, নীলফামারী',    phone: '05522-56044', establishedYear: 1992, thana: 'কিশোরগঞ্জ' },
  { slug: 'dimla-health-complex',             name: 'ডিমলা উপজেলা স্বাস্থ্য কমপ্লেক্স',      address: 'ডিমলা, নীলফামারী',         phone: '05525-56055', establishedYear: 1998, thana: 'ডিমলা' },
];

// ================================================================
// NAME POOLS
// ================================================================
const FIRST_NAMES_M = [
  'মো. সামিউর রহমান', 'সৈয়দ হাসান', 'মো. মনিরুজ্জামান', 'মো. রেজাউল করিম',
  'মো. মিনহাজ উদ্দিন', 'মো. ময়নুল হক', 'রূপায়ন দাশ', 'আনছার আলী',
  'মুহম্মদ লিটন', 'মো. মহিমিনুল ইসলাম', 'এ.কে.এম. ওয়াজেদ', 'মো. মোস্তাফিজুর',
  'বিপ্লব কুমার', 'মো. গোলাম মোস্তফা', 'কে. এম. রেজাউল', 'আব্দুল্লাহ আল মামুন',
  'মো. শহিদুল ইসলাম', 'সুমন কুমার দাস', 'মো. শাহজাহান', 'মো. আব্দুল কাদের',
  'মো. ফরহাদ হোসেন', 'মো. আবু বাক্কার', 'মো. রফিকুল ইসলাম', 'মো. ইসমাইল হোসেন',
  'মো. নজরুল ইসলাম', 'মো. আব্দুল মান্নান', 'মো. আবুল কালাম', 'মো. শহীদুল্লাহ',
  'মো. এনামুল হক', 'মো. আব্দুর রহিম', 'মো. সাইফুল ইসলাম', 'মো. আবু হেনা',
  'মো. আব্দুর রউফ', 'মো. দেলোয়ার হোসেন', 'মো. জাহাঙ্গীর আলম', 'মো. ইব্রাহিম খলিল',
  'মো. আব্দুস সামাদ', 'মো. নুরুল ইসলাম', 'মো. মনোয়ার হোসেন', 'মো. হাবিবুর রহমান',
  'মো. শফিকুল ইসলাম', 'মো. আনোয়ার হোসেন', 'মো. জসিম উদ্দিন', 'মো. আলমগীর হোসেন',
  'মো. সিরাজুল ইসলাম', 'মো. কামরুল হাসান', 'মো. ফজলুল হক', 'মো. শামসুল আলম',
  'মো. তাজুল ইসলাম', 'মো. রাশেদুল ইসলাম',
];
const FIRST_NAMES_F = [
  'মোছা: হাসিনা বানু', 'সেলিনা পারভীন', 'শাহানাজ পারভীন', 'নাজমা আক্তার',
  'রোকসানা খাতুন', 'ফাতেমা বেগম', 'মেরিনা সুলতানা', 'মোসাম্মত নাসিমা',
  'হোসনে আরা বেগম', 'লায়লা খানম', 'পারভীন সুলতানা', 'ছালেহা খাতুন',
  'সুরাইয়া বেগম', 'নাহিদা বেগম', 'আফরোজা বেগম', 'শামিমা নাসরিন',
  'নুরজাহান বেগম', 'রাশিদা খাতুন', 'আখতারুন নেসা', 'সালমা আক্তার',
  'রেহানা পারভীন', 'মাহমুদা খাতুন', 'ফরিদা ইয়াসমিন', 'নাসরিন সুলতানা',
  'শাহিদা বেগম', 'রুবিনা আক্তার', 'সাবিনা ইয়াসমিন', 'জেসমিন আক্তার',
  'লুৎফুন নাহার', 'তাসলিমা বেগম', 'মনিরা খাতুন', 'শিরিনা আক্তার',
  'রওশন আরা', 'হাফিজা খাতুন', 'মর্জিনা বেগম', 'আসমা আক্তার',
  'ফিরোজা বেগম', 'নাজমুন নাহার', 'শাহনাজ বেগম', 'পারুল আক্তার',
  'রুনা লায়লা', 'কানিজ ফাতেমা', 'সুমাইয়া ইয়াসমিন', 'তানজিনা আক্তার',
  'নুসরাত জাহান', 'সাদিয়া ইসলাম', 'মেহেরুন নেসা', 'জান্নাতুল ফেরদৌস',
  'রাবেয়া বেগম', 'সাবিহা সুলতানা',
];

const DEGREES = [
  'MBBS, BCS (Health), FCPS (Medicine)',
  'MBBS, BCS (Health), MD (Cardiology)',
  'MBBS, FCPS (Surgery)',
  'MBBS, MS (Orthopedics)',
  'MBBS, FCPS (Gynae & Obs)',
  'MBBS, DCH (Pediatrics)',
  'MBBS, FCPS (ENT)',
  'MBBS, FCPS (Skin & VD)',
  'MBBS, MD (Chest)',
  'MBBS, DGO',
  'MBBS, D-Ortho',
  'MBBS, BCS (Health), CCD',
  'MBBS, MD (Nephrology)',
  'MBBS, DCP (Pathology)',
  'MBBS, FCPS (Medicine), MD (Gastro)',
];

const SPECIALITY_FEES: Record<string, [number, number]> = {
  'মেডিসিন বিশেষজ্ঞ':                     [700,  600],
  'হৃদরোগ বিশেষজ্ঞ':                      [1000, 800],
  'জেনারেল ও ল্যাপারোস্কোপিক সার্জন':     [800,  700],
  'অর্থোপেডিক ও ট্রমা সার্জন':           [800,  700],
  'স্ত্রী রোগ ও প্রসূতিবিদ্যা বিশেষজ্ঞ': [800,  700],
  'শিশু রোগ বিশেষজ্ঞ':                   [600,  500],
  'নাক, কান ও গলা বিশেষজ্ঞ':             [700,  600],
  'চর্ম ও যৌন রোগ বিশেষজ্ঞ':             [700,  600],
  'বক্ষব্যাধি বিশেষজ্ঞ':                 [700,  600],
  'ডায়াবেটিস ও মেডিসিন বিশেষজ্ঞ':       [700,  600],
  'কিডনি রোগ বিশেষজ্ঞ':                  [900,  800],
  'চক্ষু রোগ বিশেষজ্ঞ':                  [800,  700],
  'প্যাথলজি বিশেষজ্ঞ':                   [500,  400],
  'গ্যাস্ট্রোএন্টেরোলজি বিশেষজ্ঞ':       [900,  800],
  'ডেন্টাল সার্জন':                      [600,  500],
};

const SPECIALITIES = Object.keys(SPECIALITY_FEES);

const MORNING_SHIFT   = { start: '09:00', end: '13:00' };
const EVENING_SHIFT   = { start: '17:00', end: '21:00' };
const AFTERNOON_SHIFT = { start: '14:00', end: '18:00' };

const DAY_SETS = [
  ['SATURDAY', 'MONDAY', 'WEDNESDAY'],
  ['SUNDAY', 'TUESDAY', 'THURSDAY'],
  ['SATURDAY', 'TUESDAY', 'FRIDAY'],
  ['SUNDAY', 'WEDNESDAY', 'FRIDAY'],
  ['MONDAY', 'THURSDAY'],
  ['SATURDAY', 'WEDNESDAY'],
];

function feeForChamber(base: [number, number], ci: number): [number, number] {
  const bump = ci * 100;
  return [base[0] + bump, base[1] + bump];
}

interface DoctorSeed {
  name: string;
  username: string;
  email: string;
  degree: string;
  speciality: string;
  tagline: string;
  bio: string;
  phone: string;
  whatsappNumber: string;
  whatsappId: string;
  startedYear: number;
  status: 'APPROVED' | 'PENDING';
  baseFee: [number, number];
  chamberSlugs: string[];
}

function buildDoctors(): DoctorSeed[] {
  const list: DoctorSeed[] = [];

  for (let i = 0; i < 100; i++) {
    const isFemale = i % 2 === 1;
    const firstName = isFemale
      ? FIRST_NAMES_F[Math.floor(i / 2) % FIRST_NAMES_F.length]!
      : FIRST_NAMES_M[Math.floor(i / 2) % FIRST_NAMES_M.length]!;

    const name = `ডা. ${firstName}`;
    const degree = DEGREES[i % DEGREES.length]!;
    const speciality = SPECIALITIES[i % SPECIALITIES.length]!;
    const baseFee = SPECIALITY_FEES[speciality] ?? [700, 600];

    const homeIdx = i % HOSPITALS.length;
    const chamberSlugs: string[] = [HOSPITALS[homeIdx]!.slug];

    if (i % 5 === 0) {
      let otherIdx = (homeIdx + 3) % HOSPITALS.length;
      if (otherIdx === homeIdx) otherIdx = (otherIdx + 1) % HOSPITALS.length;
      chamberSlugs.push(HOSPITALS[otherIdx]!.slug);

      if (i % 20 === 0) {
        let thirdIdx = (homeIdx + 7) % HOSPITALS.length;
        while (chamberSlugs.includes(HOSPITALS[thirdIdx]!.slug)) {
          thirdIdx = (thirdIdx + 1) % HOSPITALS.length;
        }
        chamberSlugs.push(HOSPITALS[thirdIdx]!.slug);
      }
    }

    const slug = `dr-nil-${String(i + 1).padStart(3, '0')}`;
    const phone = `01733${String(77000 + i).padStart(6, '0').slice(-6)}`;
    const startYear = 1995 + (i % 25);

    list.push({
      name,
      username: slug,
      email: `${slug}@doctors.com`,
      degree,
      speciality,
      tagline: speciality,
      bio: `${HOSPITALS[homeIdx]!.name} — ${HOSPITALS[homeIdx]!.thana}, নীলফামারী`,
      phone,
      whatsappNumber: phone,
      whatsappId: `${slug}.wa`,
      startedYear: startYear,
      status: i < 95 ? 'APPROVED' : 'PENDING',
      baseFee,
      chamberSlugs,
    });
  }

  return list;
}

// ================================================================
// 🎯 MAIN SERVICE
// ================================================================
export const runSeedAll = async () => {
  console.log('🌱 ===== SEED START =====');

  const summary = {
    hospitals: 0,
    doctors: 0,
    chambers: 0,
    schedules: 0,
    chatSessions: 0,
  };

  const defaultPassword = await bcrypt.hash('12345678', 10);

  // ----------------------------------------------------------
  // 1. HOSPITALS (Linked with User)
  // ----------------------------------------------------------
  console.log('🏥 Seeding hospitals...');
  const hospitalMap = new Map<
    string,
    { id: string; name: string; thana: string }
  >();

  for (const h of HOSPITALS) {
    const hospitalEmail = `${h.slug}@hospital.com`;

    const hospitalUser = await prisma.user.upsert({
      where: { email: hospitalEmail },
      update: {},
      create: {
        email: hospitalEmail,
        password: defaultPassword,
        role: 'HOSPITAL',
        isVerified: true,
      },
    });

    const created = await prisma.hospital.upsert({
      where: { slug: h.slug },
      update: {
        userId: hospitalUser.id,
        name: h.name,
        address: h.address,
        phone: h.phone,
        establishedYear: h.establishedYear,
      },
      create: {
        userId: hospitalUser.id,
        name: h.name,
        slug: h.slug,
        address: h.address,
        phone: h.phone,
        establishedYear: h.establishedYear,
        status: 'APPROVED',
        templateName: 'template_a',
      },
    });

    hospitalMap.set(h.slug, {
      id: created.id,
      name: created.name,
      thana: h.thana,
    });
  }
  summary.hospitals = hospitalMap.size;
  console.log(`   ✅ ${summary.hospitals} hospitals ready`);

  // ----------------------------------------------------------
  // 2. DOCTORS (Linked with User)
  // ----------------------------------------------------------
  console.log('👨‍⚕️  Seeding doctors...');
  const doctorSeeds = buildDoctors();
  const doctorMap = new Map<
    string,
    { id: string; baseFee: [number, number]; chamberSlugs: string[] }
  >();

  for (const d of doctorSeeds) {
    const doctorUser = await prisma.user.upsert({
      where: { email: d.email },
      update: {},
      create: {
        email: d.email,
        password: defaultPassword,
        role: 'DOCTOR',
        isVerified: true,
      },
    });

    const created = await prisma.doctor.upsert({
      where: { username: d.username },
      update: {
        userId: doctorUser.id,
        name: d.name,
        degree: d.degree,
        speciality: d.speciality,
        tagline: d.tagline,
        bio: d.bio,
        phone: d.phone,
        whatsappNumber: d.whatsappNumber,
        whatsappId: d.whatsappId,
        startedYear: d.startedYear,
        status: d.status,
      },
      create: {
        userId: doctorUser.id,
        name: d.name,
        username: d.username,
        email: d.email,
        degree: d.degree,
        speciality: d.speciality,
        tagline: d.tagline,
        bio: d.bio,
        phone: d.phone,
        whatsappNumber: d.whatsappNumber,
        whatsappId: d.whatsappId,
        startedYear: d.startedYear,
        status: d.status,
        templateName: 'template_a',
      },
    });

    doctorMap.set(d.username, {
      id: created.id,
      baseFee: d.baseFee,
      chamberSlugs: d.chamberSlugs,
    });
  }
  summary.doctors = doctorMap.size;
  console.log(`   ✅ ${summary.doctors} doctors ready`);

  // ----------------------------------------------------------
  // 3. CHAMBERS
  // ----------------------------------------------------------
  console.log('🚪 Seeding chambers with fees...');
  const chamberMap = new Map<string, string>();
  const chamberNamePool = [
    'চেম্বার',
    'স্পেশালিষ্ট চেম্বার',
    'ডে-কেয়ার',
    'কনসালটেশন রুম',
  ];

  for (const info of doctorMap.values()) {
    for (let ci = 0; ci < info.chamberSlugs.length; ci++) {
      const hospitalSlug = info.chamberSlugs[ci]!;
      const hospital = hospitalMap.get(hospitalSlug)!;
      const [newFee, oldFee] = feeForChamber(info.baseFee, ci);

      const chamberId = `ch-${info.id.slice(0, 8)}-${ci + 1}`;
      const chamberKey = `${info.id}|${hospital.id}|${ci + 1}`;

      const chamber = await prisma.chamber.upsert({
        where: { id: chamberId },
        update: {
          newPatientFee: newFee,
          oldPatientFee: oldFee,
        },
        create: {
          id: chamberId,
          doctorId: info.id,
          hospitalId: hospital.id,
            chamberName: `${hospital.name.split(' ')[0]} ${chamberNamePool[ci % chamberNamePool.length]!}`,
          addressLine: `${hospital.name}, ${hospital.thana}`,
          thana: hospital.thana,
          district: 'নীলফামারী',
          division: 'রংপুর',
          latitude: 25.93 + Math.random() * 0.3,
          longitude: 88.85 + Math.random() * 0.15,
          newPatientFee: newFee,
          oldPatientFee: oldFee,
        },
      });

      chamberMap.set(chamberKey, chamber.id);
      summary.chambers++;
    }
  }
  console.log(`   ✅ ${summary.chambers} chambers ready (with fees)`);

  // ----------------------------------------------------------
  // 4. SCHEDULES
  // ----------------------------------------------------------
  console.log('📅 Seeding schedules...');
  let scheduleCounter = 0;

  for (const info of doctorMap.values()) {
    for (let ci = 0; ci < info.chamberSlugs.length; ci++) {
      const hospitalSlug = info.chamberSlugs[ci]!;
      const hospital = hospitalMap.get(hospitalSlug)!;
      const chamberKey = `${info.id}|${hospital.id}|${ci + 1}`;
      const chamberId = chamberMap.get(chamberKey)!;

      const daySet = DAY_SETS[(scheduleCounter + ci * 2) % DAY_SETS.length]!;
      const shift =
        ci === 0
          ? scheduleCounter % 3 === 0
            ? EVENING_SHIFT
            : MORNING_SHIFT
          : AFTERNOON_SHIFT;

      for (const day of daySet) {
        const schId = `sch-${info.id.slice(0, 8)}-c${ci + 1}-${day}`;
        await prisma.doctorSchedule.upsert({
          where: { id: schId },
          update: {},
          create: {
            id: schId,
            doctorId: info.id,
            hospitalId: hospital.id,
            chamberId: chamberId,
            dayOfWeek: day as any,
            startTime: shift.start,
            endTime: shift.end,
          },
        });
        summary.schedules++;
      }
    }
    scheduleCounter++;
  }
  console.log(`   ✅ ${summary.schedules} schedules ready`);

  // ----------------------------------------------------------
  // 5. DEMO CHAT SESSIONS
  // ----------------------------------------------------------
  console.log('💬 Seeding chat sessions...');
  const doctorArr = Array.from(doctorMap.values());
  const firstDoc = doctorArr[0]!;
  const secondDoc = doctorArr[1] ?? firstDoc;

  await prisma.chatSession.upsert({
    where: { phoneNumber: '8801712345678' },
    update: {},
    create: {
      phoneNumber: '8801712345678',
      targetType: 'DOCTOR',
      targetId: firstDoc.id,
      targetName: 'ডা. (demo)',
      lastFlow: 'GET_DOCTOR_FLOW',
      lastStep: 'ACTIVE_CHAT',
    },
  });
  await prisma.chatSession.upsert({
    where: { phoneNumber: '8801798765432' },
    update: {},
    create: {
      phoneNumber: '8801798765432',
      targetType: 'DOCTOR',
      targetId: secondDoc.id,
      targetName: 'ডা. (demo 2)',
      lastFlow: 'BOOK_APPOINTMENT',
      lastStep: 'CONFIRMING',
    },
  });
  summary.chatSessions = 2;
  console.log(`   ✅ ${summary.chatSessions} chat sessions ready`);

  console.log('✅ ===== SEED DONE =====\n');

  return { summary };
};
