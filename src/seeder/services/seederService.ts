// Pure seeding logic for the seeder module.
// No Express req/res here — the controller in ../controllers/ handles HTTP.
// Throws on failure so the controller can map it to a 500 response.
// Auth is enforced by protectedRoute on the route (SUPER_ADMIN only),
// so no inline auth check is needed here.
import bcrypt from 'bcrypt';
import { prisma } from '../../lib/prisma.js';
import {
  buildExpertiseForSpeciality,
  buildExpertiseEnForSpeciality,
  buildTimelineForDoctor,
} from './doctorInformationContent.js';
import { BLOG_SEEDS } from './blogSeedContent.js';
import { buildDoctorPoolSeeds, buildHospitalPoolSeeds } from './blogPoolContent.js';
import { buildDummyReviews } from './reviewSeedContent.js';

// ================================================================
// 10 HOSPITALS — bangla fields + _en (english mirror)
// ================================================================
const DIVISION = 'রংপুর';
const DIVISION_EN = 'Rangpur';
const DISTRICT = 'নীলফামারী';
const DISTRICT_EN = 'Nilphamari';

const HOSPITALS = [
  { slug: 'nilphamari-sadar-hospital',       name: 'নীলফামারী সদর হাসপাতাল (২৫০ শয্যা)',  name_en: 'Nilphamari Sadar Hospital (250 Bed)',      addressLine: 'সদর, নীলফামারী',         addressLine_en: 'Sadar, Nilphamari',         phone: '0551-61333',   establishedYear: 1982, thana: 'নীলফামারী সদর', thana_en: 'Nilphamari Sadar' },
  { slug: 'nilphamari-medical-college',       name: 'নীলফামারী মেডিকেল কলেজ ও হাসপাতাল',   name_en: 'Nilphamari Medical College & Hospital',     addressLine: 'নীলফামারী সদর, নীলফামারী', addressLine_en: 'Nilphamari Sadar, Nilphamari', phone: '0551-61888',   establishedYear: 2018, thana: 'নীলফামারী সদর', thana_en: 'Nilphamari Sadar' },
  { slug: 'ar-general-hospital',              name: 'এ আর জেনারেল হাসপাতাল',              name_en: 'AR General Hospital',                       addressLine: 'স্টেশন রোড, নীলফামারী সদর', addressLine_en: 'Station Road, Nilphamari Sadar', phone: '01733077000', establishedYear: 2005, thana: 'নীলফামারী সদর', thana_en: 'Nilphamari Sadar' },
  { slug: 'saidpur-100-bed-hospital',         name: 'সৈয়দপুর ১০০ শয্যা বিশিষ্ট হাসপাতাল',  name_en: 'Saidpur 100 Bed Hospital',                  addressLine: 'সৈয়দপুর, নীলফামারী',     addressLine_en: 'Saidpur, Nilphamari',         phone: '05526-72222', establishedYear: 1975, thana: 'সৈয়দপুর',       thana_en: 'Saidpur' },
  { slug: 'saidpur-modern-hospital',          name: 'সৈয়দপুর আধুনিক হাসপাতাল',             name_en: 'Saidpur Modern Hospital',                   addressLine: 'সৈয়দপুর, নীলফামারী',     addressLine_en: 'Saidpur, Nilphamari',         phone: '01717000004', establishedYear: 2010, thana: 'সৈয়দপুর',       thana_en: 'Saidpur' },
  { slug: 'shahid-dr-shamsul-haque-hospital', name: 'শহীদ ডাক্তার শামসুল হক হসপিটাল',       name_en: 'Shaheed Dr. Shamsul Haque Hospital',        addressLine: 'সৈয়দপুর, নীলফামারী',     addressLine_en: 'Saidpur, Nilphamari',         phone: '01717000001', establishedYear: 2008, thana: 'সৈয়দপুর',       thana_en: 'Saidpur' },
  { slug: 'domar-health-complex',             name: 'ডোমার উপজেলা স্বাস্থ্য কমপ্লেক্স',      name_en: 'Domar Upazila Health Complex',              addressLine: 'ডোমার, নীলফামারী',         addressLine_en: 'Domar, Nilphamari',           phone: '05524-56022', establishedYear: 1995, thana: 'ডোমার',         thana_en: 'Domar' },
  { slug: 'jaldhaka-health-complex',          name: 'জলঢাকা উপজেলা স্বাস্থ্য কমপ্লেক্স',     name_en: 'Jaldhaka Upazila Health Complex',           addressLine: 'জলঢাকা, নীলফামারী',       addressLine_en: 'Jaldhaka, Nilphamari',        phone: '05523-56033', establishedYear: 1990, thana: 'জলঢাকা',        thana_en: 'Jaldhaka' },
  { slug: 'kishoreganj-health-complex',       name: 'কিশোরগঞ্জ উপজেলা স্বাস্থ্য কমপ্লেক্স',  name_en: 'Kishoreganj Upazila Health Complex',        addressLine: 'কিশোরগঞ্জ, নীলফামারী',    addressLine_en: 'Kishoreganj, Nilphamari',     phone: '05522-56044', establishedYear: 1992, thana: 'কিশোরগঞ্জ',      thana_en: 'Kishoreganj' },
  { slug: 'dimla-health-complex',             name: 'ডিমলা উপজেলা স্বাস্থ্য কমপ্লেক্স',      name_en: 'Dimla Upazila Health Complex',              addressLine: 'ডিমলা, নীলফামারী',         addressLine_en: 'Dimla, Nilphamari',           phone: '05525-56055', establishedYear: 1998, thana: 'ডিমলা',         thana_en: 'Dimla' },
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

// English mirrors (same order as above) — used for *_en fields.
const FIRST_NAMES_M_EN = [
  'Md. Samiur Rahman', 'Syed Hasan', 'Md. Moniruzzaman', 'Md. Rezaul Karim',
  'Md. Minhaz Uddin', 'Md. Moynul Haque', 'Rupayan Das', 'Ansar Ali',
  'Muhammad Liton', 'Md. Mohiminul Islam', 'A.K.M. Wazed', 'Md. Mostafizur',
  'Biplob Kumar', 'Md. Golam Mostofa', 'K. M. Rezaul', 'Abdullah Al Mamun',
  'Md. Shahidul Islam', 'Suman Kumar Das', 'Md. Shahjahan', 'Md. Abdul Kader',
  'Md. Farhad Hossain', 'Md. Abu Bakkar', 'Md. Rafiqul Islam', 'Md. Ismail Hossain',
  'Md. Nazrul Islam', 'Md. Abdul Mannan', 'Md. Abul Kalam', 'Md. Shahidullah',
  'Md. Enamul Haque', 'Md. Abdur Rahim', 'Md. Saiful Islam', 'Md. Abu Hena',
  'Md. Abdur Rauf', 'Md. Delwar Hossain', 'Md. Jahangir Alam', 'Md. Ibrahim Khalil',
  'Md. Abdus Samad', 'Md. Nurul Islam', 'Md. Monowar Hossain', 'Md. Habibur Rahman',
  'Md. Shafiqul Islam', 'Md. Anwar Hossain', 'Md. Jasim Uddin', 'Md. Alamgir Hossain',
  'Md. Sirajul Islam', 'Md. Kamrul Hasan', 'Md. Fazlul Haque', 'Md. Shamsul Alam',
  'Md. Tajul Islam', 'Md. Rashedul Islam',
];
const FIRST_NAMES_F_EN = [
  'Mst. Hasina Banu', 'Selina Parvin', 'Shahanaz Parvin', 'Nazma Akter',
  'Roksana Khatun', 'Fatema Begum', 'Marina Sultana', 'Mosammat Nasima',
  'Hosne Ara Begum', 'Laila Khanam', 'Parvin Sultana', 'Saleha Khatun',
  'Suraiya Begum', 'Nahida Begum', 'Afroza Begum', 'Shamima Nasrin',
  'Nurjahan Begum', 'Rashida Khatun', 'Akhtarun Nesa', 'Salma Akter',
  'Rehana Parvin', 'Mahmuda Khatun', 'Farida Yasmin', 'Nasrin Sultana',
  'Shahida Begum', 'Rubina Akter', 'Sabina Yasmin', 'Jesmin Akter',
  'Lutfun Nahar', 'Taslima Begum', 'Monira Khatun', 'Shirina Akter',
  'Rowshan Ara', 'Hafiza Khatun', 'Morzina Begum', 'Asma Akter',
  'Firoza Begum', 'Nazmun Nahar', 'Shahnaz Begum', 'Parul Akter',
  'Runa Laila', 'Kaniz Fatema', 'Sumaiya Yasmin', 'Tanzina Akter',
  'Nusrat Jahan', 'Sadia Islam', 'Meherun Nesa', 'Jannatul Ferdous',
  'Rabeya Begum', 'Sabiha Sultana',
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

// Bangla speciality → English mirror (for speciality_en / tagline_en).
const SPECIALITY_EN: Record<string, string> = {
  'মেডিসিন বিশেষজ্ঞ': 'Medicine Specialist',
  'হৃদরোগ বিশেষজ্ঞ': 'Cardiology Specialist',
  'জেনারেল ও ল্যাপারোস্কোপিক সার্জন': 'General & Laparoscopic Surgeon',
  'অর্থোপেডিক ও ট্রমা সার্জন': 'Orthopedic & Trauma Surgeon',
  'স্ত্রী রোগ ও প্রসূতিবিদ্যা বিশেষজ্ঞ': 'Gynecology & Obstetrics Specialist',
  'শিশু রোগ বিশেষজ্ঞ': 'Pediatrics Specialist',
  'নাক, কান ও গলা বিশেষজ্ঞ': 'ENT Specialist',
  'চর্ম ও যৌন রোগ বিশেষজ্ঞ': 'Skin & VD Specialist',
  'বক্ষব্যাধি বিশেষজ্ঞ': 'Chest Disease Specialist',
  'ডায়াবেটিস ও মেডিসিন বিশেষজ্ঞ': 'Diabetes & Medicine Specialist',
  'কিডনি রোগ বিশেষজ্ঞ': 'Nephrology Specialist',
  'চক্ষু রোগ বিশেষজ্ঞ': 'Eye Specialist',
  'প্যাথলজি বিশেষজ্ঞ': 'Pathology Specialist',
  'গ্যাস্ট্রোএন্টেরোলজি বিশেষজ্ঞ': 'Gastroenterology Specialist',
  'ডেন্টাল সার্জন': 'Dental Surgeon',
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
  name_en: string;
  username: string;
  email: string;
  degree: string;
  degree_en: string;
  speciality: string;
  speciality_en: string;
  tagline: string;
  tagline_en: string;
  bio: string;
  bio_en: string;
  phone: string;
  whatsappNumber: string;
  whatsappId: string;
  startedYear: number;
  gender: 'MALE' | 'FEMALE';
  status: 'APPROVED' | 'PENDING';
  baseFee: [number, number];
  chamberSlugs: string[];
}

function buildDoctors(): DoctorSeed[] {
  const list: DoctorSeed[] = [];

  for (let i = 0; i < 100; i++) {
    const isFemale = i % 2 === 1;
    const poolIdx = Math.floor(i / 2) % FIRST_NAMES_M.length;
    const firstName = isFemale
      ? FIRST_NAMES_F[poolIdx % FIRST_NAMES_F.length]!
      : FIRST_NAMES_M[poolIdx]!;
    const firstNameEn = isFemale
      ? FIRST_NAMES_F_EN[poolIdx % FIRST_NAMES_F_EN.length]!
      : FIRST_NAMES_M_EN[poolIdx]!;

    const name = `ডা. ${firstName}`;
    const name_en = `Dr. ${firstNameEn}`;
    const degree = DEGREES[i % DEGREES.length]!;
    const speciality = SPECIALITIES[i % SPECIALITIES.length]!;
    const speciality_en = SPECIALITY_EN[speciality] ?? speciality;
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

    const homeHospital = HOSPITALS[homeIdx]!;
    list.push({
      name,
      name_en,
      username: slug,
      email: `${slug}@doctors.com`,
      degree,
      degree_en: degree,
      speciality,
      speciality_en,
      tagline: speciality,
      tagline_en: speciality_en,
      bio: `${homeHospital.name} — ${homeHospital.thana}, নীলফামারী`,
      bio_en: `${homeHospital.name_en} — ${homeHospital.thana_en}, Nilphamari`,
      phone,
      whatsappNumber: phone,
      whatsappId: `${slug}.wa`,
      startedYear: startYear,
      gender: isFemale ? 'FEMALE' : 'MALE',
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
  const hospitalMap = new Map<
    string,
    {
      id: string;
      name: string;
      name_en: string;
      thana: string;
      thana_en: string;
    }
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
        name_en: h.name_en,
        division: DIVISION,
        division_en: DIVISION_EN,
        district: DISTRICT,
        district_en: DISTRICT_EN,
        thana: h.thana,
        thana_en: h.thana_en,
        addressLine: h.addressLine,
        addressLine_en: h.addressLine_en,
        phone: h.phone,
        establishedYear: h.establishedYear,
      },
      create: {
        userId: hospitalUser.id,
        name: h.name,
        name_en: h.name_en,
        slug: h.slug,
        division: DIVISION,
        division_en: DIVISION_EN,
        district: DISTRICT,
        district_en: DISTRICT_EN,
        thana: h.thana,
        thana_en: h.thana_en,
        addressLine: h.addressLine,
        addressLine_en: h.addressLine_en,
        phone: h.phone,
        establishedYear: h.establishedYear,
        status: 'APPROVED',
        templateName: 'template_a',
      },
    });

    hospitalMap.set(h.slug, {
      id: created.id,
      name: created.name,
      name_en: h.name_en,
      thana: h.thana,
      thana_en: h.thana_en,
    });
  }
  summary.hospitals = hospitalMap.size;

  // ----------------------------------------------------------
  // 2. DOCTORS (Linked with User)
  // ----------------------------------------------------------
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
        name_en: d.name_en,
        degree: d.degree,
        degree_en: d.degree_en,
        speciality: d.speciality,
        speciality_en: d.speciality_en,
        tagline: d.tagline,
        tagline_en: d.tagline_en,
        bio: d.bio,
        bio_en: d.bio_en,
        phone: d.phone,
        whatsappNumber: d.whatsappNumber,
        whatsappId: d.whatsappId,
        startedYear: d.startedYear,
        gender: d.gender as any,
        status: d.status,
      },
      create: {
        userId: doctorUser.id,
        name: d.name,
        name_en: d.name_en,
        username: d.username,
        email: d.email,
        degree: d.degree,
        degree_en: d.degree_en,
        speciality: d.speciality,
        speciality_en: d.speciality_en,
        tagline: d.tagline,
        tagline_en: d.tagline_en,
        bio: d.bio,
        bio_en: d.bio_en,
        phone: d.phone,
        whatsappNumber: d.whatsappNumber,
        whatsappId: d.whatsappId,
        startedYear: d.startedYear,
        gender: d.gender as any,
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

  // ----------------------------------------------------------
  // 3. CHAMBERS
  // ----------------------------------------------------------
  const chamberMap = new Map<string, string>();
  const chamberNamePool = [
    'চেম্বার',
    'স্পেশালিষ্ট চেম্বার',
    'ডে-কেয়ার',
    'কনসালটেশন রুম',
  ];
  // English mirrors (same order) — used for chamberName_en.
  const chamberNamePoolEn = [
    'Chamber',
    'Specialist Chamber',
    'Day Care',
    'Consultation Room',
  ];

  for (const info of doctorMap.values()) {
    for (let ci = 0; ci < info.chamberSlugs.length; ci++) {
      const hospitalSlug = info.chamberSlugs[ci]!;
      const hospital = hospitalMap.get(hospitalSlug)!;
      const [newFee, oldFee] = feeForChamber(info.baseFee, ci);

      const chamberId = `ch-${info.id.slice(0, 8)}-${ci + 1}`;
      const chamberKey = `${info.id}|${hospital.id}|${ci + 1}`;
      const chamberName = `${hospital.name.split(' ')[0]} ${chamberNamePool[ci % chamberNamePool.length]!}`;
      const chamberNameEn = `${hospital.name_en.split(' ')[0]} ${chamberNamePoolEn[ci % chamberNamePoolEn.length]!}`;
      const addressLine = `${hospital.name}, ${hospital.thana}`;
      const addressLineEn = `${hospital.name_en}, ${hospital.thana_en}`;

      const chamber = await prisma.chamber.upsert({
        where: { id: chamberId },
        update: {
          chamberName,
          chamberName_en: chamberNameEn,
          addressLine,
          addressLine_en: addressLineEn,
          thana: hospital.thana,
          thana_en: hospital.thana_en,
          district: DISTRICT,
          district_en: DISTRICT_EN,
          division: DIVISION,
          division_en: DIVISION_EN,
          newPatientFee: newFee,
          oldPatientFee: oldFee,
        },
        create: {
          id: chamberId,
          doctorId: info.id,
          hospitalId: hospital.id,
          chamberName,
          chamberName_en: chamberNameEn,
          addressLine,
          addressLine_en: addressLineEn,
          thana: hospital.thana,
          thana_en: hospital.thana_en,
          district: DISTRICT,
          district_en: DISTRICT_EN,
          division: DIVISION,
          division_en: DIVISION_EN,
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

  // ----------------------------------------------------------
  // 4. SCHEDULES
  // ----------------------------------------------------------
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

  // ----------------------------------------------------------
  // 5. DEMO CHAT SESSIONS
  // ----------------------------------------------------------
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

  // ----------------------------------------------------------
  // 6. DOCTOR INFORMATIONS (expertise + timeline per doctor)
  // ----------------------------------------------------------
  let infoCount = 0;
  const allDoctors = await prisma.doctor.findMany({
    select: {
      id: true,
      username: true,
      name: true,
      degree: true,
      speciality: true,
      startedYear: true,
      chambers: { select: { thana: true }, take: 1 },
    },
    orderBy: { username: 'asc' },
  });

  // Default highlights + hero stat for fresh rows only — re-seeds never
  // overwrite what the doctor edited from their profile page.
  const DEFAULT_HIGHLIGHTS = [
    { icon: '✓', text: 'প্রতিটি রোগীকে পর্যাপ্ত সময় দেওয়া' },
    { icon: '✓', text: 'রোগ ও চিকিৎসা সহজ ভাষায় বুঝিয়ে বলা' },
    { icon: '✓', text: 'অপ্রয়োজনীয় টেস্ট ও ওষুধ এড়িয়ে চলা' },
  ];
  const DEFAULT_HIGHLIGHTS_EN = [
    { icon: '✓', text: 'Enough time for every patient' },
    { icon: '✓', text: 'Disease and treatment explained in simple words' },
    { icon: '✓', text: 'Avoiding unnecessary tests and medicines' },
  ];
  const DEFAULT_STATS = [{ value: '৫ হাজার+', label: 'সুস্থ রোগী' }];
  const DEFAULT_STATS_EN = [{ value: '5K+', label: 'Recovered patients' }];

  let infoIndex = 0;
  for (const d of allDoctors) {
    const expertise = buildExpertiseForSpeciality(d.speciality);
    const expertise_en = buildExpertiseEnForSpeciality(d.speciality);
    const timeline = buildTimelineForDoctor(
      {
        degree: d.degree,
        speciality: d.speciality,
        startedYear: d.startedYear,
        firstChamberThana: d.chambers[0]?.thana ?? null,
      },
      infoIndex,
    );
    await prisma.doctorInformation.upsert({
      where: { doctorId: d.id },
      update: { expertise: expertise as any, expertise_en: expertise_en as any, timeline: timeline as any },
      create: {
        doctorId: d.id,
        expertise: expertise as any,
        expertise_en: expertise_en as any,
        timeline: timeline as any,
        highlights: DEFAULT_HIGHLIGHTS as any,
        highlights_en: DEFAULT_HIGHLIGHTS_EN as any,
        stats: DEFAULT_STATS as any,
        stats_en: DEFAULT_STATS_EN as any,
      },
    });
    infoCount++;
    infoIndex++;
  }
  (summary as Record<string, number>).doctorInformations = infoCount;

  // ----------------------------------------------------------
  // 7. BLOGS (doctors, hospitals & super-admin)
  // ----------------------------------------------------------
  let blogCount = 0;
  for (const seed of BLOG_SEEDS) {
    let doctorId: string | null = null;
    let hospitalId: string | null = null;
    if (seed.doctorUsername) {
      const hit = doctorMap.get(seed.doctorUsername);
      if (hit) doctorId = hit.id;
      else {
        const found = await prisma.doctor.findUnique({
          where: { username: seed.doctorUsername },
          select: { id: true },
        });
        doctorId = found?.id ?? null;
      }
    }
    if (seed.hospitalSlug) {
      const hit = hospitalMap.get(seed.hospitalSlug);
      if (hit) hospitalId = hit.id;
      else {
        const found = await prisma.hospital.findUnique({
          where: { slug: seed.hospitalSlug },
          select: { id: true },
        });
        hospitalId = found?.id ?? null;
      }
    }
    if ((seed.authorType === 'DOCTOR' && !doctorId) || (seed.authorType === 'HOSPITAL' && !hospitalId)) {
      continue;
    }
    await prisma.blog.upsert({
      where: { slug: seed.slug },
      update: {
        title: seed.title,
        excerpt: seed.excerpt,
        content: seed.content,
        coverGradient: seed.coverGradient,
        coverSymbol: seed.coverSymbol,
        category: seed.category,
        tags: seed.tags,
        authorType: seed.authorType as any,
        authorName: seed.authorName,
        doctorId,
        hospitalId,
        status: 'PUBLISHED',
        publishedAt: new Date(),
      },
      create: {
        slug: seed.slug,
        title: seed.title,
        excerpt: seed.excerpt,
        content: seed.content,
        coverGradient: seed.coverGradient,
        coverSymbol: seed.coverSymbol,
        category: seed.category,
        tags: seed.tags,
        authorType: seed.authorType as any,
        authorName: seed.authorName,
        doctorId,
        hospitalId,
        status: 'PUBLISHED',
        publishedAt: new Date(),
      },
    });
    blogCount++;
  }
  (summary as Record<string, number>).blogs = blogCount;

  // ----------------------------------------------------------
  // 8. DOCTOR POOL BLOGS (3 per doctor → every profile is dynamic)
  // ----------------------------------------------------------
  let poolCount = 0;
  let poolIndex = 0;
  for (const d of allDoctors) {
    for (const s of buildDoctorPoolSeeds(
      { username: d.username, name: d.name, speciality: d.speciality },
      (poolIndex * 7) % 60,
    )) {
      await prisma.blog.upsert({
        where: { slug: s.slug },
        update: {
          title: s.title,
          excerpt: s.excerpt,
          content: s.content,
          coverGradient: s.coverGradient,
          coverSymbol: s.coverSymbol,
          category: s.category,
          tags: s.tags,
          authorType: 'DOCTOR' as any,
          authorName: s.authorName,
          doctorId: d.id,
          status: 'PUBLISHED',
          publishedAt: s.publishedAt,
        },
        create: {
          slug: s.slug,
          title: s.title,
          excerpt: s.excerpt,
          content: s.content,
          coverGradient: s.coverGradient,
          coverSymbol: s.coverSymbol,
          category: s.category,
          tags: s.tags,
          authorType: 'DOCTOR' as any,
          authorName: s.authorName,
          doctorId: d.id,
          status: 'PUBLISHED',
          publishedAt: s.publishedAt,
        },
      });
      poolCount++;
    }
    poolIndex++;
  }
  (summary as Record<string, number>).blogs =
    ((summary as Record<string, number>).blogs ?? 0) + poolCount;

  // ----------------------------------------------------------
  // 8b. HOSPITAL POOL BLOGS (2 per hospital portal)
  // ----------------------------------------------------------
  const seederHospitals = await prisma.hospital.findMany({
    select: { id: true, slug: true, name: true },
    orderBy: { slug: 'asc' },
  });
  let hospPoolCount = 0;
  let hospPoolIndex = 0;
  for (const h of seederHospitals) {
    for (const s of buildHospitalPoolSeeds(h, hospPoolIndex * 9)) {
      await prisma.blog.upsert({
        where: { slug: s.slug },
        update: {
          title: s.title,
          excerpt: s.excerpt,
          content: s.content,
          coverGradient: s.coverGradient,
          coverSymbol: s.coverSymbol,
          category: s.category,
          tags: s.tags,
          authorType: 'HOSPITAL' as any,
          authorName: s.authorName,
          hospitalId: h.id,
          status: 'PUBLISHED',
          publishedAt: s.publishedAt,
        },
        create: {
          slug: s.slug,
          title: s.title,
          excerpt: s.excerpt,
          content: s.content,
          coverGradient: s.coverGradient,
          coverSymbol: s.coverSymbol,
          category: s.category,
          tags: s.tags,
          authorType: 'HOSPITAL' as any,
          authorName: s.authorName,
          hospitalId: h.id,
          status: 'PUBLISHED',
          publishedAt: s.publishedAt,
        },
      });
      hospPoolCount++;
    }
    hospPoolIndex++;
  }
  (summary as Record<string, number>).blogs =
    ((summary as Record<string, number>).blogs ?? 0) + hospPoolCount;

  // ----------------------------------------------------------
  // 9. REVIEWS (dummy patient feedback for doctors + hospitals)
  // ----------------------------------------------------------
  let reviewCount = 0;
  let reviewIndex = 0;
  for (const d of allDoctors) {
    for (const r of buildDummyReviews(reviewIndex)) {
      await prisma.review.create({
        data: {
          rating: r.rating,
          reviewerName: r.reviewerName,
          title: r.title ?? null,
          comment: r.comment,
          status: r.status as any,
          source: 'seed',
          doctorId: d.id,
          createdAt: new Date(Date.now() - r.daysAgo * 864e5),
        },
      });
      reviewCount++;
    }
    reviewIndex++;
  }
  const allHospitals = await prisma.hospital.findMany({
    select: { id: true },
    orderBy: { slug: 'asc' },
  });
  let hospReviewIndex = 0;
  for (const h of allHospitals) {
    for (const r of buildDummyReviews(hospReviewIndex, true)) {
      await prisma.review.create({
        data: {
          rating: r.rating,
          reviewerName: r.reviewerName,
          title: r.title ?? null,
          comment: r.comment,
          status: r.status as any,
          source: 'seed',
          hospitalId: h.id,
          createdAt: new Date(Date.now() - r.daysAgo * 864e5),
        },
      });
      reviewCount++;
    }
    hospReviewIndex++;
  }
  (summary as Record<string, number>).reviews = reviewCount;


  return { summary };
};
