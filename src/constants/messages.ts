export interface DirectMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

export interface DmConversation {
  userId: string;
  lastMessage: string;
  time: string;
  unread: number;
}

export interface Reaction {
  emoji: string;
  count: number;
  reacted: boolean;
}

export interface ChannelMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  reactions?: Reaction[];
}

export interface Channel {
  id: string;
  name: string;
  type: "text" | "announcement" | "voice";
  description?: string;
  unread?: number;
}

export const DM_CONVERSATIONS: DmConversation[] = [
  { userId: "u2", lastMessage: "Let's schedule a call.", time: "10:40 AM", unread: 0 },
  { userId: "u4", lastMessage: "I've been studying the Sulba Sutras...", time: "Yesterday", unread: 2 },
  { userId: "u3", lastMessage: "Interested in your project!", time: "Monday", unread: 0 },
];

export const DM_MESSAGES: Record<string, DirectMessage[]> = {
  u2: [
    { id: "1", senderId: "u2", content: "Namaste! I saw your post about the decentralized identity system. Very inspiring work!", timestamp: "10:30 AM", isOwn: false },
    { id: "2", senderId: "u1", content: "Namaste Dr. Priya! Thank you. Inspired by the Vasudhaiva Kutumbakam principle.", timestamp: "10:35 AM", isOwn: true },
    { id: "3", senderId: "u2", content: "Would love to collaborate on integrating Prakruti profiles into the identity system.", timestamp: "10:37 AM", isOwn: false },
    { id: "4", senderId: "u1", content: "That's a brilliant idea! Let's schedule a call.", timestamp: "10:40 AM", isOwn: true },
  ],
  u4: [
    { id: "1", senderId: "u4", content: "Your question about Vedic Mathematics in the IKS community was excellent!", timestamp: "Yesterday", isOwn: false },
    { id: "2", senderId: "u1", content: "Thank you! I've been studying the Sulba Sutras and their connection to modern geometry.", timestamp: "Yesterday", isOwn: true },
  ],
  u3: [
    { id: "1", senderId: "u3", content: "Interested in your open-source project on Dharmic identity!", timestamp: "Monday", isOwn: false },
  ],
};

export const COMMUNITY_CHANNELS: Record<string, Channel[]> = {
  c1: [
    { id: "c1-general", name: "general", type: "text", description: "General discussions about IKS", unread: 3 },
    { id: "c1-research", name: "vedic-research", type: "text", description: "Research papers and findings" },
    { id: "c1-events", name: "events", type: "text", description: "Upcoming satsangs and workshops", unread: 1 },
    { id: "c1-resources", name: "resources", type: "text", description: "Books, papers, and learning materials" },
  ],
  c2: [
    { id: "c2-general", name: "general", type: "text", unread: 5 },
    { id: "c2-consult", name: "case-discussions", type: "text", description: "Clinical case studies and discussions" },
    { id: "c2-herbs", name: "herb-research", type: "text", description: "Herbal medicine research" },
    { id: "c2-events", name: "events", type: "text" },
  ],
  c3: [
    { id: "c3-general", name: "general", type: "text", unread: 2 },
    { id: "c3-collab", name: "collaboration", type: "text", description: "Find project collaborators" },
    { id: "c3-tech", name: "tech-stack", type: "text", description: "Technology discussions" },
    { id: "c3-opensource", name: "open-source", type: "text", description: "Open source projects and contributions" },
  ],
  c9: [
    { id: "c9-general", name: "general", type: "text" },
    { id: "c9-ideas", name: "startup-ideas", type: "text", description: "Share and validate startup ideas" },
    { id: "c9-funding", name: "funding", type: "text", description: "Funding opportunities and investor connect" },
    { id: "c9-events", name: "events", type: "text" },
  ],
};

