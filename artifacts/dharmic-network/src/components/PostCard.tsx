import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Avatar,
  Badge,
  Card,
  Group,
  Text,
  ActionIcon,
  Box,
  Stack,
  Image,
} from '@mantine/core';
import {
  IconBookmark,
  IconBookmarkFilled,
  IconMessageCircle,
  IconShare,
  IconVolume,
  IconStar,
  IconFlame,
  IconSunHigh,
} from '@tabler/icons-react';
import { Post } from '../constants/posts';
import { useAppStore } from '../store';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  post: Post;
  index?: number;
}

const typeColors: Record<string, string> = {
  text: '#2d91ab',
  audio: '#9c27b0',
  image: '#ff5722',
  video: '#f44336',
  product: '#ff8f0e',
};

const typeLabels: Record<string, string> = {
  text: 'Article',
  audio: 'Audio',
  image: 'Image',
  video: 'Video',
  product: 'Product',
};

export function PostCard({ post, index = 0 }: PostCardProps) {
  const { bookmarkedPosts, toggleBookmark } = useAppStore();
  const isBookmarked = bookmarkedPosts.includes(post.id);
  const [reactions, setReactions] = useState(post.reactions);
  const [userReaction, setUserReaction] = useState<string | null>(null);

  const handleReaction = (type: 'truth' | 'insight' | 'dharmic') => {
    if (userReaction === type) {
      setReactions(prev => ({ ...prev, [type]: prev[type] - 1 }));
      setUserReaction(null);
    } else {
      if (userReaction) {
        setReactions(prev => ({ ...prev, [userReaction as keyof typeof prev]: prev[userReaction as keyof typeof prev] - 1 }));
      }
      setReactions(prev => ({ ...prev, [type]: prev[type] + 1 }));
      setUserReaction(type);
      toast.success(`Marked as ${type === 'truth' ? 'Truth' : type === 'insight' ? 'Insight' : 'Dharmic Value'}`, {
        duration: 1500,
      });
    }
  };

  const handleBookmark = () => {
    toggleBookmark(post.id);
    toast.success(isBookmarked ? 'Removed from Gyan Library' : 'Saved to Gyan Library', {
      duration: 2000,
    });
  };

  const timeAgo = formatDistanceToNow(new Date(post.timestamp), { addSuffix: true });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.3 }}
      whileHover={{ y: -2 }}
    >
      <Card
        radius="lg"
        shadow="sm"
        style={{
          border: '1px solid #e8ecf0',
          backgroundColor: 'white',
          overflow: 'hidden',
        }}
        mb="md"
      >
        {/* Pinned indicator */}
        {post.isPinned && (
          <Box
            style={{
              backgroundColor: '#fff4e6',
              borderBottom: '1px solid #ffd09b',
              padding: '6px 16px',
              margin: '-16px -16px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <IconStar size={14} color="#ff8f0e" fill="#ff8f0e" />
            <Text size="xs" c="orange" fw={600}>Featured Post</Text>
          </Box>
        )}

        {/* Author */}
        <Group justify="space-between" mb="sm">
          <Group gap="sm">
            <Avatar src={post.authorAvatar} size={42} radius="xl" />
            <Box>
              <Group gap={6}>
                <Text size="sm" fw={700} style={{ color: '#1a202c' }}>{post.authorName}</Text>
                <Badge size="xs" color="orange" variant="light" style={{ fontSize: 10 }}>
                  ✦ {post.authorKarma}
                </Badge>
              </Group>
              <Group gap={6}>
                <Text size="xs" c="dimmed">@{post.authorUsername}</Text>
                <Text size="xs" c="dimmed">·</Text>
                <Text size="xs" c="dimmed">{timeAgo}</Text>
                {post.community && (
                  <>
                    <Text size="xs" c="dimmed">·</Text>
                    <Text size="xs" style={{ color: '#2d91ab' }}>in {post.community}</Text>
                  </>
                )}
              </Group>
            </Box>
          </Group>
          <Badge
            size="sm"
            variant="light"
            style={{ backgroundColor: `${typeColors[post.type]}15`, color: typeColors[post.type] }}
          >
            {post.type === 'audio' && <IconVolume size={10} style={{ marginRight: 4 }} />}
            {typeLabels[post.type]}
          </Badge>
        </Group>

        {/* Content */}
        {post.title && (
          <Text fw={700} size="md" mb={6} style={{ color: '#1a202c', lineHeight: 1.4 }}>
            {post.title}
          </Text>
        )}
        <Text size="sm" c="dimmed" mb="md" lineClamp={3} style={{ lineHeight: 1.6 }}>
          {post.content}
        </Text>

        {/* Image */}
        {post.imageUrl && (
          <Box mb="md" style={{ borderRadius: 10, overflow: 'hidden' }}>
            <Image
              src={post.imageUrl}
              alt={post.title}
              height={240}
              style={{ objectFit: 'cover' }}
            />
          </Box>
        )}

        {/* Audio player */}
        {post.type === 'audio' && (
          <Box
            mb="md"
            p="md"
            style={{
              backgroundColor: '#f8f9fc',
              borderRadius: 10,
              border: '1px solid #e8ecf0',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <ActionIcon size="xl" radius="xl" style={{ background: 'linear-gradient(135deg, #9c27b0, #673ab7)', color: 'white' }}>
              <IconVolume size={18} />
            </ActionIcon>
            <Box style={{ flex: 1 }}>
              <div style={{
                height: 4,
                backgroundColor: '#e8ecf0',
                borderRadius: 2,
                overflow: 'hidden',
              }}>
                <motion.div
                  style={{
                    height: '100%',
                    width: '35%',
                    background: 'linear-gradient(90deg, #9c27b0, #673ab7)',
                    borderRadius: 2,
                  }}
                />
              </div>
              <Text size="xs" c="dimmed" mt={4}>45:00 min</Text>
            </Box>
          </Box>
        )}

        {/* Tags */}
        {post.tags.length > 0 && (
          <Group gap={6} mb="md">
            {post.tags.map((tag) => (
              <Badge key={tag} size="sm" variant="outline" color="gray" style={{ fontSize: 11 }}>
                #{tag}
              </Badge>
            ))}
          </Group>
        )}

        {/* Actions */}
        <Group justify="space-between" pt="sm" style={{ borderTop: '1px solid #f0f2f5' }}>
          <Group gap={4}>
            {/* Reactions */}
            <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
              <UnstyledActionButton
                title="Truth"
                active={userReaction === 'truth'}
                activeColor="#ff8f0e"
                onClick={() => handleReaction('truth')}
              >
                <IconSunHigh size={16} />
                <span style={{ fontSize: 12, fontWeight: 600 }}>{reactions.truth}</span>
              </UnstyledActionButton>
            </motion.div>

            <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
              <UnstyledActionButton
                title="Insight"
                active={userReaction === 'insight'}
                activeColor="#2d91ab"
                onClick={() => handleReaction('insight')}
              >
                <IconFlame size={16} />
                <span style={{ fontSize: 12, fontWeight: 600 }}>{reactions.insight}</span>
              </UnstyledActionButton>
            </motion.div>

            <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
              <UnstyledActionButton
                title="Dharmic Value"
                active={userReaction === 'dharmic'}
                activeColor="#4caf50"
                onClick={() => handleReaction('dharmic')}
              >
                <IconStar size={16} />
                <span style={{ fontSize: 12, fontWeight: 600 }}>{reactions.dharmic}</span>
              </UnstyledActionButton>
            </motion.div>
          </Group>

          <Group gap={4}>
            <button
              title="Comments"
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#718096', padding: '6px 8px', borderRadius: 8,
              }}
            >
              <IconMessageCircle size={16} />
              <span style={{ fontSize: 12 }}>{post.comments}</span>
            </button>

            <button
              title="Share"
              onClick={() => toast.success('Link copied to clipboard!')}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#718096', padding: '6px 8px', borderRadius: 8,
              }}
            >
              <IconShare size={16} />
              <span style={{ fontSize: 12 }}>{post.shares}</span>
            </button>

            <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
              <button
                title={isBookmarked ? 'Remove from Library' : 'Save to Gyan Library'}
                onClick={handleBookmark}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: isBookmarked ? '#ff8f0e' : '#718096',
                  padding: '6px 8px', borderRadius: 8,
                }}
              >
                {isBookmarked ? <IconBookmarkFilled size={16} /> : <IconBookmark size={16} />}
                <span style={{ fontSize: 12 }}>{post.bookmarks + (isBookmarked ? 1 : 0)}</span>
              </button>
            </motion.div>
          </Group>
        </Group>
      </Card>
    </motion.div>
  );
}

function UnstyledActionButton({
  children,
  active,
  activeColor,
  onClick,
  title,
}: {
  children: React.ReactNode;
  active: boolean;
  activeColor: string;
  onClick: () => void;
  title?: string;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        display: 'flex', alignItems: 'center', gap: 6,
        background: active ? `${activeColor}15` : 'none',
        border: 'none', cursor: 'pointer',
        color: active ? activeColor : '#718096',
        padding: '6px 10px', borderRadius: 8,
        transition: 'all 0.15s ease',
      }}
    >
      {children}
    </button>
  );
}
