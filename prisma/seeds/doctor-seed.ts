import { prisma } from '../../src/lib/prisma.js'; // আপনার প্রজেক্ট স্ট্রাকচার অনুযায়ী পাথ ঠিক করে নেবেন

async function main() {
  const business = await prisma.business.findFirst();

  if (!business) {
    console.log("কোনো হসপিটাল বা Business পাওয়া যায়নি!");
    return;
  }

  const doctorsData = [
    { name: "ডা. মো. রফিকুল ইসলাম", degree: "MBBS, FCPS (Medicine)", speciality: "মেডিসিন ও ডায়াবেটিস বিশেষজ্ঞ", workingPlace: "ঢাকা মেডিকেল কলেজ ও হাসপাতাল", phone: "01711000001" },
    { name: "ডা. ফারহানা আহমেদ", degree: "MBBS, MD (Cardiology)", speciality: "হৃদরোগ ও মেডিসিন বিশেষজ্ঞ", workingPlace: "জাতীয় হৃদরোগ ইনস্টিটিউট", phone: "01711000002" },
    { name: "ডা. তানভীর হাসান", degree: "MBBS, MS (Orthopedics)", speciality: "হাড়, জোড় ও ট্রমা সার্জন", workingPlace: "পঙ্গু হাসপাতাল, ঢাকা", phone: "01711000003" },
    { name: "ডা. সুমাইয়া বিনতে রশীদ", degree: "MBBS, FCPS (Gynae & Obs)", speciality: "স্ত্রী রোগ ও প্রসূতিবিদ্যা বিশেষজ্ঞ", workingPlace: "বঙ্গবন্ধু শেখ মুজিব মেডিকেল বিশ্ববিদ্যালয়", phone: "01711000004" },
    { name: "ডা. আব্দুল্লাহ আল মামুন", degree: "MBBS, DCH, FCPS (Pediatrics)", speciality: "শিশু রোগ বিশেষজ্ঞ", workingPlace: "ঢাকা শিশু হাসপাতাল", phone: "01711000005" },
    { name: "ডা. নুসরাত জাহান", degree: "MBBS, FCPS (Skin & VD)", speciality: "চর্ম, অ্যালার্জি ও যৌন রোগ বিশেষজ্ঞ", workingPlace: "শহীদ সোহরাওয়ার্দী মেডিকেল কলেজ", phone: "01711000006" },
    { name: "ডা. কামরুল হাসান সজীব", degree: "MBBS, MS (ENT)", speciality: "নাক, কান ও গলা বিশেষজ্ঞ", workingPlace: "স্যার সলিমুল্লাহ মেডিকেল কলেজ (মিটফোর্ড)", phone: "01711000007" },
    { name: "ডা. শারমিন সুলতানা", degree: "MBBS, FCPS (Eye)", speciality: "চক্ষু রোগ বিশেষজ্ঞ ও সার্জন", workingPlace: "জাতীয় চক্ষু বিজ্ঞান ইনস্টিটিউট", phone: "01711000008" },
    { name: "ডা. ইশতিয়াক আহমেদ", degree: "MBBS, MD (Neurology)", speciality: "মস্তিষ্ক, স্ট্রোক ও স্নায়ুরোগ বিশেষজ্ঞ", workingPlace: "নিটহ (NEURO)", phone: "01711000009" },
    { name: "ডা. লায়লা আর্জুমান্দ", degree: "MBBS, FCPS (Psychiatry)", speciality: "মানসিক রোগ ও আসক্তি বিশেষজ্ঞ", workingPlace: "পাবনা মানসিক হাসপাতাল", phone: "01711000010" },
    { name: "ডা. আহমেদ সাজ্জাদ হোসেন", degree: "MBBS, MD (Nephrology)", speciality: "কিডনি রোগ বিশেষজ্ঞ", workingPlace: "বিএসএমএমইউ", phone: "01711000011" },
    { name: "ডা. মেহনাজ চৌধুরী", degree: "MBBS, FCPS (Oncology)", speciality: "ক্যান্সার বা টিউমার বিশেষজ্ঞ", workingPlace: "জাতীয় ক্যান্সার গবেষণা ইনস্টিটিউট", phone: "01711000012" },
    { name: "ডা. শাহরিয়ার কবির", degree: "MBBS, MS (Urology)", speciality: "ইউরোলজি ও কিডনি সার্জন", workingPlace: "ঢাকা মেডিকেল কলেজ", phone: "01711000013" },
    { name: "ডা. তাবাসসুম মোস্তফা", degree: "MBBS, FCPS (Endocrinology)", speciality: "হরমোন ও ডায়াবেটিস বিশেষজ্ঞ", workingPlace: "বারডেম হসপিটাল", phone: "01711000014" },
    { name: "ডা. জামিল আহমেদ", degree: "MBBS, MD (Gastroenterology)", speciality: "পরিপাকতন্ত্র, লিভার ও গ্যাস্ট্রোএন্টারোলজি", workingPlace: "শেখ রাসেল গ্যাস্ট্রোলিভার ইনস্টিটিউট", phone: "01711000015" },
    { name: "ডা. খাদিজা তুল কোবরা", degree: "MBBS, FCPS (Hematology)", speciality: "ব্লাড ও রক্তরোগ বিশেষজ্ঞ", workingPlace: "ঢাকা মেডিকেল কলেজ", phone: "01711000016" },
    { name: "ডা. মোস্তফা কামাল", degree: "MBBS, FCPS (Surgery)", speciality: "জেনারেল ও ল্যাপারোস্কোপিক সার্জন", workingPlace: "সোহরাওয়ার্দী হাসপাতাল", phone: "01711000017" },
    { name: "ডা. মনিরা পারভীন", degree: "MBBS, DGO, FCPS", speciality: "গাইনি ও প্রসূতি রোগ বিশেষজ্ঞ", workingPlace: "মাতুয়াইল মা ও শিশু হাসপাতাল", phone: "01711000018" },
    { name: "ডা. জুবায়ের হোসেন", degree: "MBBS, MD (Pulmonology)", speciality: "বক্ষব্যাধি ও হাঁপানি বিশেষজ্ঞ", workingPlace: "জাতীয় বক্ষব্যাধি ইনস্টিটিউট", phone: "01711000019" },
    { name: "ডা. সানজিদা ইসলাম", degree: "MBBS, FCPS (Rheumatology)", speciality: "বাত, ব্যথা ও আর্থ্রাইটিস বিশেষজ্ঞ", workingPlace: "বিএসএমএমইউ", phone: "01711000020" },
    { name: "ডা. ফয়সাল মাহমুদ", degree: "MBBS, MS (Cardiovascular)", speciality: "কার্ডিওভাসকুলার সার্জন", workingPlace: "জাতীয় হৃদরোগ ইনস্টিটিউট", phone: "01711000021" },
    { name: "ডা. নাজনীন আক্তার", degree: "MBBS, FCPS (Pathology)", speciality: "প্যাথলজি ও ল্যাবরেটরি মেডিসিন", workingPlace: "ঢাকা মেডিকেল কলেজ", phone: "01711000022" },
    { name: "ডা. আদনান সামী", degree: "MBBS, MD (Dermatology)", speciality: "চর্ম ও চূল রোগ বিশেষজ্ঞ", workingPlace: "চর্মরোগ ইনস্টিটিউট", phone: "01711000023" },
    { name: "ডা. রুমানা আফরোজ", degree: "MBBS, FCPS (Pediatric Surgery)", speciality: "শিশু সার্জারি বিশেষজ্ঞ", workingPlace: "ঢাকা শিশু হাসপাতাল", phone: "01711000024" },
    { name: "ডা. সাইফুর রহমান", degree: "MBBS, MS (Neuro Surgery)", speciality: "মস্তিষ্ক ও স্নায়ু শল্যচিকিৎসক", workingPlace: "পীর ইয়াসিন হাসপাতাল", phone: "01711000025" },
    { name: "ডা. দিলরুবা খানম", degree: "MBBS, FCPS (Dentistry)", speciality: "দাঁতের রোগ ও অর্থোডোনটিক্স", workingPlace: "ডেন্টাল কলেজ ও হাসপাতাল", phone: "01711000026" },
    { name: "ডা. জহির রায়হান", degree: "MBBS, FCPS (Physical Medicine)", speciality: "ফিজিক্যাল মেডিসিন ও রিহ্যাবিলিটেশন", workingPlace: "সিএমএইচ ঢাকা", phone: "01711000027" },
    { name: "ডা. রাফিয়া সুলতানা", degree: "MBBS, FCPS (Ophthalmology)", speciality: "চোখ ও ফেকো সার্জন", workingPlace: "ইস্পাহানি ইসলামিয়া আই ইনস্টিটিউট", phone: "01711000028" },
    { name: "ডা. তানভীর আহমেদ", degree: "MBBS, MD (Cardiology)", speciality: "ইন্টারভেনশনাল কার্ডিওলজিস্ট", workingPlace: "ল্যাবএইড হসপিটাল", phone: "01711000029" },
    { name: "ডা. সাবরিনা মোস্তারি", degree: "MBBS, FCPS (Gynecology)", speciality: "উচ্চ ঝুঁকিপূর্ণ গর্ভধারণ ও গাইনি বিশেষজ্ঞ", workingPlace: "স্কয়ার হাসপাতাল", phone: "01711000030" }
  ];

  for (const doc of doctorsData) {
    await prisma.doctor.create({
      data: {
        name: doc.name,
        degree: doc.degree,
        speciality: doc.speciality,
        workingPlace: doc.workingPlace,
        phone: doc.phone,
        businessId: business.id
      }
    });
  }

  console.log("সফলভাবে ৩০ জন ডাক্তারের ডাটা যুক্ত করা হয়েছে!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });