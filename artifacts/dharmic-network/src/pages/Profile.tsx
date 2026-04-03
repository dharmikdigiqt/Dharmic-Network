import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Group,
  Progress,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
  ThemeIcon,
  ActionIcon,
} from '@mantine/core';
import {
  IconStar,
  IconMapPin,
  IconCalendar,
  IconEdit,
  IconShare,
  IconUsers,
  IconBookmark,
  IconFileText,
  IconTrendingUp,
  IconCheck,
} from '@tabler/icons-react';
import { CURRENT_USER } from '../constants/users';
import { POSTS } from '../constants/posts';
import { PostCard } from '../components/PostCard';
import { toast } from 'sonner';

const PRAKRUTI_COLORS: Record<string, string> = {
  Vata: '#9c27b0',
  Pitta: '#ff5722',
  Kapha: '#4caf50',
  'Vata-Pitta': 'linear-gradient(135deg, #9c27b0, #ff5722)',
  'Pitta-Kapha': 'linear-gradient(135deg, #ff5722, #4caf50)',
  'Vata-Kapha': 'linear-gradient(135deg, #9c27b0, #4caf50)',
};

export function Profile() {
  const [activeTab, setActiveTab] = useState<string | null>('posts');
  const userPosts = POSTS.filter(p => p.authorId === 'u1');

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      {/* Cover */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Box
          style={{
            height: 200,
            borderRadius: '20px 20px 0 0',
            background: 'linear-gradient(135deg, #1f8ba5 0%, #0e7891 40%, #005970 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* SVG decoration */}
          <svg style={{ position: 'absolute', right: 40, top: 20, opacity: 0.1 }} viewBox="-50 -50 100 100" width="160" height="160">
            {[38, 28, 19].map((r, ri) =>
              Array.from({ length: [20, 14, 10][ri] }).map((_, i) => {
                const a = (i / [20, 14, 10][ri]) * 2 * Math.PI;
                return <circle key={`${ri}-${i}`} cx={r * Math.cos(a)} cy={r * Math.sin(a)} r={[3.5, 2.5, 2][ri]} fill="white" />;
              })
            )}
            <polygon points="0,-16 14,8 -14,8" fill="white" opacity={0.6} />
          </svg>
        </Box>
      </motion.div>

      <Card radius="0 0 20px 20px" style={{ border: '1px solid #e8ecf0', borderTop: 'none' }}>
        {/* Avatar section */}
        <Group justify="space-between" align="flex-end" style={{ marginTop: -50, marginBottom: 16 }}>
          <Avatar
            src={CURRENT_USER.avatar}
            size={100}
            radius="xl"
            style={{ border: '4px solid white', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
          <Group gap="sm">
            <Button
              variant="outline"
              size="sm"
              radius="md"
              leftSection={<IconShare size={14} />}
              onClick={() => toast.success('Profile link copied!')}
            >
              Share
            </Button>
            <Button
              size="sm"
              radius="md"
              leftSection={<IconEdit size={14} />}
              color="teal"
              onClick={() => toast.info('Profile editing coming soon!')}
            >
              Edit Profile
            </Button>
          </Group>
        </Group>

        {/* User info */}
        <Stack gap="xs">
          <Group gap="sm">
            <Text size="xl" fw={800} style={{ color: '#1a202c' }}>{CURRENT_USER.name}</Text>
            {CURRENT_USER.isVerified && (
              <ThemeIcon size={22} radius="xl" color="teal">
                <IconCheck size={12} />
              </ThemeIcon>
            )}
          </Group>
          <Text c="dimmed" size="sm">@{CURRENT_USER.username}</Text>

          <Text size="sm" style={{ color: '#4a5568', lineHeight: 1.6, maxWidth: 600 }}>
            {CURRENT_USER.bio}
          </Text>

          <Group gap="lg" mt={4}>
            <Group gap={6}>
              <IconMapPin size={14} color="#718096" />
              <Text size="sm" c="dimmed">{CURRENT_USER.location}</Text>
            </Group>
            <Group gap={6}>
              <IconCalendar size={14} color="#718096" />
              <Text size="sm" c="dimmed">Joined {new Date(CURRENT_USER.joinedDate).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</Text>
            </Group>
          </Group>

          {/* Roles */}
          <Group gap={6} mt={4}>
            {CURRENT_USER.role.map(role => (
              <Badge key={role} size="sm" color="teal" variant="light">{role}</Badge>
            ))}
          </Group>
        </Stack>

        <Divider my="md" />

        {/* Stats */}
        <SimpleGrid cols={4} mb="md">
          {[
            { label: 'Posts', value: userPosts.length, icon: IconFileText },
            { label: 'Followers', value: CURRENT_USER.followers, icon: IconUsers },
            { label: 'Following', value: CURRENT_USER.following, icon: IconTrendingUp },
            { label: 'Karma Score', value: `✦ ${CURRENT_USER.karmaScore}`, icon: IconStar },
          ].map((stat) => (
            <Box key={stat.label} style={{ textAlign: 'center' }}>
              <Text size="xl" fw={800} style={{ color: '#1a202c' }}>{stat.value}</Text>
              <Text size="xs" c="dimmed">{stat.label}</Text>
            </Box>
          ))}
        </SimpleGrid>

        {/* Prakruti & Skills */}
        <SimpleGrid cols={2} mb="md">
          <Box p="md" style={{ backgroundColor: '#f8f9fc', borderRadius: 12 }}>
            <Text size="xs" fw={700} c="dimmed" mb="xs" style={{ textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Prakruti Profile
            </Text>
            <Badge
              size="lg"
              variant="gradient"
              gradient={{ from: '#9c27b0', to: '#ff5722' }}
            >
              {CURRENT_USER.prakruti}
            </Badge>
            <Text size="xs" c="dimmed" mt="xs">Your Ayurvedic constitution type</Text>
          </Box>
          <Box p="md" style={{ backgroundColor: '#f8f9fc', borderRadius: 12 }}>
            <Text size="xs" fw={700} c="dimmed" mb="xs" style={{ textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Skills
            </Text>
            <Group gap={6}>
              {CURRENT_USER.skills.map(skill => (
                <Badge key={skill} size="sm" color="blue" variant="light">{skill}</Badge>
              ))}
            </Group>
          </Box>
        </SimpleGrid>

        {/* Karma Progress */}
        <Box p="md" mb="md" style={{ backgroundColor: '#fffaf0', borderRadius: 12, border: '1px solid #ffd09b' }}>
          <Group justify="space-between" mb="xs">
            <Text size="sm" fw={700} c="orange">Karma Score</Text>
            <Text size="sm" fw={700} c="orange">{CURRENT_USER.karmaScore} / 1000</Text>
          </Group>
          <Progress
            value={(CURRENT_USER.karmaScore / 1000) * 100}
            color="orange"
            size="md"
            radius="xl"
          />
          <Text size="xs" c="dimmed" mt={6}>
            {1000 - CURRENT_USER.karmaScore} more karma to unlock Community Creation
          </Text>
        </Box>
      </Card>

      {/* Tabs */}
      <Box mt="md">
        <Tabs value={activeTab} onChange={setActiveTab} radius="md">
          <Tabs.List>
            <Tabs.Tab value="posts" leftSection={<IconFileText size={14} />}>Posts ({userPosts.length})</Tabs.Tab>
            <Tabs.Tab value="saved" leftSection={<IconBookmark size={14} />}>Gyan Library</Tabs.Tab>
          </Tabs.List>
        </Tabs>

        <Box mt="md">
          {activeTab === 'posts' && (
            <Stack gap={0}>
              {userPosts.length > 0 ? (
                userPosts.map((post, i) => <PostCard key={post.id} post={post} index={i} />)
              ) : (
                <Card radius="lg" p="xl" style={{ textAlign: 'center', border: '1px solid #e8ecf0' }}>
                  <Text c="dimmed">No posts yet. Share your first thought with the community!</Text>
                </Card>
              )}
            </Stack>
          )}
          {activeTab === 'saved' && (
            <Card radius="lg" p="xl" style={{ textAlign: 'center', border: '1px solid #e8ecf0' }}>
              <IconBookmark size={32} color="#d1d5db" />
              <Text c="dimmed" mt="sm">Your Gyan Library is where saved posts appear.</Text>
            </Card>
          )}
        </Box>
      </Box>
    </div>
  );
}
