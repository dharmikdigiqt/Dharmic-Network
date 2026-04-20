export interface DailyInsight {
  quote: string;
  source: string;
  prakrutiTip: string;
  iksFact: string;
}

export interface Notification {
  id: string;
  type: "reaction" | "comment" | "follow" | "message" | "community" | "mention";
  userId: string;
  userName: string;
  userAvatar: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

export const DAILY_INSIGHTS: DailyInsight[] = [
  {
    quote: "यतो धर्मस्ततो जयः — Where there is Dharma, there is victory.",
    source: "Mahabharata",
    prakrutiTip:
      "Pitta types: Practice cooling pranayama (Sheetali) at noon. Avoid spicy foods in summer.",
    iksFact:
      "The Sulba Sutras (800 BCE) contain the first recorded theorem of what we now call the Pythagorean theorem — predating Pythagoras by 300 years.",
  },
  {
    quote:
      "आत्मनः प्रतिकूलानि परेषां न समाचरेत् — Do not do unto others what is disagreeable to yourself.",
    source: "Mahabharata, Anushasana Parva",
    prakrutiTip:
      "Vata types: Maintain regular meal and sleep times. Warm sesame oil self-massage (Abhyanga) before bath.",
    iksFact:
      "The decimal system and zero were developed in India. The 9th century mathematician Brahmagupta defined rules for arithmetic operations with zero.",
  },
  {
    quote: "तमसो मा ज्योतिर्गमय — Lead me from darkness to light.",
    source: "Brihadaranyaka Upanishad 1.3.28",
    prakrutiTip:
      "Kapha types: Begin your day with invigorating sun salutations. Dry ginger tea kindles digestive fire.",
    iksFact:
      "Panini's Ashtadhyayi (4th century BCE) is the world's first formal grammar — 4,000 rules that anticipated modern computational linguistics by 2,500 years.",
  },
  {
    quote: "सर्वे भवन्तु सुखिनः — May all beings be happy.",
    source: "Brihadaranyaka Upanishad",
    prakrutiTip:
      "Vata-Pitta types: Evening walks in nature help balance both doshas. Avoid screens one hour before sleep.",
    iksFact:
      "The Charaka Samhita (2nd century BCE) classified 8 branches of medicine including surgery and psychiatry — making Ayurveda the world's first systematic medical science.",
  },
  {
    quote: "अहिंसा परमो धर्मः — Non-violence is the highest Dharma.",
    source: "Mahabharata, Adi Parva",
    prakrutiTip:
      "Pitta-Kapha types: Cool morning walks and light meals help maintain balance during seasonal transitions.",
    iksFact:
      "The Jantar Mantar observatories built by Maharaja Jai Singh II (18th century) could measure celestial positions with an accuracy of 2 arcseconds — rivalling modern instruments.",
  },
  {
    quote: "विद्या ददाति विनयम् — Knowledge gives humility.",
    source: "Hitopadesha",
    prakrutiTip:
      "Vata types: Root vegetables and warm soups ground restless Vata energy. Eat slowly and mindfully.",
    iksFact:
      "Ancient Indian mathematicians discovered the value of π (pi) to 5 decimal places. Aryabhata calculated it as 3.1416 in 499 CE — centuries before European mathematicians.",
  },
  {
    quote: "योगस्थः कुरु कर्माणि — Perform action established in yoga.",
    source: "Bhagavad Gita 2.48",
    prakrutiTip:
      "Kapha types: Stimulating breathwork like Kapalabhati clears mental fog and energises the system.",
    iksFact:
      "The concept of binary numbers appears in Pingala's Chandahshastra (3rd century BCE) — predating Leibniz's binary system by nearly two millennia.",
  },
];

export const NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    type: "reaction",
    userId: "u4",
    userName: "Ananya Krishnan",
    userAvatar:
      "https://api.dicebear.com/9.x/micah/svg?seed=ananya&backgroundColor=8b5cf6",
    message:
      "found Truth in your post on Dharmic Network's open-source protocol",
    timestamp: "2024-04-01T10:15:00Z",
    isRead: false,
  },
  {
    id: "n2",
    type: "comment",
    userId: "u2",
    userName: "Dr. Priya Nair",
    userAvatar:
      "https://api.dicebear.com/9.x/micah/svg?seed=priya&backgroundColor=4caf50",
    message: "commented on your question about Vata-Pitta balance",
    timestamp: "2024-04-01T09:45:00Z",
    isRead: false,
  },
  {
    id: "n3",
    type: "follow",
    userId: "u3",
    userName: "Vikram Patel",
    userAvatar:
      "https://api.dicebear.com/9.x/micah/svg?seed=vikram&backgroundColor=ff8f0e",
    message: "started following you",
    timestamp: "2024-04-01T08:30:00Z",
    isRead: false,
  },
  {
    id: "n4",
    type: "community",
    userId: "u1",
    userName: "IKS Enthusiasts",
    userAvatar: "",
    message: "New event: Vedic Mathematics workshop on April 10th",
    timestamp: "2024-03-31T16:00:00Z",
    isRead: true,
  },
  {
    id: "n5",
    type: "mention",
    userId: "u5",
    userName: "Rahul Gupta",
    userAvatar:
      "https://api.dicebear.com/9.x/micah/svg?seed=rahul&backgroundColor=f59e0b",
    message: "mentioned you in the Climate Scientists community post",
    timestamp: "2024-03-31T14:20:00Z",
    isRead: true,
  },
];

export const ACTIVITY_STATS = {
  postsThisWeek: 3,
  reactionsReceived: 156,
  commentsReceived: 23,
  karmaEarned: 47,
  communityContributions: 8,
};
