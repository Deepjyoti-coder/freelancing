export interface MemoryItem {
  date?: string;
  title?: string;
  description: string;
  imageUrl?: string;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent: string;
}

export interface SurpriseData {
  recipientName: string;
  senderName: string;
  occasion: 'birthday' | 'romantic' | 'anniversary' | 'friendship' | string;
  style: string;
  message: string;
  whatsapp?: string;
  email?: string;
  musicUrl?: string;
  themeColors?: ThemeColors;
  photos: string[];
  memories: MemoryItem[];
}

export interface ExperienceCategory {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  icon: string;
  gradient: string;
}

export const EXPERIENCE_CATEGORIES: ExperienceCategory[] = [
  {
    slug: 'birthday',
    title: 'Birthday',
    description: 'Make their birthday more than just another day.',
    longDescription: 'A birthday surprise that unfolds like a personalized digital book. Combine happy birthday letters, childhood memories, balloon releases, and background tunes to celebrate them in style.',
    icon: 'Gift',
    gradient: 'from-orange-400 via-pink-500 to-purple-600',
  },
  {
    slug: 'romantic',
    title: 'Love Story',
    description: 'Turn your story into something they can experience.',
    longDescription: 'For relationship milestones, anniversaries, valentine surprises, or spontaneous confessions. Design a premium cinematic record of your journeys, milestones, and soft messages.',
    icon: 'Heart',
    gradient: 'from-pink-500 via-red-500 to-purple-600',
  },
  {
    slug: 'anniversary',
    title: 'Anniversary',
    description: "Celebrate everything you've built together.",
    longDescription: 'Perfect for couples. Share a beautiful digital gallery of your wedding day, key milestones, and a moving anniversary note accompanied by classical backing tracks.',
    icon: 'Sparkles',
    gradient: 'from-blue-500 via-indigo-500 to-purple-600',
  },
  {
    slug: 'friendship',
    title: 'Friendship',
    description: 'Inside jokes, memories and chaos — beautifully preserved.',
    longDescription: 'Relive the high-school trips, the college late-nights, and your favorite chaotic pictures. A lively interactive tribute to best friends.',
    icon: 'Smile',
    gradient: 'from-yellow-400 via-orange-500 to-red-500',
  },
  {
    slug: 'proposal',
    title: 'Proposal',
    description: 'Create the moment before the question.',
    longDescription: 'Design an unforgettable prelude. Lead them through the memory lane of your love, build up tension with beautiful transitions, and reveal the final question dynamically on their screen.',
    icon: 'Activity',
    gradient: 'from-purple-500 via-indigo-600 to-blue-500',
  },
  {
    slug: 'surprise',
    title: 'Special Surprise',
    description: "Have an idea? Let's build it.",
    longDescription: 'Need something completely unique? A combination of coordinates, customized interactions, custom themes, and maps. Let’s collaborate and design the dream.',
    icon: 'PartyPopper',
    gradient: 'from-emerald-400 via-teal-500 to-blue-600',
  },
];

export interface ClientProject {
  id: string;
  title: string;
  client: string;
  recipient: string;
  occasion: string;
  location: string;
  tagline: string;
  description: string;
  letter: string;
  highlights: string[];
  url: string;
  previewSlug: string;
  thumbnailUrl: string;
  secondaryImageUrl?: string;
  badge: string;
  stats: { label: string; value: string }[];
}

export const FEATURED_PROJECTS: ClientProject[] = [
  {
    id: 'anikesh-aarushi',
    title: 'Happy Birthday, Aarushi — from Anikesh',
    client: 'Anikesh',
    recipient: 'Aarushi',
    occasion: 'Birthday & Love Story',
    location: 'Gorakhpur, UP ➔ New Delhi',
    tagline: 'Two cities. Two states. One heart.',
    description: 'A handmade digital birthday letter spanning 820 km — written with nothing but love. Custom built with interactive distance counters, emotional letters, and memories.',
    letter: "Dear Aarushi, I never imagined that someone living in another city could become my home. There are moments when I wish the distance between Gorakhpur, UP and New Delhi could disappear for just one evening — so I could sit beside you, hold your hand, and tell you how grateful I am that you're in my life. Happy birthday, my favourite person. I promise to keep choosing you, no matter how many miles separate us. Forever Yours, Anikesh ❤",
    highlights: [
      '820 km Long Distance Counter & Journey Route',
      'Interactive Envelope & Unfolding Letter Experience',
      'Touch My Heart Crystal & 8 Reasons Why I Love You',
      'Ambient Soundtrack & Starlit Midnight Aesthetics',
      'Interactive Memory Gallery & Keepsake Cards'
    ],
    url: 'https://anikesh.lovable.app',
    previewSlug: 'anikesh-aarushi',
    thumbnailUrl: '/anikesh-preview.png',
    secondaryImageUrl: '/anikesh-letter.png',
    badge: 'Delivered Client Work',
    stats: [
      { label: 'Distance', value: '820 km' },
      { label: 'Turnaround', value: '48 Hours' },
      { label: 'Client Feedback', value: '100% Loved' }
    ]
  }
];