export const CHANNEL_MESSAGES: Record<string, ChannelMessage[]> = {
  "c1-general": [
    { id: "1", senderId: "u4", content: "Namaste everyone! Who's joining the Vedic Mathematics workshop this Saturday at IITD? 🙏", timestamp: "9:15 AM", isOwn: false },
    { id: "2", senderId: "u2", content: "I'll be there! The Sulba Sutra session sounds particularly enriching.", timestamp: "9:22 AM", isOwn: false },
    { id: "3", senderId: "u1", content: "Looking forward to it! Also just shared a fascinating paper on Pingala's binary number system in #vedic-research", timestamp: "9:30 AM", isOwn: true },
    { id: "4", senderId: "u5", content: "The parallels between ancient Indian computational thinking and modern CS are mind-blowing. We must preserve this heritage!", timestamp: "9:45 AM", isOwn: false, reactions: [{ emoji: "🙏", count: 5, reacted: false }, { emoji: "💡", count: 3, reacted: true }] },
    { id: "5", senderId: "u4", content: "Exactly! This is why IKS is so critical for Bharat's renaissance. Every developer should study this. 🇮🇳", timestamp: "9:52 AM", isOwn: false },
  ],
  "c1-research": [
    { id: "1", senderId: "u1", content: "Just posted: Pingala's Chandaḥśāstra and its connection to binary sequences — a precursor to modern computer science!", timestamp: "9:28 AM", isOwn: true },
    { id: "2", senderId: "u4", content: "Brilliant find Arjun! The Mātrāmeru (what we now call Fibonacci sequence) was described centuries before Fibonacci.", timestamp: "9:35 AM", isOwn: false, reactions: [{ emoji: "🙏", count: 7, reacted: true }] },
  ],
  "c1-events": [
    { id: "1", senderId: "u4", content: "📅 Upcoming: Vedic Mathematics Workshop — Saturday, April 15th, 10 AM at IITD. Register via link in #resources.", timestamp: "Yesterday", isOwn: false },
    { id: "2", senderId: "u2", content: "Also hosting a webinar on Ayurveda & IKS integration next Thursday. DM me for details!", timestamp: "Yesterday", isOwn: false },
    { id: "3", senderId: "u1", content: "Both are on my calendar! Will record for those who can't attend live 🙏", timestamp: "Today, 8:00 AM", isOwn: true },
  ],
  "c1-resources": [
    { id: "1", senderId: "u4", content: "Book recommendation: \"The Crest of the Peacock\" by George Gheverghese Joseph — non-Eurocentric history of mathematics.", timestamp: "Monday", isOwn: false },
    { id: "2", senderId: "u1", content: "Adding to the list: Bibhutibhushan Datta's 'History of Hindu Mathematics'. Available as PDF!", timestamp: "Monday", isOwn: true },
  ],
  "c3-general": [
    { id: "1", senderId: "u1", content: "Just pushed the decentralized identity module v0.3! Would love reviews from the community. PR link in #collaboration.", timestamp: "10:00 AM", isOwn: true },
    { id: "2", senderId: "u3", content: "Amazing work Arjun! The privacy-by-design approach is very thoughtful. Reviewing now. 🙏", timestamp: "10:15 AM", isOwn: false, reactions: [{ emoji: "🙏", count: 3, reacted: false }] },
    { id: "3", senderId: "u5", content: "Are we using IPFS for content storage? Would align perfectly with our data sovereignty principles.", timestamp: "10:25 AM", isOwn: false },
    { id: "4", senderId: "u1", content: "Yes! Planning IPFS + Arweave for permanent, immutable storage. Once created, preserved forever — very Dharmic! 🙏", timestamp: "10:32 AM", isOwn: true, reactions: [{ emoji: "💡", count: 4, reacted: true }, { emoji: "🔥", count: 2, reacted: false }] },
  ],
  "c3-collab": [
    { id: "1", senderId: "u1", content: "PR #47 for the decentralized identity module is ready for review! Looking for 2 reviewers.", timestamp: "Today", isOwn: true },
  ],
  "c3-tech": [
    { id: "1", senderId: "u5", content: "Question: should we use React Native or Flutter for the mobile app? Need community input.", timestamp: "Yesterday", isOwn: false },
    { id: "2", senderId: "u1", content: "React Native gets my vote — we can share components with the web app and the talent pool in India is larger.", timestamp: "Yesterday", isOwn: true },
  ],
  "c3-opensource": [
    { id: "1", senderId: "u5", content: "Dharmic Network core just hit 500 GitHub stars! 🙏 Incredible to see the community rally behind open-source with Indian values.", timestamp: "Yesterday", isOwn: false },
    { id: "2", senderId: "u1", content: "The Vasudhaiva Kutumbakam principle is the perfect foundation for open-source — knowledge belongs to all.", timestamp: "Yesterday", isOwn: true },
    { id: "3", senderId: "u3", content: "Would love to contribute to the Dharmic identity module. Where do I start with the codebase?", timestamp: "Yesterday", isOwn: false },
  ],
  "c2-general": [
    { id: "1", senderId: "u2", content: "Sharing my latest research: Triphala's efficacy for gut microbiome health. Published in Journal of Ayurveda Research! 🌿", timestamp: "8:45 AM", isOwn: false },
    { id: "2", senderId: "u4", content: "Incredible findings Dr. Priya! The intersection of Ayurveda and modern gut science is the future of healthcare.", timestamp: "9:00 AM", isOwn: false, reactions: [{ emoji: "🌿", count: 8, reacted: true }] },
    { id: "3", senderId: "u1", content: "Could this be integrated with Prakruti profiling in the app? Personalized Ayurveda recommendations!", timestamp: "9:10 AM", isOwn: true },
    { id: "4", senderId: "u2", content: "That's exactly what I'm working on, Arjun! Vata-Pitta-Kapha mapping to gut flora patterns is very promising. 🙏", timestamp: "9:18 AM", isOwn: false, reactions: [{ emoji: "💡", count: 5, reacted: true }, { emoji: "🙏", count: 3, reacted: false }] },
  ],
  "c2-consult": [
    { id: "1", senderId: "u2", content: "Case Study: 45-year-old Pitta-dominant patient with chronic inflammatory condition. Protocol: Virechana karma followed by Shatavari + Guduchi...", timestamp: "Yesterday", isOwn: false },
  ],
  "c2-herbs": [
    { id: "1", senderId: "u2", content: "New paper: Ashwagandha's adaptogenic properties and cortisol regulation — peer reviewed. Sharing PDF to those interested.", timestamp: "Monday", isOwn: false },
  ],
  "c2-events": [
    { id: "1", senderId: "u2", content: "🌿 Monthly Ayurveda practitioner meetup — April 20th, 6 PM IST. Virtual and in-person (Kerala). All are welcome!", timestamp: "Yesterday", isOwn: false },
  ],
  "c9-general": [
    { id: "1", senderId: "u3", content: "Exciting news! Two social entrepreneurs from our community just secured seed funding. Big day for the Dharmic ecosystem! 🚀", timestamp: "11:00 AM", isOwn: false, reactions: [{ emoji: "🎉", count: 12, reacted: true }] },
    { id: "2", senderId: "u5", content: "Would love to hear their stories. Could we organize a community AMA?", timestamp: "11:15 AM", isOwn: false },
    { id: "3", senderId: "u1", content: "Great idea! I'll help coordinate if needed. 🙏", timestamp: "11:20 AM", isOwn: true },
  ],
  "c9-ideas": [
    { id: "1", senderId: "u5", content: "Idea: An AI-powered Dharmic career counselor that maps your Svadharma to modern career paths. Thoughts?", timestamp: "Yesterday", isOwn: false },
    { id: "2", senderId: "u3", content: "Love it! The Gita's concept of Svadharma applied to modern careers. Could integrate with Prakruti profiles too.", timestamp: "Yesterday", isOwn: false },
    { id: "3", senderId: "u1", content: "Brilliant! Would also need a Karmic alignment score — matching values, not just skills.", timestamp: "Yesterday", isOwn: true, reactions: [{ emoji: "🔥", count: 6, reacted: false }] },
  ],
  "c9-funding": [
    { id: "1", senderId: "u3", content: "Dharmic Investors Fund is now accepting applications for seed-stage Dharmic startups. DM me for details.", timestamp: "Monday", isOwn: false },
  ],
  "c9-events": [
    { id: "1", senderId: "u5", content: "Demo Day coming up! Social Entrepreneurs pitch to Dharmic investors — April 25th. Sign up in the community portal.", timestamp: "Yesterday", isOwn: false },
  ],
};
