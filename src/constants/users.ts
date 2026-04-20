export interface User {
  id: string;
  name: string;
  username: string;
  bio: string;
  avatar: string;
  role: string[];
  prakruti: 'Vata' | 'Pitta' | 'Kapha' | 'Vata-Pitta' | 'Pitta-Kapha' | 'Vata-Kapha';
  karmaScore: number;
  followers: number;
  following: number;
  skills: string[];
  location: string;
  isVerified: boolean;
  joinedDate: string;
  streak?: number;
}

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Arjun Sharma',
  username: 'arjun.sharma',
  bio: 'Dharmic developer & IKS enthusiast. Building tools for Bharat\'s renaissance.',
  avatar: 'https://api.dicebear.com/9.x/micah/svg?seed=Destiny&backgroundColor=2d91ab',
  role: ['Creator', 'Developer'],
  prakruti: 'Pitta',
  karmaScore: 847,
  followers: 234,
  following: 89,
  skills: ['Technology', 'Ideas', 'Governance'],
  location: 'Bengaluru, India',
  isVerified: true,
  joinedDate: '2024-01-15',
  streak: 12,
};

export const USERS: User[] = [
  {
    id: 'u2',
    name: 'Dr. Priya Nair',
    username: 'priya.nair',
    bio: 'Ayurveda practitioner & researcher. Bridging ancient wisdom with modern healthcare.',
    avatar: 'https://api.dicebear.com/9.x/micah/svg?seed=priya&backgroundColor=4caf50',
    role: ['Dharmic Leader', 'Creator'],
    prakruti: 'Vata-Pitta',
    karmaScore: 1243,
    followers: 892,
    following: 145,
    skills: ['Art & Aesthetics', 'Resources', 'Ideas'],
    location: 'Kerala, India',
    isVerified: true,
    joinedDate: '2024-01-01',
  },
  {
    id: 'u3',
    name: 'Vikram Patel',
    username: 'vikram.patel',
    bio: 'Dharmic investor focused on sustainable businesses aligned with Indian values.',
    avatar: 'https://api.dicebear.com/9.x/micah/svg?seed=vikram&backgroundColor=ff8f0e',
    role: ['Investor'],
    prakruti: 'Pitta-Kapha',
    karmaScore: 967,
    followers: 445,
    following: 67,
    skills: ['Resources', 'Governance'],
    location: 'Mumbai, India',
    isVerified: true,
    joinedDate: '2024-02-10',
  },
  {
    id: 'u4',
    name: 'Ananya Krishnan',
    username: 'ananya.krishnan',
    bio: 'Sanskrit scholar & Vedic mathematics teacher. Preserving IKS for future generations.',
    avatar: 'https://api.dicebear.com/9.x/micah/svg?seed=ananya&backgroundColor=8b5cf6',
    role: ['Dharmic Leader', 'Learner'],
    prakruti: 'Vata',
    karmaScore: 1567,
    followers: 1203,
    following: 234,
    skills: ['Art & Aesthetics', 'Ideas'],
    location: 'Varanasi, India',
    isVerified: true,
    joinedDate: '2023-12-01',
  },
  {
    id: 'u5',
    name: 'Rahul Gupta',
    username: 'rahul.gupta',
    bio: 'Climate scientist & social entrepreneur solving environmental challenges through Dharmic lens.',
    avatar: 'https://api.dicebear.com/9.x/micah/svg?seed=rahul&backgroundColor=f59e0b',
    role: ['Creator', 'Investor'],
    prakruti: 'Kapha',
    karmaScore: 734,
    followers: 312,
    following: 178,
    skills: ['Governance', 'Resources', 'Ideas'],
    location: 'Delhi, India',
    isVerified: false,
    joinedDate: '2024-03-05',
  },
  {
    id: 'u6',
    name: 'Meera Devi',
    username: 'meera.devi',
    bio: 'Visual artist & storyteller. Weaving Dharmic narratives through contemporary art.',
    avatar: 'https://api.dicebear.com/9.x/micah/svg?seed=meera&backgroundColor=e91e63',
    role: ['Creator'],
    prakruti: 'Vata-Kapha',
    karmaScore: 856,
    followers: 678,
    following: 201,
    skills: ['Art & Aesthetics'],
    location: 'Jaipur, India',
    isVerified: true,
    joinedDate: '2024-01-20',
  },
  {
    id: 'u7',
    name: 'Suresh Iyer',
    username: 'suresh.iyer',
    bio: 'Dharmic lawyer helping social enterprises navigate the legal landscape.',
    avatar: 'https://api.dicebear.com/9.x/micah/svg?seed=suresh&backgroundColor=795548',
    role: ['Creator', 'Learner'],
    prakruti: 'Pitta',
    karmaScore: 623,
    followers: 198,
    following: 89,
    skills: ['Governance', 'Resources'],
    location: 'Chennai, India',
    isVerified: false,
    joinedDate: '2024-04-01',
  },
];
