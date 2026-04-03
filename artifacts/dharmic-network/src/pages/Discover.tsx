import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Group,
  Input,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
  ThemeIcon,
  Divider,
} from '@mantine/core';
import {
  IconSearch,
  IconCompass,
  IconUsers,
  IconTrendingUp,
  IconStar,
  IconCheck,
  IconFlame,
} from '@tabler/icons-react';
import { USERS, CURRENT_USER } from '../constants/users';
import { COMMUNITIES } from '../constants/communities';
import { POSTS } from '../constants/posts';
import { PostCard } from '../components/PostCard';
import { useAppStore } from '../store';
import { toast } from 'sonner';

export function Discover() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<string | null>('people');
  const { followedUsers, toggleFollow, joinedCommunities, toggleCommunity } = useAppStore();

  const filteredUsers = USERS.filter(u =>
    u.id !== 'u1' &&
    (u.name.toLowerCase().includes(search.toLowerCase()) ||
     u.username.toLowerCase().includes(search.toLowerCase()) ||
     u.bio.toLowerCase().includes(search.toLowerCase()) ||
     u.role.some(r => r.toLowerCase().includes(search.toLowerCase())))
  );

  const filteredCommunities = COMMUNITIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  );

  const trendingPosts = [...POSTS].sort((a, b) =>
    (b.reactions.truth + b.reactions.insight + b.reactions.dharmic) -
    (a.reactions.truth + a.reactions.insight + a.reactions.dharmic)
  ).slice(0, 4);

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <Stack gap="xl">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <Group gap={8} mb={4}>
            <ThemeIcon size={32} radius="xl" color="grape">
              <IconCompass size={16} />
            </ThemeIcon>
            <Text size="xl" fw={800} style={{ color: '#1a202c' }}>Discover</Text>
          </Group>
          <Text c="dimmed" size="sm">Find people, communities, and content aligned with your Dharmic journey</Text>
        </motion.div>

        <Input
          placeholder="Search people, communities, ideas..."
          leftSection={<IconSearch size={16} />}
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          size="md"
          radius="xl"
        />

        <Tabs value={activeTab} onChange={setActiveTab} radius="md">
          <Tabs.List>
            <Tabs.Tab value="people" leftSection={<IconUsers size={14} />}>People</Tabs.Tab>
            <Tabs.Tab value="communities" leftSection={<IconUsers size={14} />}>Communities</Tabs.Tab>
            <Tabs.Tab value="trending" leftSection={<IconFlame size={14} />}>Trending</Tabs.Tab>
          </Tabs.List>
        </Tabs>

        {activeTab === 'people' && (
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
            {filteredUsers.map((user, index) => {
              const isFollowing = followedUsers.includes(user.id);
              return (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.06 }}
                  whileHover={{ y: -3 }}
                >
                  <Card radius="xl" style={{ border: '1px solid #e8ecf0', height: '100%' }}>
                    <Stack gap="md">
                      <Group gap="sm">
                        <Avatar src={user.avatar} size={56} radius="xl" />
                        <Box style={{ flex: 1 }}>
                          <Group gap={6}>
                            <Text fw={700} style={{ color: '#1a202c' }}>{user.name}</Text>
                            {user.isVerified && (
                              <ThemeIcon size={18} radius="xl" color="teal">
                                <IconCheck size={10} />
                              </ThemeIcon>
                            )}
                          </Group>
                          <Text size="xs" c="dimmed">@{user.username}</Text>
                        </Box>
                      </Group>

                      <Text size="sm" c="dimmed" lineClamp={2} style={{ lineHeight: 1.5 }}>
                        {user.bio}
                      </Text>

                      <Group gap={6}>
                        {user.role.map(r => (
                          <Badge key={r} size="sm" color="teal" variant="light">{r}</Badge>
                        ))}
                        <Badge size="sm" color="grape" variant="light">{user.prakruti}</Badge>
                      </Group>

                      <Group justify="space-between">
                        <Group gap={4}>
                          <IconStar size={12} color="#ff8f0e" fill="#ff8f0e" />
                          <Text size="xs" fw={600} c="orange">{user.karmaScore}</Text>
                          <Text size="xs" c="dimmed">· {user.followers} followers</Text>
                        </Group>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            size="xs"
                            variant={isFollowing ? 'outline' : 'filled'}
                            color="teal"
                            radius="md"
                            onClick={() => {
                              toggleFollow(user.id);
                              toast.success(isFollowing ? `Unfollowed ${user.name}` : `Now following ${user.name}! 🙏`);
                            }}
                          >
                            {isFollowing ? 'Following' : 'Follow'}
                          </Button>
                        </motion.div>
                      </Group>
                    </Stack>
                  </Card>
                </motion.div>
              );
            })}
          </SimpleGrid>
        )}

        {activeTab === 'communities' && (
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
            {filteredCommunities.map((community, index) => {
              const isJoined = joinedCommunities.includes(community.id);
              return (
                <motion.div
                  key={community.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.06 }}
                  whileHover={{ y: -3 }}
                >
                  <Card radius="xl" style={{ border: `1px solid ${isJoined ? community.color + '40' : '#e8ecf0'}`, height: '100%' }}>
                    <Group gap="sm" mb="sm">
                      <div style={{
                        width: 44, height: 44, borderRadius: 12,
                        backgroundColor: `${community.color}20`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 22,
                      }}>
                        {community.icon}
                      </div>
                      <Box style={{ flex: 1 }}>
                        <Text fw={700} style={{ color: '#1a202c' }}>{community.name}</Text>
                        <Badge size="xs" variant="light" style={{ color: community.color }}>{community.category}</Badge>
                      </Box>
                    </Group>
                    <Text size="sm" c="dimmed" lineClamp={2} mb="md">{community.description}</Text>
                    <Group justify="space-between">
                      <Text size="xs" c="dimmed">{community.members.toLocaleString()} members</Text>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          size="xs"
                          variant={isJoined ? 'outline' : 'filled'}
                          radius="md"
                          style={isJoined ? { borderColor: community.color + '60', color: community.color } : {
                            background: `linear-gradient(135deg, ${community.color}, ${community.color}cc)`,
                          }}
                          onClick={() => {
                            toggleCommunity(community.id);
                            toast.success(isJoined ? `Left ${community.name}` : `Joined ${community.name}! 🙏`);
                          }}
                        >
                          {isJoined ? 'Joined' : 'Join'}
                        </Button>
                      </motion.div>
                    </Group>
                  </Card>
                </motion.div>
              );
            })}
          </SimpleGrid>
        )}

        {activeTab === 'trending' && (
          <Stack gap={0}>
            {trendingPosts.map((post, i) => <PostCard key={post.id} post={post} index={i} />)}
          </Stack>
        )}
      </Stack>
    </div>
  );
}