export const DEMO_SURPRISES: Record<string, SurpriseData> = {
  'anikesh-aarushi': {
    recipientName: 'Aarushi',
    senderName: 'Anikesh',
    occasion: 'birthday',
    style: 'Romantic & Long Distance',
    message: 'Dear Aarushi, I never imagined that someone living in another city could become my home. There are moments when I wish the distance between Gorakhpur, UP and New Delhi could disappear for just one evening — so I could sit beside you, hold your hand, and tell you how grateful I am that you\'re in my life. Happy birthday, my favourite person. I promise to keep choosing you, no matter how many miles separate us. Forever Yours, Anikesh ❤',
    whatsapp: '916001746854',
    email: 'info@momentsbydeepjyoti.com',
    musicUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    themeColors: {
      primary: '#E11D48',
      secondary: '#BE185D',
      background: '#0F172A',
      text: '#F8FAFC',
      accent: '#FB7185'
    },
    photos: [
      '/anikesh-preview.png',
      '/anikesh-letter.png',
      'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&q=80',
      'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&q=80'
    ],
    memories: [
      {
        date: '820 km Apart',
        title: 'Gorakhpur to New Delhi',
        description: 'Two cities. Two states. One heart. Love doesn\'t count kilometers. It counts moments.',
        imageUrl: '/anikesh-preview.png'
      },
      {
        date: 'Daily Calls & Messages',
        title: 'My Peace in Every Storm',
        description: 'Every conversation with you makes even the longest days feel lighter. Thank you for making distance feel smaller.',
        imageUrl: '/anikesh-letter.png'
      },
      {
        date: 'Birthday Promise',
        title: 'Forever Yours',
        description: 'No matter how many kilometers separate us today, I dream of the day they will disappear completely. Happy Birthday Aarushi!',
        imageUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&q=80'
      }
    ]
  },
  'aarav-birthday': {
    recipientName: 'Aarav',
    senderName: 'Deepjyoti',
    occasion: 'birthday',
    style: 'Elegant',
    message: 'Wishing you the happiest of birthdays, Aarav! You bring so much energy and joy to everyone around you. Here is a little walk down memory lane to celebrate your special day. Keep shining and coding! ✨',
    whatsapp: '6001746854',
    email: 'info@moments.com',
    musicUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    themeColors: {
      primary: '#3B82F6',
      secondary: '#8B5CF6',
      background: '#F8FAFC',
      text: '#1E293B',
      accent: '#F59E0B'
    },
    photos: [
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&q=80',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80',
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80'
    ],
    memories: [
      {
        date: 'June 2024',
        title: 'The Coding Marathon',
        description: 'That crazy 48-hour hackathon where we drank 12 cups of coffee and built a weird app that we forgot about, but laughed all night.',
        imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80'
      },
      {
        date: 'October 2024',
        title: 'Road Trip to the Hills',
        description: 'Getting flat tire in the middle of nowhere. It felt like a disaster then, but it became one of our best travel memories.',
        imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80'
      },
      {
        date: 'New Year Eve 2025',
        title: 'Welcoming the New Year',
        description: 'Shouting resolution pledges that neither of us kept, but promising to always stay friends.',
        imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80'
      }
    ]
  },
  'sukanya-love': {
    recipientName: 'Sukanya',
    senderName: 'Deepjyoti',
    occasion: 'romantic',
    style: 'Romantic',
    message: 'To the girl who holds my heart, Sukanya. Every single day with you feels like a dream. Thank you for your warmth, your laughter, and the endless support. Here is a small compilation of our beautiful moments. I love you ❤️',
    whatsapp: '6001746854',
    email: 'info@moments.com',
    musicUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    themeColors: {
      primary: '#EC4899',
      secondary: '#D946EF',
      background: '#FFF1F2',
      text: '#4C0519',
      accent: '#EF4444'
    },
    photos: [
      'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&q=80',
      'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80',
      'https://images.unsplash.com/photo-1507504038482-7621c518d50b?w=600&q=80'
    ],
    memories: [
      {
        date: 'Sep 12, 2023',
        title: 'When Our Eyes First Met',
        description: 'In that little bookstore downtown. You were looking for a poetry collection, and I was just looking at you.',
        imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80'
      },
      {
        date: 'Dec 25, 2023',
        title: 'Our First Sunset Date',
        description: 'We sat at the beach, shivering in the cold breeze, drinking warm chai and talking about nothing for three hours.',
        imageUrl: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600&q=80'
      },
      {
        date: 'March 2024',
        title: 'Moving to the Same City',
        description: 'No more long distance calls. Finally in the same place, building our little universe day by day.',
        imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80'
      }
    ]
  },
  'rahul-anniversary': {
    recipientName: 'Rahul & Priya',
    senderName: 'Their Friends',
    occasion: 'anniversary',
    style: 'Cinematic',
    message: 'Happy 5th Anniversary Rahul & Priya! Watching you two grow together has been an absolute inspiration. From high school sweethearts to a happily married couple, you are perfect. Cheers to 5 years of love and laughter!',
    whatsapp: '6001746854',
    email: 'info@moments.com',
    musicUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    themeColors: {
      primary: '#8B5CF6',
      secondary: '#3B82F6',
      background: '#FAF5FF',
      text: '#2E1065',
      accent: '#10B981'
    },
    photos: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80',
      'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=600&q=80'
    ],
    memories: [
      {
        date: 'Aug 29, 2021',
        title: 'The Big Day',
        description: 'Surrounded by everyone who loves you, tying the knot and promising a lifetime of smiles.',
        imageUrl: 'https://images.unsplash.com/photo-1519225495810-7512c696505a?w=600&q=80'
      },
      {
        date: 'July 2022',
        title: 'Buying the First Home',
        description: 'Tired, messy, surrounded by cardboard boxes, but holding keys to your own little sanctuary.',
        imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80'
      },
      {
        date: 'May 2024',
        title: 'The European Holiday',
        description: 'Losing passports in Rome, eating too much pasta in Florence, and standing in awe at the Colosseum.',
        imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80'
      }
    ]
  },
  'friends-forever': {
    recipientName: 'The Gang',
    senderName: 'Anik',
    occasion: 'friendship',
    style: 'Cute',
    message: 'To the craziest group of human beings ever assembled. Thank you for the endless group chat spam, the terrible jokes, the spontaneous planning, and for always having my back. We are friends forever!',
    whatsapp: '6001746854',
    email: 'info@moments.com',
    musicUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    themeColors: {
      primary: '#F59E0B',
      secondary: '#EF4444',
      background: '#FEF3C7',
      text: '#78350F',
      accent: '#10B981'
    },
    photos: [
      'https://images.unsplash.com/photo-1506869648501-5541e104737b?w=600&q=80',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&q=80',
      'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=600&q=80',
      'https://images.unsplash.com/photo-1525026198548-4baa34f311ff?w=600&q=80'
    ],
    memories: [
      {
        date: 'College 2021',
        title: 'Bunking Lecture for Tea',
        description: 'That rainy afternoon we sat under the local tea stall for 3 hours, debating why cats stare at walls, and got kicked out of class next day.',
        imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80'
      },
      {
        date: 'Winter 2022',
        title: 'The Failed Camping Trip',
        description: 'It rained all night, the tent leaked, we slept in the car trunk, but we sang 90s songs at the top of our lungs until sunrise.',
        imageUrl: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80'
      },
      {
        date: 'Present Day',
        title: 'Still Together',
        description: 'No matter how busy our schedules get, or how far apart we live, we always make time for the group chat drama.',
        imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80'
      }
    ]
  }
};
