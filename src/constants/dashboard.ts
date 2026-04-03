export interface DailyInsight {
  quote: string;
  source: string;
  prakrutiTip: string;
  iksFact: string;
}

export interface Notification {
  id: string;
  type: 'reaction' | 'comment' | 'follow' | 'message' | 'community' | 'mention';
  userId: string;
  userName: string;
  userAvatar: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

export const DAILY_INSIGHTS: DailyInsight[] = [
  {
    quote: 'यतो धर्मस्ततो जयः — Where there is Dharma, there is victory.',
    source: 'Mahabharata',
    prakrutiTip: 'Pitta types: Practice cooling pranayama (Sheetali) at noon. Avoid spicy foods in summer.',
    iksFact: 'The Sulba Sutras (800 BCE) contain the first recorded theorem of what we now call the Pythagorean theorem — predating Pythagoras by 300 years.',
  },
  {
    quote: 'आत्मनः प्रतिकूलानि परेषां न समाचरेत् — Do not do unto others what is disagreeable to yourself.',
    source: 'Mahabharata, Anushasana Parva',
    prakrutiTip: 'Vata types: Maintain regular meal and sleep times. Warm sesame oil self-massage (Abhyanga) before bath.',
    iksFact: 'The decimal system and zero were developed in India. The 9th century mathematician Brahmagupta defined rules for arithmetic operations with zero.',
  },
];

export const NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    type: 'reaction',
    userId: 'u4',
    userName: 'Ananya Krishnan',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ananya&backgroundColor=d1f7c4',
    message: 'found Truth in your post on Dharmic Network\'s open-source protocol',
    timestamp: '2024-04-01T10:15:00Z',
    isRead: false,
  },
  {
    id: 'n2',
    type: 'comment',
    userId: 'u2',
    userName: 'Dr. Priya Nair',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya&backgroundColor=ffd5dc',
    message: 'commented on your question about Vata-Pitta balance',
    timestamp: '2024-04-01T09:45:00Z',
    isRead: false,
  },
  {
    id: 'n3',
    type: 'follow',
    userId: 'u3',
    userName: 'Vikram Patel',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=vikram&backgroundColor=c0aede',
    message: 'started following you',
    timestamp: '2024-04-01T08:30:00Z',
    isRead: false,
  },
  {
    id: 'n4',
    type: 'community',
    userId: 'u1',
    userName: 'IKS Enthusiasts',
    userAvatar: '',
    message: 'New event: Vedic Mathematics workshop on April 10th',
    timestamp: '2024-03-31T16:00:00Z',
    isRead: true,
  },
  {
    id: 'n5',
    type: 'mention',
    userId: 'u5',
    userName: 'Rahul Gupta',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rahul&backgroundColor=b0e3f4',
    message: 'mentioned you in the Climate Scientists community post',
    timestamp: '2024-03-31T14:20:00Z',
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
