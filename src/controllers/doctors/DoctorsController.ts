// src/controllers/doctors/DoctorsController.ts
import type { Response } from 'express';
import { prisma } from '../../lib/prisma.js';
import { AuthRequest } from '../../middleware/authMiddleware.js';

export const seedDoctors = async (req: AuthRequest, res: Response) => {
  try {
    console.log('🔍 ===== START SEEDING NILPHAMARI DOCTORS =====');

    const userId = req.userId || (req as any).user?.id || (req as any).user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
    }

    const doctorsData = [
      { 
        name: "ডা. মো. সামিউর রহমান শাহ্ (সামি)", 
        degree: "MBBS, BCS (Health), MD (Cardiology), FCPS (Medicine-FP), MACP (USA), CCD", 
        speciality: "হৃদরোগ, মেডিসিন ও ডায়াবেটিস বিশেষজ্ঞ", 
        workingPlace: "জাতীয় হৃদরোগ ইনস্টিটিউট ও হাসপাতাল, ঢাকা / এ আর জেনারেল হাসপাতাল, নীলফামারী", 
        phone: "01733077000", 
        rating: 4.9 
      },
      { 
        name: "ডা. সৈয়দ হাসান আলী", 
        degree: "MBBS, D-Ortho (NITOR)", 
        speciality: "হাড়, জোড় ও ট্রমা সার্জন", 
        workingPlace: "পঙ্গু হাসপাতাল, ঢাকা / এ আর জেনারেল হাসপাতাল, নীলফামারী", 
        phone: "01733077001", 
        rating: 4.8 
      },
      { 
        name: "ডা. মো. মনিরুজ্জামান (মনি)", 
        degree: "MBBS, BCS (Health), CCD (BIRDEM), CMU", 
        speciality: "মেডিসিন, ডায়াবেটিস ও সনোলজিস্ট", 
        workingPlace: "২৫০ শয্যা বিশিষ্ট জেনারেল হাসপাতাল, নীলফামারী", 
        phone: "01733077002", 
        rating: 4.7 
      },
      { 
        name: "ডা. মো. রেজাউল করিম", 
        degree: "MBBS, BCS (Health), CCD (BIRDEM)", 
        speciality: "মেডিসিন ও ডায়াবেটিস বিশেষজ্ঞ", 
        workingPlace: "২৫০ শয্যা বিশিষ্ট জেনারেল হাসপাতাল, নীলফামারী", 
        phone: "01733077003", 
        rating: 4.8 
      },
      { 
        name: "ডা. মো. মিনহাজ উদ্দিন রাজীব", 
        degree: "MBBS, BCS (Health), FCPS (Surgery)", 
        speciality: "জেনারেল ও ল্যাপারোস্কোপিক সার্জন", 
        workingPlace: "২৫০ শয্যা বিশিষ্ট জেনারেল হাসপাতাল, নীলফামারী", 
        phone: "01733077004", 
        rating: 4.9 
      },
      { 
        name: "ডা. মো. ময়নুল হক চৌধুরী", 
        degree: "MBBS, BCS (Health), CPA (USA)", 
        speciality: "কিডনি রোগ বিশেষজ্ঞ (নেফ্রোলজিস্ট)", 
        workingPlace: "নীলফামারী মেডিকেল কলেজ ও হাসপাতাল", 
        phone: "01733077005", 
        rating: 4.8 
      },
      { 
        name: "ডা. মোছা: হাসিনা বানু", 
        degree: "MBBS, BCS (Health), FCPS (Gynae & Obs)", 
        speciality: "স্ত্রী রোগ ও প্রসূতিবিদ্যা বিশেষজ্ঞ", 
        workingPlace: "২৫০ শয্যা বিশিষ্ট জেনারেল হাসপাতাল, নীলফামারী", 
        phone: "01733077006", 
        rating: 4.9 
      },
      { 
        name: "ডা. রূপায়ন দাশ", 
        degree: "MBBS, BCS (Health), D-Ortho", 
        speciality: "অর্থোপেডিক ও ট্রমা সার্জন", 
        workingPlace: "২৫০ শয্যা বিশিষ্ট জেনারেল হাসপাতাল, নীলফামারী", 
        phone: "01733077007", 
        rating: 4.7 
      },
      { 
        name: "ডা. আনছার আলী", 
        degree: "MBBS, DCO, Fellow IOL", 
        speciality: "চক্ষু রোগ বিশেষজ্ঞ ও সার্জন", 
        workingPlace: "ইসলামিয়া আই হসপিটাল, নীলফামারী", 
        phone: "01733077008", 
        rating: 4.8 
      },
      { 
        name: "ডা. মুহাম্মদ লিটন খন্দকার", 
        degree: "MBBS, BCS (Health), FCPS (ENT)", 
        speciality: "নাক, কান ও গলা বিশেষজ্ঞ", 
        workingPlace: "সদর হাসপাতাল, নীলফামারী", 
        phone: "01733077009", 
        rating: 4.7 
      },
      { 
        name: "ডা. মো. মহিমিনুল ইসলাম", 
        degree: "MBBS, Diploma in Dermatology", 
        speciality: "চর্ম, অ্যালার্জি ও যৌন রোগ বিশেষজ্ঞ", 
        workingPlace: "মডার্ন ডায়াগনস্টিক সেন্টার, নীলফামারী", 
        phone: "01733077010", 
        rating: 4.8 
      },
      { 
        name: "ডা. এ.কে.এম. ওয়াজেদ আলী", 
        degree: "MBBS, FCPS (Surgery)", 
        speciality: "জেনারেল ও ল্যাপারোস্কোপিক সার্জন", 
        workingPlace: "শহীদ ডাক্তার শামসুল হক হসপিটাল, সৈয়দপুর", 
        phone: "01717000001", 
        rating: 4.9 
      },
      { 
        name: "ডা. মো. মোস্তাফিজুর রহমান", 
        degree: "MBBS, MD (Chest)", 
        speciality: "বক্ষব্যাধি, হাঁপানি ও টিবি বিশেষজ্ঞ", 
        workingPlace: "১০০ শয্যা বিশিষ্ট হাসপাতাল, সৈয়দপুর", 
        phone: "01717000002", 
        rating: 4.8 
      },
      { 
        name: "ডা. সেলিনা পারভীন মিলি", 
        degree: "MBBS, FCPS (Gynae)", 
        speciality: "স্ত্রী রোগ ও প্রসূতিবিদ্যা বিশেষজ্ঞ", 
        workingPlace: "সৈয়দপুর ডায়াবেটিক ও ম্যাটার্নিটি হসপিটাল", 
        phone: "01717000003", 
        rating: 4.9 
      },
      { 
        name: "ডা. বিপ্লব কুমার সরকার", 
        degree: "MBBS, MS (Orthopedics)", 
        speciality: "অর্থোপেডিক ও ট্রমা সার্জন", 
        workingPlace: "সৈয়দপুর আধুনিক হাসপাতাল", 
        phone: "01717000004", 
        rating: 4.7 
      },
      { 
        name: "ডা. মো. গোলাম মোস্তফা", 
        degree: "MBBS, DCH (Pediatrics)", 
        speciality: "শিশু রোগ বিশেষজ্ঞ", 
        workingPlace: "১০০ শয্যা বিশিষ্ট হাসপাতাল, সৈয়দপুর", 
        phone: "01717000005", 
        rating: 4.8 
      },
      { 
        name: "ডা. শাহানাজ পারভীন", 
        degree: "MBBS, FCPS (Skin & VD)", 
        speciality: "চর্ম ও যৌন রোগ বিশেষজ্ঞ", 
        workingPlace: "সৈয়দপুর স্পেশালিষ্ট ক্লিনিক", 
        phone: "01717000006", 
        rating: 4.7 
      },
      { 
        name: "ডা. কে. এম. রেজাউল করিম", 
        degree: "MBBS, MS (ENT)", 
        speciality: "নাক, কান ও গলা বিশেষজ্ঞ", 
        workingPlace: "সৈয়দপুর ইসলামী ব্যাংক কমিউনিটি হসপিটাল", 
        phone: "01717000007", 
        rating: 4.8 
      }
    ];

    const result = await prisma.doctor.createMany({
      data: doctorsData,
      skipDuplicates: true,
    });

    console.log(`✅ ${result.count} টি নীলফামারী জেলার রিয়েল ডাক্তারের ডাটা সফলভাবে যুক্ত করা হয়েছে!`);

    return res.status(201).json({
      success: true,
      count: result.count,
      message: 'সফলভাবে নীলফামারী জেলার বিশেষজ্ঞ ডাক্তারদের ডাটা সিড করা হয়েছে!'
    });

  } catch (error: any) {
    console.error('❌ ERROR seeding Nilphamari doctors:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to seed Nilphamari doctors',
      details: error.message
    });
  }
};