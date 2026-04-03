export type PostType = 'text' | 'audio' | 'image' | 'video' | 'product';
export type Reaction = 'truth' | 'insight' | 'dharmic';

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorUsername: string;
  authorAvatar: string;
  authorKarma: number;
  type: PostType;
  title?: string;
  content: string;
  imageUrl?: string;
  audioUrl?: string;
  community?: string;
  communityId?: string;
  tags: string[];
  reactions: {
    truth: number;
    insight: number;
    dharmic: number;
  };
  comments: number;
  shares: number;
  bookmarks: number;
  timestamp: string;
  isPinned?: boolean;
  isBookmarked?: boolean;
}

export const POSTS: Post[] = [
  {
    id: 'p1',
    authorId: 'u4',
    authorName: 'Ananya Krishnan',
    authorUsername: 'ananya.krishnan',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ananya&backgroundColor=d1f7c4',
    authorKarma: 1567,
    type: 'text',
    title: 'Vedic Mathematics: A Modern Renaissance',
    content: 'The Vedic sutras offer extraordinary computational shortcuts that were documented thousands of years ago. Today, as we build AI systems, I find myself returning to these ancient algorithms for inspiration. The principle of "Anurupyena" (proportionality) maps beautifully to modern neural network optimization. We are not reinventing — we are remembering.',
    community: 'IKS Enthusiasts',
    communityId: 'c1',
    tags: ['VedicMath', 'IKS', 'AI', 'AncientWisdom'],
    reactions: { truth: 234, insight: 189, dharmic: 156 },
    comments: 47,
    shares: 89,
    bookmarks: 123,
    timestamp: '2024-04-01T09:30:00Z',
    isPinned: true,
    isBookmarked: false,
  },
  {
    id: 'p2',
    authorId: 'u2',
    authorName: 'Dr. Priya Nair',
    authorUsername: 'priya.nair',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya&backgroundColor=ffd5dc',
    authorKarma: 1243,
    type: 'audio',
    title: 'Podcast: Tridosha Theory and Modern Genomics',
    content: 'In this 45-minute deep dive, I explore the surprising correlations between Ayurvedic Tridosha theory and modern epigenetic research. The Vata-Pitta-Kapha framework may actually map to distinct metabolic and neurological phenotypes that modern science is only beginning to understand.',
    community: 'Ayurveda Practitioners',
    communityId: 'c2',
    tags: ['Ayurveda', 'Genomics', 'Research', 'Tridosha'],
    reactions: { truth: 178, insight: 234, dharmic: 145 },
    comments: 32,
    shares: 67,
    bookmarks: 98,
    timestamp: '2024-04-01T08:00:00Z',
    isBookmarked: true,
  },
  {
    id: 'p3',
    authorId: 'u1',
    authorName: 'Arjun Sharma',
    authorUsername: 'arjun.sharma',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun&backgroundColor=b6e3f4',
    authorKarma: 847,
    type: 'text',
    title: 'Building Dharmic Network: Open Source Philosophy',
    content: 'Just open-sourced the core protocol layer of our decentralized identity system. Inspired by the Vasudhaiva Kutumbakam principle — the world is one family — we are building infrastructure that respects data sovereignty. Every user owns their identity, their content, and their connections. No corporation in the middle.',
    community: 'Dharmic Developers',
    communityId: 'c3',
    tags: ['OpenSource', 'Blockchain', 'Identity', 'Dharma'],
    reactions: { truth: 145, insight: 167, dharmic: 201 },
    comments: 28,
    shares: 54,
    bookmarks: 67,
    timestamp: '2024-03-31T18:45:00Z',
    isBookmarked: false,
  },
  {
    id: 'p4',
    authorId: 'u5',
    authorName: 'Rahul Gupta',
    authorUsername: 'rahul.gupta',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rahul&backgroundColor=b0e3f4',
    authorKarma: 734,
    type: 'image',
    title: 'Delhi Air Quality: Community Action Plan',
    content: 'Our IITD team has mapped 847 pollution hotspots across Delhi using a community-deployed IoT sensor network. The data reveals that 73% of PM2.5 comes from just 12 industrial clusters. We have a targeted intervention plan ready. Looking for dharmic investors and policy advocates to move this forward.',
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format',
    community: 'Climate Scientists',
    communityId: 'c8',
    tags: ['Climate', 'Delhi', 'AirQuality', 'Research'],
    reactions: { truth: 312, insight: 256, dharmic: 189 },
    comments: 63,
    shares: 134,
    bookmarks: 201,
    timestamp: '2024-03-31T14:20:00Z',
    isBookmarked: false,
  },
  {
    id: 'p5',
    authorId: 'u6',
    authorName: 'Meera Devi',
    authorUsername: 'meera.devi',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=meera&backgroundColor=ffdfbf',
    authorKarma: 856,
    type: 'image',
    title: 'Warli Art Meets Digital Canvas',
    content: 'This series explores Warli tribal art patterns through generative AI. Each piece starts with traditional geometric motifs — circles, triangles, dots — and expands into digital mandalas that pulse with ancient symbolism. Available as limited digital prints. Proceeds support tribal artisans in Maharashtra.',
    imageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&auto=format',
    community: 'Dharmic Artists',
    communityId: 'c7',
    tags: ['Art', 'Warli', 'DigitalArt', 'Tribal'],
    reactions: { truth: 189, insight: 134, dharmic: 267 },
    comments: 41,
    shares: 78,
    bookmarks: 145,
    timestamp: '2024-03-30T11:00:00Z',
    isBookmarked: true,
  },
  {
    id: 'p6',
    authorId: 'u3',
    authorName: 'Vikram Patel',
    authorUsername: 'vikram.patel',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=vikram&backgroundColor=c0aede',
    authorKarma: 967,
    type: 'text',
    title: 'Dharmic Capital: Beyond Returns',
    content: 'Announcing our ₹50 Crore fund for ventures that create measurable social impact while maintaining financial sustainability. We are not a charity, but we measure success differently. Dharma first, Artha follows. Looking for founders building in health, education, environment, and culture sectors.',
    community: 'Dharmic Investors',
    communityId: 'c6',
    tags: ['Investment', 'Impact', 'Fund', 'StartupIndia'],
    reactions: { truth: 256, insight: 178, dharmic: 234 },
    comments: 89,
    shares: 167,
    bookmarks: 234,
    timestamp: '2024-03-29T16:30:00Z',
    isBookmarked: false,
  },
];
