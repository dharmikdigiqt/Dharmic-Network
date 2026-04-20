export type ListingCategory = 'product' | 'service' | 'course' | 'ebook';

export interface MarketplaceListing {
  id: string;
  sellerId: string;
  sellerName: string;
  sellerAvatar: string;
  sellerRating: number;
  category: ListingCategory;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  currency: string;
  rating: number;
  reviews: number;
  tags: string[];
  isDharmicCertified: boolean;
  isDigital: boolean;
  stock?: number;
}

export const MARKETPLACE_LISTINGS: MarketplaceListing[] = [
  {
    id: 'm1',
    sellerId: 'u2',
    sellerName: 'Dr. Priya Nair',
    sellerAvatar: 'https://api.dicebear.com/9.x/micah/svg?seed=priya&backgroundColor=4caf50',
    sellerRating: 4.9,
    category: 'course',
    title: 'Complete Ayurveda Fundamentals',
    description: 'A comprehensive 40-hour course covering the foundational principles of Ayurveda — from Tridosha theory to Panchakarma treatments. Includes 120 video lectures, practical assessments, and lifetime access.',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format',
    price: 2499,
    currency: 'INR',
    rating: 4.9,
    reviews: 347,
    tags: ['Ayurveda', 'Health', 'Wellness', 'Certification'],
    isDharmicCertified: true,
    isDigital: true,
  },
  {
    id: 'm2',
    sellerId: 'u4',
    sellerName: 'Ananya Krishnan',
    sellerAvatar: 'https://api.dicebear.com/9.x/micah/svg?seed=ananya&backgroundColor=8b5cf6',
    sellerRating: 4.8,
    category: 'course',
    title: 'Sanskrit for Beginners: Devanagari to Conversational',
    description: 'Learn Sanskrit from scratch with this structured 6-week course. Master Devanagari script, basic grammar, and common shlokas. Designed for modern learners with ancient wisdom.',
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&auto=format',
    price: 1799,
    currency: 'INR',
    rating: 4.8,
    reviews: 189,
    tags: ['Sanskrit', 'Language', 'IKS', 'Culture'],
    isDharmicCertified: true,
    isDigital: true,
  },
  {
    id: 'm3',
    sellerId: 'u6',
    sellerName: 'Meera Devi',
    sellerAvatar: 'https://api.dicebear.com/9.x/micah/svg?seed=meera&backgroundColor=e91e63',
    sellerRating: 4.7,
    category: 'product',
    title: 'Warli Digital Art Print — Mandala Series',
    description: 'Limited edition digital art prints inspired by Warli tribal patterns. Each piece is a unique generative composition created by blending traditional motifs with AI. Printed on archival-quality canvas.',
    imageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&auto=format',
    price: 3499,
    currency: 'INR',
    rating: 4.7,
    reviews: 56,
    tags: ['Art', 'Print', 'Warli', 'Digital'],
    isDharmicCertified: true,
    isDigital: false,
    stock: 23,
  },
  {
    id: 'm4',
    sellerId: 'u2',
    sellerName: 'Dr. Priya Nair',
    sellerAvatar: 'https://api.dicebear.com/9.x/micah/svg?seed=priya&backgroundColor=4caf50',
    sellerRating: 4.9,
    category: 'service',
    title: 'Personalized Ayurveda Consultation (60 min)',
    description: 'One-on-one consultation with Dr. Priya Nair. Includes Prakruti assessment, personalized diet and lifestyle recommendations, and a follow-up report. Online via video call.',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&auto=format',
    price: 1999,
    currency: 'INR',
    rating: 4.9,
    reviews: 234,
    tags: ['Consultation', 'Ayurveda', 'Health', 'Wellness'],
    isDharmicCertified: true,
    isDigital: true,
  },
  {
    id: 'm5',
    sellerId: 'u7',
    sellerName: 'Suresh Iyer',
    sellerAvatar: 'https://api.dicebear.com/9.x/micah/svg?seed=suresh&backgroundColor=795548',
    sellerRating: 4.6,
    category: 'service',
    title: 'Social Enterprise Legal Setup Package',
    description: 'Complete legal setup for dharmic social enterprises — company registration, MOA/AOA drafting, compliance checklist, and 3-month legal helpdesk access. Tailored for purpose-driven startups.',
    imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&auto=format',
    price: 4999,
    currency: 'INR',
    rating: 4.6,
    reviews: 45,
    tags: ['Legal', 'Startup', 'Compliance', 'Social'],
    isDharmicCertified: false,
    isDigital: true,
  },
  {
    id: 'm6',
    sellerId: 'u4',
    sellerName: 'Ananya Krishnan',
    sellerAvatar: 'https://api.dicebear.com/9.x/micah/svg?seed=ananya&backgroundColor=8b5cf6',
    sellerRating: 4.8,
    category: 'ebook',
    title: 'Vedic Mathematics: 16 Sutras Explained',
    description: 'A practical guide to all 16 Vedic Mathematics sutras with worked examples, exercises, and applications to modern computing. Perfect for students, educators, and AI researchers.',
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format',
    price: 499,
    currency: 'INR',
    rating: 4.8,
    reviews: 312,
    tags: ['VedicMath', 'Education', 'IKS', 'Ebook'],
    isDharmicCertified: true,
    isDigital: true,
  },
];
