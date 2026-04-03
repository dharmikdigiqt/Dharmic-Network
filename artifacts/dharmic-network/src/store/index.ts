import { create } from 'zustand';
import { Post } from '../constants/posts';
import { Community } from '../constants/communities';
import { User } from '../constants/users';

interface AppState {
  bookmarkedPosts: string[];
  joinedCommunities: string[];
  followedUsers: string[];
  activeTab: string;
  sidebarOpen: boolean;
  notificationsCount: number;

  toggleBookmark: (postId: string) => void;
  toggleCommunity: (communityId: string) => void;
  toggleFollow: (userId: string) => void;
  setActiveTab: (tab: string) => void;
  setSidebarOpen: (open: boolean) => void;
  markNotificationsRead: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  bookmarkedPosts: ['p2', 'p5'],
  joinedCommunities: ['c1', 'c2', 'c3', 'c9'],
  followedUsers: ['u2', 'u4'],
  activeTab: 'feed',
  sidebarOpen: true,
  notificationsCount: 3,

  toggleBookmark: (postId) =>
    set((state) => ({
      bookmarkedPosts: state.bookmarkedPosts.includes(postId)
        ? state.bookmarkedPosts.filter((id) => id !== postId)
        : [...state.bookmarkedPosts, postId],
    })),

  toggleCommunity: (communityId) =>
    set((state) => ({
      joinedCommunities: state.joinedCommunities.includes(communityId)
        ? state.joinedCommunities.filter((id) => id !== communityId)
        : [...state.joinedCommunities, communityId],
    })),

  toggleFollow: (userId) =>
    set((state) => ({
      followedUsers: state.followedUsers.includes(userId)
        ? state.followedUsers.filter((id) => id !== userId)
        : [...state.followedUsers, userId],
    })),

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  markNotificationsRead: () => set({ notificationsCount: 0 }),
}));
