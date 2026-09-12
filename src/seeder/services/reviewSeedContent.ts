// Dummy reviewer names + comments for the reviews table.
// Rotation by index keeps neighbouring profiles varied.
export const REVIEWER_NAMES = [
  'রফিকুল ইসলাম', 'শারমিন আক্তার', 'মো. করিম উদ্দিন', 'নাসরিন বেগম',
  'আব্দুল মালেক', 'ফারহানা ইয়াসমিন', 'মো. সাইদুর রহমান', 'তাসলিমা খাতুন',
  'এনামুল হক', 'রুবিনা পারভীন', 'মো. জাহাঙ্গীর আলম', 'সালমা বেগম',
  'হাবিবুর রহমান', 'মর্জিনা আক্তার', 'মো. শফিকুল ইসলাম', 'দিলরুবা ইয়াসমিন',
  'আতিকুর রহমান', 'কামরুন নাহার', 'মো. মাহবুব আলম', 'শিউলি বেগম',
  'তানভীর আহমেদ', 'রোকেয়া সুলতানা', 'মো. ইমরান হোসেন', 'আফসানা মিম',
];

export interface ReviewComment {
  rating: number;
  title?: string;
  comment: string;
}

export const REVIEW_COMMENTS: ReviewComment[] = [
  {
    rating: 5,
    title: 'খুবই আন্তরিক চিকিৎসক',
    comment:
      'ডাক্তার খুব ধৈর্য ধরে আমার প্রতিটি প্রশ্নের উত্তর দিয়েছেন। প্রথমবারের মতো চিকিৎসকের কাছে এত স্বস্তি পেলাম।',
  },
  {
    rating: 5,
    title: 'সঠিক রোগনির্ণয়',
    comment:
      'মা দীর্ঘদিন ধরে অসুখে ভুগছিলেন। ডাক্তারের পরামর্শ ও ওষুধে এখন সম্পূর্ণ নিয়ন্ত্রণে আছেন। আলহামদুলিল্লাহ।',
  },
  {
    rating: 5,
    comment:
      'চিকিৎসার প্রতিটি বিষয় বিস্তারিত ব্যাখ্যা করেন, কিছু এড়িয়ে যান না। সত্যিই একজন আন্তরিক চিকিৎসক।',
  },
  {
    rating: 4,
    title: 'ভালো অভিজ্ঞতা',
    comment:
      'সিরিয়াল নিতে একটু অপেক্ষা করতে হয়েছে, তবে চিকিৎসা নিয়ে সন্তুষ্ট। রোগ বুঝিয়ে বলার ধরনটা ভালো লেগেছে।',
  },
  {
    rating: 5,
    title: 'অপ্রয়োজনীয় টেস্ট দেন না',
    comment:
      'অন্য জায়গায় অনেক টেস্ট লিখেছিল, এখানে শুধু দরকারি পরীক্ষাই দিয়েছেন। খরচও কম হয়েছে, রোগও ধরা পড়েছে।',
  },
  {
    rating: 4,
    comment:
      'ব্যবহার খুবই ভালো। ভিড় একটু বেশি থাকে, তাই সময় নিয়ে যাওয়া ভালো। চিকিৎসা ঠিকঠাক পেয়েছি।',
  },
  {
    rating: 5,
    title: 'পরিবারের বিশ্বস্ত ডাক্তার',
    comment:
      'আমাদের পুরো পরিবার এখন এখানেই চিকিৎসা নেয়। ফোনে ফলোআপের সুবিধাটা দারুণ। সবাইকে সুপারিশ করব।',
  },
  {
    rating: 3,
    title: 'মোটামুটি',
    comment:
      'চিকিৎসা ভালোই, তবে চেম্বারে বসার জায়গা কম আর অপেক্ষার সময়টা বেশি। এই দুটো ঠিক হলে পাঁচ তারকা দিতাম।',
  },
  {
    rating: 5,
    comment:
      'জরুরি অবস্থায় রাতেই পরামর্শ পেয়েছি। এমন দায়িত্বশীল আচরণ আজকাল খুব কম দেখা যায়। কৃতজ্ঞ থাকব।',
  },
  {
    rating: 4,
    title: 'সন্তুষ্ট',
    comment:
      'ওষুধের পাশাপাশি খাবার আর ব্যায়ামের পরামর্শ দিয়েছেন। এক মাসেই অনেক উন্নতি টের পাচ্ছি।',
  },
  {
    rating: 5,
    title: 'শিশুর জন্য দারুণ',
    comment:
      'আমার ছেলে ডাক্তার দেখাতে ভয় পেত, কিন্তু এখানে হাসিমুখে চিকিৎসা নিয়েছে। শিশুদের সাথে ব্যবহার অসাধারণ।',
  },
  {
    rating: 4,
    comment: 'ফি তুলনামূলক যুক্তিসংগত। রিপোর্ট দেখে ধীরে ধীরে বুঝিয়ে দেন। আবার আসব ইনশাআল্লাহ।',
  },
];

export const HOSPITAL_COMMENTS: ReviewComment[] = [
  {
    rating: 5,
    title: 'পরিষ্কার ও যত্নশীল সেবা',
    comment: 'ওয়ার্ড পরিষ্কার, নার্সদের ব্যবহার ভালো। ভর্তি প্রক্রিয়া দ্রুত হয়েছে।',
  },
  {
    rating: 4,
    title: 'ভালো সেবা',
    comment: 'ডাক্তার সময়মতো রাউন্ড দেন। ফার্মেসিতে বেশিরভাগ ওষুধ পাওয়া যায়।',
  },
  {
    rating: 5,
    comment: 'জরুরি বিভাগ ২৪ ঘণ্টা খোলা থাকায় রাতে বাবাকে নিয়ে ভোগান্তি হয়নি। ধন্যবাদ।',
  },
  {
    rating: 4,
    title: 'সন্তোষজনক',
    comment: 'বহির্বিভাগে ভিড় থাকে, সকালে গেলে সিরিয়াল তাড়াতাড়ি পাওয়া যায়। চিকিৎসা ভালো।',
  },
  {
    rating: 5,
    title: 'নিরাপদ প্রসব',
    comment: 'আমার স্ত্রীর নিরাপদ প্রসব এখানেই হয়েছে। ধাত্রী ও চিকিৎসক দুজনেই খুব যত্নবান ছিলেন।',
  },
  {
    rating: 3,
    comment: 'সেবা মোটামুটি ভালো, তবে বসার জায়গা ও টয়লেট পরিষ্কার আরও উন্নত করা দরকার।',
  },
];

export interface DummyReview {
  rating: number;
  reviewerName: string;
  title?: string;
  comment: string;
  status: 'APPROVED' | 'PENDING';
  daysAgo: number;
}

/** 3–5 reviews per profile — ~1 in 10 stays PENDING to demo moderation. */
export function buildDummyReviews(index: number, hospital = false): DummyReview[] {
  const pool = hospital ? HOSPITAL_COMMENTS : REVIEW_COMMENTS;
  const count = 3 + (index % 3); // 3, 4 or 5
  const out: DummyReview[] = [];
  for (let i = 0; i < count; i++) {
    const pick = pool[(index * 5 + i * 3) % pool.length]!;
    out.push({
      rating: pick.rating,
      reviewerName: REVIEWER_NAMES[(index * 7 + i * 5) % REVIEWER_NAMES.length]!,
      title: pick.title,
      comment: pick.comment,
      status: (index + i) % 10 === 9 ? 'PENDING' : 'APPROVED',
      daysAgo: (index * 11 + i * 17) % 180 + 2,
    });
  }
  return out;
}
