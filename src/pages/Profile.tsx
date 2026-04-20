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
} from '@mantine/core';
import {
  IconMapPin,
  IconCalendar,
  IconEdit,
  IconShare,
  IconBookmark,
  IconFileText,
  IconCheck,
  IconSparkles,
  IconLeaf,
  IconCode,
  IconStar,
  IconX,
  IconRocket,
} from '@tabler/icons-react';
import { Link } from 'wouter';
import { CURRENT_USER } from '../constants/users';
import { getKarmaLevel, getLevelProgress, getNextLevel, KARMA_LEVELS } from '../constants/karma';
import { POSTS } from '../constants/posts';
import { PostCard } from '../components/PostCard';
import { Show } from '../utilities/Show';
import { toast } from 'sonner';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export function Profile() {
  const [activeTab, setActiveTab] = useState<string | null>('posts');
  const [nudgeDismissed, setNudgeDismissed] = useState(false);
  const userPosts = POSTS.filter(p => p.authorId === 'u1');
  const kp = CURRENT_USER.karmaScore;
  const currentLevel = getKarmaLevel(kp);
  const nextLevel = getNextLevel(kp);
  const progress = getLevelProgress(kp);

  const completionItems = [
    { label: 'Write your bio',    done: CURRENT_USER.bio.length > 0 },
    { label: 'Set Prakruti type', done: !!CURRENT_USER.prakruti },
    { label: 'Pick a role tag',   done: CURRENT_USER.role.length > 0 },
    { label: 'Add your skills',   done: CURRENT_USER.skills.length > 0 },
  ];
  const completedCount = completionItems.filter(i => i.done).length;
  const isComplete = completedCount === completionItems.length;
  const showNudge = !nudgeDismissed;

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <motion.div variants={containerVariants} initial="hidden" animate="visible">

        <motion.div variants={itemVariants}>
          <Box style={{ position: 'relative' }}>
            <Box
              style={{
                height: 200,
                borderRadius: '20px 20px 0 0',
                background: 'linear-gradient(135deg, #1f8ba5 0%, #0e7891 40%, #005970 100%)',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
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

            <Box style={{ position: 'absolute', bottom: -50, left: 24, zIndex: 2 }}>
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
              >
                <Avatar
                  src={CURRENT_USER.avatar}
                  size={100}
                  radius="xl"
                  style={{ border: '4px solid white', boxShadow: '0 6px 24px rgba(0,0,0,0.18)' }}
                />
              </motion.div>
            </Box>

            <Box style={{ position: 'absolute', bottom: -50, right: 24, zIndex: 2 }}>
              <Group gap="sm">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    radius="md"
                    leftSection={<IconShare size={14} />}
                    onClick={() => toast.success('Profile link copied!')}
                  >
                    Share
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  <Link href="/profile/edit">
                    <Button
                      size="sm"
                      radius="md"
                      leftSection={<IconEdit size={14} />}
                      style={{ background: 'linear-gradient(135deg, #2d91ab, #1f8ba5)', color: 'white' }}
                    >
                      Edit Profile
                    </Button>
                  </Link>
                </motion.div>
              </Group>
            </Box>
          </Box>

          <Card radius="0 0 20px 20px" style={{ border: '1px solid #e8ecf0', borderTop: 'none', paddingTop: 64 }} mb="lg">
            <Stack gap="xs">
              <Group gap="sm">
                <Text size="xl" fw={800} style={{ color: '#1a202c' }}>{CURRENT_USER.name}</Text>
                <Show when={CURRENT_USER.isVerified}>
                  <ThemeIcon size={22} radius="xl" color="teal">
                    <IconCheck size={12} />
                  </ThemeIcon>
                </Show>
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
                  <Text size="sm" c="dimmed">
                    Joined {new Date(CURRENT_USER.joinedDate).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                  </Text>
                </Group>
              </Group>
              <Group gap={6} mt={4}>
                {CURRENT_USER.role.map(role => (
                  <Badge key={role} size="sm" color="teal" variant="light">{role}</Badge>
                ))}
              </Group>
            </Stack>

            <Divider my="md" />

            <motion.div variants={itemVariants}>
              <SimpleGrid cols={4} mb="md">
                {[
                  { label: 'Posts',     value: userPosts.length       },
                  { label: 'Followers', value: CURRENT_USER.followers },
                  { label: 'Following', value: CURRENT_USER.following },
                ].map((stat) => (
                  <Box key={stat.label} style={{ textAlign: 'center' }}>
                    <Text size="xl" fw={800} style={{ color: '#1a202c' }}>{stat.value}</Text>
                    <Text size="xs" c="dimmed">{stat.label}</Text>
                  </Box>
                ))}
                <Box style={{ textAlign: 'center' }}>
                  <Text size="xl" fw={800} style={{ color: currentLevel.color }}>{currentLevel.name}</Text>
                  <Text size="xs" c="dimmed">✦ {kp} Karma</Text>
                </Box>
              </SimpleGrid>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SimpleGrid cols={2} mb="md">
                <Box p="md" style={{ backgroundColor: '#f8f9fc', borderRadius: 12 }}>
                  <Group gap={6} mb="xs">
                    <ThemeIcon size={18} radius="xl" style={{ background: 'linear-gradient(135deg, #9c27b0, #ff5722)', color: 'white' }}>
                      <IconLeaf size={10} />
                    </ThemeIcon>
                    <Text size="xs" fw={700} c="dimmed" style={{ textTransform: 'uppercase', letterSpacing: '0.06em' }}>Prakruti</Text>
                  </Group>
                  <Badge size="lg" variant="gradient" gradient={{ from: '#9c27b0', to: '#ff5722' }}>
                    {CURRENT_USER.prakruti}
                  </Badge>
                  <Text size="xs" c="dimmed" mt="xs">Your Ayurvedic constitution</Text>
                </Box>
                <Box p="md" style={{ backgroundColor: '#f8f9fc', borderRadius: 12 }}>
                  <Group gap={6} mb="xs">
                    <ThemeIcon size={18} radius="xl" style={{ background: 'linear-gradient(135deg, #2d91ab, #1f8ba5)', color: 'white' }}>
                      <IconCode size={10} />
                    </ThemeIcon>
                    <Text size="xs" fw={700} c="dimmed" style={{ textTransform: 'uppercase', letterSpacing: '0.06em' }}>Skills</Text>
                  </Group>
                  <Group gap={6}>
                    {CURRENT_USER.skills.map(skill => (
                      <Badge key={skill} size="sm" color="blue" variant="light">{skill}</Badge>
                    ))}
                  </Group>
                </Box>
              </SimpleGrid>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Box p="md" mb="md" style={{ borderRadius: 12, border: `1.5px solid ${currentLevel.color}30`, background: `linear-gradient(135deg, ${currentLevel.color}08, ${currentLevel.color}03)` }}>
                <Group justify="space-between" mb="sm">
                  <Group gap={10}>
                    <div style={{ width: 42, height: 42, borderRadius: 10, background: `linear-gradient(135deg, ${currentLevel.color}, ${currentLevel.color}99)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>
                      L{currentLevel.level}
                    </div>
                    <div>
                      <Text fw={700} size="sm" style={{ color: currentLevel.color }}>{currentLevel.name}</Text>
                      <Text size="xs" c="dimmed">{kp.toLocaleString()} Karma Points</Text>
                    </div>
                  </Group>
                  <Show when={nextLevel}>
                    {nl => (
                      <Text size="xs" c="dimmed">
                        {(nl.minKP - kp).toLocaleString()} KP to{' '}
                        <span style={{ color: nl.color, fontWeight: 600 }}>{nl.name}</span>
                      </Text>
                    )}
                  </Show>
                </Group>
                <Progress value={progress} color={currentLevel.color} size="sm" radius="xl" />
                <Show when={nextLevel}>
                  {nl => (
                    <Group justify="space-between" mt={5}>
                      <Text size="xs" c="dimmed">{currentLevel.name}</Text>
                      <Text size="xs" c="dimmed">{nl.name}</Text>
                    </Group>
                  )}
                </Show>
              </Box>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Box mb="sm">
                <Text size="xs" fw={700} c="dimmed" mb="md" style={{ textTransform: 'uppercase', letterSpacing: '0.06em' }}>Your Journey</Text>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {KARMA_LEVELS.map((lvl, i) => {
                    const reached = kp >= lvl.minKP;
                    const isCurrent = lvl.level === currentLevel.level;
                    return (
                      <div key={lvl.level} style={{ display: 'flex', alignItems: 'center', flex: i < KARMA_LEVELS.length - 1 ? 1 : 0 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                          <motion.div
                            whileHover={{ scale: 1.15 }}
                            style={{
                              width: isCurrent ? 36 : 26,
                              height: isCurrent ? 36 : 26,
                              borderRadius: '50%',
                              background: reached ? lvl.color : '#e2e8f0',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              color: reached ? 'white' : '#a0aec0',
                              fontWeight: 700,
                              fontSize: isCurrent ? 13 : 10,
                              border: isCurrent ? `3px solid ${lvl.color}` : 'none',
                              boxShadow: isCurrent ? `0 0 0 4px ${lvl.color}25` : 'none',
                              transition: 'all 0.2s',
                              flexShrink: 0,
                            }}
                          >
                            {lvl.level}
                          </motion.div>
                          <Text size="xs" fw={isCurrent ? 700 : 400} style={{ color: reached ? lvl.color : '#a0aec0', whiteSpace: 'nowrap', fontSize: 10 }}>
                            {lvl.name}
                          </Text>
                        </div>
                        {i < KARMA_LEVELS.length - 1 && (
                          <div style={{ flex: 1, height: 2, background: kp >= KARMA_LEVELS[i + 1].minKP ? `linear-gradient(90deg, ${lvl.color}, ${KARMA_LEVELS[i + 1].color})` : '#e2e8f0', margin: '0 4px', marginBottom: 18 }} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </Box>
            </motion.div>
          </Card>
        </motion.div>

        {showNudge && (
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>
            <Box
              mb="md"
              px="md"
              py={10}
              style={{
                borderRadius: 10,
                border: isComplete ? '1px solid #4caf5030' : '1px solid #ff8f0e30',
                background: isComplete ? '#f0fdf4' : '#fffbeb',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              {isComplete
                ? <IconCheck size={14} color="#4caf50" />
                : <IconRocket size={14} color="#ff8f0e" />}
              <Text size="xs" fw={600} style={{ color: isComplete ? '#166534' : '#92400e', flex: 1 }}>
                {isComplete
                  ? 'Profile complete · +50 KP earned ✦'
                  : `Complete your profile to earn +50 KP · ${completedCount}/${completionItems.length} done`}
              </Text>
              {!isComplete && (
                <Link href="/profile/edit">
                  <Text size="xs" fw={700} style={{ color: '#ff8f0e', cursor: 'pointer', textDecoration: 'underline' }}>
                    Complete
                  </Text>
                </Link>
              )}
              <button
                onClick={() => setNudgeDismissed(true)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#a0aec0', padding: 2, display: 'flex' }}
              >
                <IconX size={13} />
              </button>
            </Box>
          </motion.div>
        )}

        <motion.div variants={itemVariants}>
          <Box mt="md">
            <Tabs value={activeTab} onChange={setActiveTab} radius="md">
              <Tabs.List>
                <Tabs.Tab value="posts" leftSection={<IconFileText size={14} />}>
                  Posts ({userPosts.length})
                </Tabs.Tab>
                <Tabs.Tab value="saved" leftSection={<IconBookmark size={14} />}>
                  Gyan Library
                </Tabs.Tab>
                <Tabs.Tab value="karma" leftSection={<IconStar size={14} />}>
                  Karma
                </Tabs.Tab>
              </Tabs.List>
            </Tabs>

            <Box mt="md">
              <Show when={activeTab === 'posts'}>
                <Stack gap={0}>
                  <Show
                    when={userPosts.length > 0}
                    fallback={
                      <Card radius="lg" p="xl" style={{ textAlign: 'center', border: '1px solid #e8ecf0' }}>
                        <ThemeIcon size={48} radius="xl" color="gray" style={{ margin: '0 auto 12px' }}>
                          <IconSparkles size={24} />
                        </ThemeIcon>
                        <Text c="dimmed">No posts yet. Share your first thought with the community!</Text>
                      </Card>
                    }
                  >
                    {userPosts.map((post, i) => <PostCard key={post.id} post={post} index={i} />)}
                  </Show>
                </Stack>
              </Show>

              <Show when={activeTab === 'saved'}>
                <Card radius="lg" p="xl" style={{ textAlign: 'center', border: '1px solid #e8ecf0' }}>
                  <ThemeIcon size={48} radius="xl" color="orange" style={{ margin: '0 auto 12px' }}>
                    <IconBookmark size={24} />
                  </ThemeIcon>
                  <Text fw={600} style={{ color: '#1a202c' }}>Your Gyan Library</Text>
                  <Text size="sm" c="dimmed" mt={4}>Saved posts and bookmarked content appear here.</Text>
                </Card>
              </Show>

              <Show when={activeTab === 'karma'}>
                <Stack gap="sm">
                  {KARMA_LEVELS.map(lvl => {
                    const reached = kp >= lvl.minKP;
                    const isCurrent = lvl.level === currentLevel.level;
                    const lvlProgress = isCurrent ? progress : reached ? 100 : 0;
                    return (
                      <motion.div
                        key={lvl.level}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: lvl.level * 0.06 }}
                      >
                        <Card
                          radius="lg"
                          style={{
                            border: isCurrent ? `1.5px solid ${lvl.color}50` : '1px solid #e8ecf0',
                            background: isCurrent ? `linear-gradient(135deg, ${lvl.color}08, white)` : 'white',
                            opacity: !reached ? 0.5 : 1,
                          }}
                          p="md"
                        >
                          <Group justify="space-between" mb={8}>
                            <Group gap={10}>
                              <div style={{ width: 36, height: 36, borderRadius: 8, background: reached ? `linear-gradient(135deg, ${lvl.color}, ${lvl.color}99)` : '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: reached ? 'white' : '#a0aec0', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>
                                L{lvl.level}
                              </div>
                              <div>
                                <Group gap={6}>
                                  <Text fw={700} size="sm" style={{ color: reached ? lvl.color : '#a0aec0' }}>{lvl.name}</Text>
                                  <Show when={isCurrent}>
                                    <Badge size="xs" style={{ background: lvl.color, color: 'white' }}>Current</Badge>
                                  </Show>
                                  <Show when={reached && !isCurrent}>
                                    <Badge size="xs" color="gray" variant="light">Reached</Badge>
                                  </Show>
                                </Group>
                                <Text size="xs" c="dimmed">
                                  {lvl.minKP.toLocaleString()}{lvl.maxKP ? ` – ${lvl.maxKP.toLocaleString()}` : '+'} KP
                                </Text>
                              </div>
                            </Group>
                            <Show when={isCurrent && !!nextLevel}>
                              <Text size="xs" c="dimmed">{nextLevel ? (nextLevel.minKP - kp).toLocaleString() : 0} KP to next</Text>
                            </Show>
                          </Group>
                          <Show when={isCurrent || reached}>
                            <Progress value={lvlProgress} color={lvl.color} size="xs" radius="xl" />
                          </Show>
                        </Card>
                      </motion.div>
                    );
                  })}
                </Stack>
              </Show>
            </Box>
          </Box>
        </motion.div>
      </motion.div>
    </div>
  );
}
