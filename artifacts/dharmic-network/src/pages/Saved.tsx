import { motion } from 'framer-motion';
import { Box, Group, Stack, Text, ThemeIcon } from '@mantine/core';
import { IconBookmark } from '@tabler/icons-react';
import { POSTS } from '../constants/posts';
import { PostCard } from '../components/PostCard';
import { useAppStore } from '../store';

export function Saved() {
  const { bookmarkedPosts } = useAppStore();
  const savedPosts = POSTS.filter(p => bookmarkedPosts.includes(p.id));

  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      <Stack gap="xl">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <Group gap={8} mb={4}>
            <ThemeIcon size={32} radius="xl" color="orange">
              <IconBookmark size={16} />
            </ThemeIcon>
            <Box>
              <Text size="xl" fw={800} style={{ color: '#1a202c' }}>Gyan Library</Text>
              <Text c="dimmed" size="sm">Your saved posts and bookmarked content</Text>
            </Box>
          </Group>
        </motion.div>

        {savedPosts.length > 0 ? (
          <Stack gap={0}>
            {savedPosts.map((post, i) => <PostCard key={post.id} post={post} index={i} />)}
          </Stack>
        ) : (
          <Box py="xl" style={{ textAlign: 'center' }}>
            <ThemeIcon size={60} radius="xl" color="gray" variant="light" style={{ margin: '0 auto 16px' }}>
              <IconBookmark size={30} />
            </ThemeIcon>
            <Text fw={600} size="lg" c="dimmed">Your Gyan Library is empty</Text>
            <Text c="dimmed" size="sm" mt={4}>Bookmark posts to save them here for later reading</Text>
          </Box>
        )}
      </Stack>
    </div>
  );
}
