import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Card,
  Group,
  Stack,
  Text,
  Button,
  Tabs,
  Divider,
  Paper,
  ThemeIcon,
  SimpleGrid,
  Badge,
} from '@mantine/core';
import {
  IconSparkles,
  IconTrendingUp,
  IconUsers,
  IconMessageCircle,
  IconFlame,
  IconChevronRight,
  IconStar,
  IconBookmark,
  IconBell,
  IconBellFilled,
  IconLeaf,
  IconAtom,
  IconBulb,
  IconCompass,
  IconAward,
} from '@tabler/icons-react';
import { Link } from 'wouter';
import { POSTS, COMMUNITIES_POSTS, TRENDING_POSTS } from '../constants/posts';
import { COMMUNITIES } from '../constants/communities';
import { CURRENT_USER, USERS } from '../constants/users';
import { DAILY_INSIGHTS, NOTIFICATIONS, ACTIVITY_STATS } from '../constants/dashboard';
import { PostCard } from '../components/PostCard';
import { DharmicAvatar } from '../components/DharmicAvatar';
import { useAppStore } from '../store';
import { toast } from 'sonner';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export function Dashboard() {
  const { joinedCommunities, notificationsCount, markNotificationsRead, followedUsers, toggleFollow } = useAppStore();
  const [activeTab, setActiveTab] = useState<string | null>('for-you');

  const insight = DAILY_INSIGHTS[0];
  const myCommunities = COMMUNITIES.filter(c => joinedCommunities.includes(c.id));
  const suggestedUsers = USERS.filter(u => u.id !== 'u1').slice(0, 3);

  const communitiesPosts = joinedCommunities.length > 0
    ? [...POSTS, ...COMMUNITIES_POSTS].filter(p => joinedCommunities.includes(p.communityId || ''))
    : COMMUNITIES_POSTS;

  const trendingPosts = TRENDING_POSTS;
  const forYouPosts = POSTS;

  const activePosts =
    activeTab === 'communities' ? communitiesPosts :
    activeTab === 'trending'   ? trendingPosts :
    forYouPosts;

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, alignItems: 'start' }}>

        {/* Main feed */}
        <Stack gap="md">
          {/* Welcome banner */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <Paper
              p="xl"
              radius="xl"
              style={{
                background: 'linear-gradient(135deg, #1f8ba5 0%, #0e7891 40%, #005970 100%)',
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ position: 'absolute', top: -30, right: -30, width: 200, height: 200, opacity: 0.08 }}>
                <svg viewBox="-50 -50 100 100" width="200" height="200">
                  {[38, 28, 19].map((r, ri) =>
                    Array.from({ length: [20, 14, 10][ri] }).map((_, i) => {
                      const a = (i / [20, 14, 10][ri]) * 2 * Math.PI;
                      return <circle key={`${ri}-${i}`} cx={r * Math.cos(a)} cy={r * Math.sin(a)} r={[3.5, 2.5, 2][ri]} fill="white" />;
                    })
                  )}
                  <polygon points="0,-16 14,8 -14,8" fill="white" opacity={0.6} />
                </svg>
              </div>

              <Group justify="space-between" align="flex-start">
                <Box>
                  <Text size="xs" style={{ opacity: 0.75, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Namaste</Text>
                  <Text size="xl" fw={700} mt={2}>Welcome, {CURRENT_USER.name.split(' ')[0]} 🙏</Text>
                  <Text size="sm" mt={6} style={{ opacity: 0.85, maxWidth: 400, lineHeight: 1.5 }}>
                    You have {notificationsCount} new notifications and {myCommunities.length} active communities.
                  </Text>
                </Box>
                <Badge size="lg" variant="white" color="dark" style={{ fontWeight: 700 }}>
                  ✦ Karma: {CURRENT_USER.karmaScore}
                </Badge>
              </Group>

              <Group mt="xl" gap="lg">
                {[
                  { label: 'Posts This Week', value: ACTIVITY_STATS.postsThisWeek },
                  { label: 'Reactions',       value: ACTIVITY_STATS.reactionsReceived },
                  { label: 'Comments',        value: ACTIVITY_STATS.commentsReceived },
                  { label: 'Karma Earned',    value: `+${ACTIVITY_STATS.karmaEarned}` },
                ].map(stat => (
                  <Box key={stat.label}>
                    <Text size="xl" fw={800}>{stat.value}</Text>
                    <Text size="xs" style={{ opacity: 0.7 }}>{stat.label}</Text>
                  </Box>
                ))}
              </Group>
            </Paper>
          </motion.div>

          {/* Feed tabs */}
          <Tabs value={activeTab} onChange={setActiveTab} radius="md">
            <Tabs.List>
              <Tabs.Tab value="for-you"     leftSection={<IconSparkles size={14} />}>For You</Tabs.Tab>
              <Tabs.Tab value="communities" leftSection={<IconUsers size={14} />}>My Communities</Tabs.Tab>
              <Tabs.Tab value="trending"    leftSection={<IconFlame size={14} />}>Trending</Tabs.Tab>
            </Tabs.List>
          </Tabs>

          {/* Tab description */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'trending' && (
              <Group gap={8} style={{ padding: '8px 0' }}>
                <ThemeIcon size={22} radius="xl" style={{ background: 'linear-gradient(135deg, #ff5722, #f44336)', color: 'white' }}>
                  <IconFlame size={12} />
                </ThemeIcon>
                <Text size="sm" c="dimmed">Top posts by engagement across Dharmic Network this week</Text>
              </Group>
            )}
            {activeTab === 'communities' && (
              <Group gap={8} style={{ padding: '8px 0' }}>
                <ThemeIcon size={22} radius="xl" style={{ background: 'linear-gradient(135deg, #4caf50, #2e7d32)', color: 'white' }}>
                  <IconUsers size={12} />
                </ThemeIcon>
                <Text size="sm" c="dimmed">Latest posts from your dharmic communities</Text>
              </Group>
            )}
            {activeTab === 'for-you' && (
              <Group gap={8} style={{ padding: '8px 0' }}>
                <ThemeIcon size={22} radius="xl" style={{ background: 'linear-gradient(135deg, #ff8f0e, #e67e00)', color: 'white' }}>
                  <IconSparkles size={12} />
                </ThemeIcon>
                <Text size="sm" c="dimmed">Curated feed based on your interests and connections</Text>
              </Group>
            )}
          </motion.div>

          {/* Posts */}
          <motion.div
            key={activeTab + '-posts'}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Stack gap={0}>
              {activePosts.map((post, index) => (
                <motion.div key={post.id} variants={itemVariants}>
                  <PostCard post={post} index={index} />
                </motion.div>
              ))}
            </Stack>
          </motion.div>
        </Stack>

        {/* Right sidebar */}
        <Stack gap="md" style={{ position: 'sticky', top: 88 }}>
          {/* Daily Insight */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Card radius="lg" style={{ background: 'linear-gradient(135deg, #fff9f0, #fff4e6)', border: '1px solid #ffd09b' }}>
              <Group gap={8} mb="sm">
                <ThemeIcon size={28} radius="xl" style={{ background: 'linear-gradient(135deg, #ff8f0e, #ff961e)', color: 'white' }}>
                  <IconSparkles size={14} />
                </ThemeIcon>
                <Text size="sm" fw={700} c="orange">Daily Dharmic Insight</Text>
              </Group>

              <Text size="sm" fw={600} style={{ fontStyle: 'italic', lineHeight: 1.6, color: '#1a202c' }} mb="xs">
                "{insight.quote}"
              </Text>
              <Text size="xs" c="dimmed" mb="md">— {insight.source}</Text>

              <Divider mb="sm" />

              <Group gap={6} mb={4}>
                <IconLeaf size={12} color="#4caf50" />
                <Text size="xs" fw={600} c="dimmed" style={{ textTransform: 'uppercase', letterSpacing: '0.06em' }}>Prakruti Tip</Text>
              </Group>
              <Text size="xs" style={{ lineHeight: 1.6, color: '#4a5568' }} mb="sm">{insight.prakrutiTip}</Text>

              <Group gap={6} mb={4}>
                <IconAtom size={12} color="#2d91ab" />
                <Text size="xs" fw={600} c="dimmed" style={{ textTransform: 'uppercase', letterSpacing: '0.06em' }}>IKS Fact</Text>
              </Group>
              <Text size="xs" style={{ lineHeight: 1.6, color: '#4a5568' }}>{insight.iksFact}</Text>
            </Card>
          </motion.div>

          {/* Notifications */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <Card radius="lg" style={{ border: '1px solid #e8ecf0' }}>
              <Group justify="space-between" mb="md">
                <Group gap={8}>
                  <ThemeIcon size={28} radius="xl" color="blue">
                    {notificationsCount > 0 ? <IconBellFilled size={14} /> : <IconBell size={14} />}
                  </ThemeIcon>
                  <Text size="sm" fw={700}>Notifications</Text>
                  {notificationsCount > 0 && (
                    <Badge size="sm" color="orange" variant="filled">{notificationsCount}</Badge>
                  )}
                </Group>
                <Link href="/notifications">
                  <Text size="xs" c="blue" style={{ cursor: 'pointer' }}>See all</Text>
                </Link>
              </Group>

              <Stack gap={0}>
                {NOTIFICATIONS.slice(0, 4).map((notif, i) => (
                  <motion.div key={notif.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
                    <Group
                      gap="sm"
                      p="xs"
                      style={{
                        borderRadius: 8,
                        backgroundColor: !notif.isRead ? '#f0f9ff' : 'transparent',
                        cursor: 'pointer',
                      }}
                    >
                      <DharmicAvatar name={notif.userName} size={32} />
                      <Box style={{ flex: 1 }}>
                        <Text size="xs" style={{ lineHeight: 1.4, color: '#1a202c' }}>
                          <strong>{notif.userName}</strong> {notif.message}
                        </Text>
                        <Text size="xs" c="dimmed" mt={2}>
                          {new Date(notif.timestamp).toLocaleDateString()}
                        </Text>
                      </Box>
                      {!notif.isRead && (
                        <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#2d91ab', flexShrink: 0 }} />
                      )}
                    </Group>
                    {i < 3 && <Divider my={4} />}
                  </motion.div>
                ))}
              </Stack>

              {notificationsCount > 0 && (
                <Text
                  size="xs" c="blue"
                  mt="sm"
                  style={{ cursor: 'pointer', textAlign: 'center' }}
                  onClick={() => { markNotificationsRead(); toast.success('All notifications marked as read'); }}
                >
                  Mark all as read
                </Text>
              )}
            </Card>
          </motion.div>

          {/* My Communities */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <Card radius="lg" style={{ border: '1px solid #e8ecf0' }}>
              <Group justify="space-between" mb="md">
                <Group gap={8}>
                  <ThemeIcon size={28} radius="xl" color="teal">
                    <IconCompass size={14} />
                  </ThemeIcon>
                  <Text size="sm" fw={700}>My Communities</Text>
                </Group>
                <Link href="/communities">
                  <Text size="xs" c="blue" style={{ cursor: 'pointer' }}>See all</Text>
                </Link>
              </Group>

              <Stack gap={6}>
                {myCommunities.map(community => (
                  <Group
                    key={community.id}
                    justify="space-between"
                    p="xs"
                    style={{ borderRadius: 8, cursor: 'pointer', transition: 'background 0.15s' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#f5f7fa'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}
                  >
                    <Group gap="sm">
                      <div style={{
                        width: 32, height: 32, borderRadius: 8,
                        backgroundColor: `${community.color}20`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
                      }}>
                        {community.icon}
                      </div>
                      <Box>
                        <Text size="sm" fw={600} style={{ color: '#1a202c' }}>{community.name}</Text>
                        <Text size="xs" c="dimmed">{community.members.toLocaleString()} members</Text>
                      </Box>
                    </Group>
                    <IconChevronRight size={14} color="#a0aec0" />
                  </Group>
                ))}
              </Stack>
            </Card>
          </motion.div>

          {/* Suggested Connections */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            <Card radius="lg" style={{ border: '1px solid #e8ecf0' }}>
              <Group gap={8} mb="md">
                <ThemeIcon size={28} radius="xl" style={{ background: 'linear-gradient(135deg, #ff8f0e, #e67e00)', color: 'white' }}>
                  <IconAward size={14} />
                </ThemeIcon>
                <Text size="sm" fw={700}>Suggested Connections</Text>
              </Group>

              <Stack gap="sm">
                {suggestedUsers.map(user => {
                  const isFollowing = followedUsers.includes(user.id);
                  return (
                    <Group key={user.id} justify="space-between">
                      <Group gap="sm">
                        <DharmicAvatar name={user.name} size={36} />
                        <Box>
                          <Text size="sm" fw={600} style={{ color: '#1a202c' }}>{user.name}</Text>
                          <Text size="xs" c="dimmed">{user.role[0]}</Text>
                        </Box>
                      </Group>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          size="xs"
                          variant={isFollowing ? 'outline' : 'filled'}
                          color="teal"
                          onClick={() => {
                            toggleFollow(user.id);
                            toast.success(isFollowing ? `Unfollowed ${user.name}` : `Now following ${user.name}`);
                          }}
                        >
                          {isFollowing ? 'Following' : 'Follow'}
                        </Button>
                      </motion.div>
                    </Group>
                  );
                })}
              </Stack>
            </Card>
          </motion.div>
        </Stack>
      </div>
    </div>
  );
}
