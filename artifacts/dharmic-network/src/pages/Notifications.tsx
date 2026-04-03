import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Card,
  Group,
  Stack,
  Text,
  Badge,
  Button,
  ThemeIcon,
  Divider,
} from '@mantine/core';
import {
  IconBell,
  IconBellFilled,
  IconHeart,
  IconMessageCircle,
  IconUserPlus,
  IconStar,
  IconBulb,
  IconFlame,
  IconBookmark,
  IconUsers,
  IconCircleCheck,
  IconSparkles,
  IconArrowLeft,
} from '@tabler/icons-react';
import { Link } from 'wouter';
import { DharmicAvatar } from '../components/DharmicAvatar';
import { useAppStore } from '../store';
import { toast } from 'sonner';

type NotifType = 'reaction' | 'comment' | 'follow' | 'bookmark' | 'mention' | 'community' | 'achievement';

interface Notification {
  id: string;
  type: NotifType;
  userName: string;
  message: string;
  time: string;
  group: 'today' | 'yesterday' | 'this-week';
  isRead: boolean;
}

const NOTIF_ICON: Record<NotifType, { icon: typeof IconHeart; color: string; bg: string }> = {
  reaction:    { icon: IconHeart,         color: '#ff5722', bg: '#ff572215' },
  comment:     { icon: IconMessageCircle, color: '#2d91ab', bg: '#2d91ab15' },
  follow:      { icon: IconUserPlus,      color: '#4caf50', bg: '#4caf5015' },
  bookmark:    { icon: IconBookmark,      color: '#ff8f0e', bg: '#ff8f0e15' },
  mention:     { icon: IconBulb,          color: '#9c27b0', bg: '#9c27b015' },
  community:   { icon: IconUsers,         color: '#3f51b5', bg: '#3f51b515' },
  achievement: { icon: IconSparkles,      color: '#ff8f0e', bg: '#ff8f0e15' },
};

const ALL_NOTIFICATIONS: Notification[] = [
  { id: 'n1',  type: 'reaction',    userName: 'Ananya Krishnan', message: 'marked your post "Building Dharmic Network" as Truth',         time: '2 min ago',    group: 'today',     isRead: false },
  { id: 'n2',  type: 'comment',     userName: 'Dr. Priya Nair',  message: 'commented on your post about Vata-Pitta balance',              time: '18 min ago',   group: 'today',     isRead: false },
  { id: 'n3',  type: 'follow',      userName: 'Vikram Patel',    message: 'started following you',                                         time: '45 min ago',   group: 'today',     isRead: false },
  { id: 'n4',  type: 'bookmark',    userName: 'Kiran Rao',        message: 'saved your post to their Gyan Library',                        time: '1 hr ago',     group: 'today',     isRead: true  },
  { id: 'n5',  type: 'achievement', userName: 'Dharmic Network',  message: 'You earned the "Scholar" badge — 100 reactions received!',     time: '3 hrs ago',    group: 'today',     isRead: true  },
  { id: 'n6',  type: 'mention',     userName: 'Meera Devi',       message: 'mentioned you in a post in Dharmic Artists community',         time: '5 hrs ago',    group: 'today',     isRead: true  },
  { id: 'n7',  type: 'comment',     userName: 'Rahul Gupta',      message: 'replied to your comment on the Climate Action Plan post',      time: '1 day ago',    group: 'yesterday', isRead: true  },
  { id: 'n8',  type: 'reaction',    userName: 'Ananya Krishnan',  message: 'and 12 others marked your post as Dharmic Value',             time: '1 day ago',    group: 'yesterday', isRead: true  },
  { id: 'n9',  type: 'follow',      userName: 'Rohan Mishra',     message: 'started following you',                                        time: '1 day ago',    group: 'yesterday', isRead: true  },
  { id: 'n10', type: 'community',   userName: 'IKS Enthusiasts',  message: 'Your post was featured in the community digest',              time: '2 days ago',   group: 'this-week', isRead: true  },
  { id: 'n11', type: 'achievement', userName: 'Dharmic Network',  message: 'Milestone: 200+ followers! Your circle of dharma grows.',     time: '3 days ago',   group: 'this-week', isRead: true  },
  { id: 'n12', type: 'mention',     userName: 'Dr. Priya Nair',   message: 'cited your post in her research on decentralized identity',   time: '4 days ago',   group: 'this-week', isRead: true  },
  { id: 'n13', type: 'community',   userName: 'Dharmic Developers', message: 'New weekly digest is out — 3 posts you might like',        time: '5 days ago',   group: 'this-week', isRead: true  },
  { id: 'n14', type: 'bookmark',    userName: 'Kiran Rao',          message: 'and 8 others saved your Vedic Maths post',                 time: '6 days ago',   group: 'this-week', isRead: true  },
];

const GROUP_LABELS: Record<string, string> = {
  'today':     'Today',
  'yesterday': 'Yesterday',
  'this-week': 'This Week',
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

export function Notifications() {
  const { markNotificationsRead } = useAppStore();
  const [notifications, setNotifications] = useState(ALL_NOTIFICATIONS);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    markNotificationsRead();
    toast.success('All notifications marked as read');
  };

  const markOneRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const groups = ['today', 'yesterday', 'this-week'] as const;

  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      <Stack gap="xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
          <Group justify="space-between" align="center">
            <Group gap="md">
              <Link href="/">
                <Box
                  style={{
                    width: 36, height: 36, borderRadius: '50%',
                    border: '1px solid #e8ecf0', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', backgroundColor: 'white',
                  }}
                >
                  <IconArrowLeft size={16} color="#4a5568" />
                </Box>
              </Link>
              <Box>
                <Group gap={8}>
                  <ThemeIcon size={32} radius="xl" style={{ background: 'linear-gradient(135deg, #2d91ab, #1f8ba5)', color: 'white' }}>
                    <IconBellFilled size={16} />
                  </ThemeIcon>
                  <Text size="xl" fw={800} style={{ color: '#1a202c' }}>Notifications</Text>
                  {unreadCount > 0 && (
                    <Badge color="orange" size="sm" variant="filled">{unreadCount} new</Badge>
                  )}
                </Group>
                <Text size="sm" c="dimmed" mt={2}>Stay connected with your Dharmic circle</Text>
              </Box>
            </Group>
            {unreadCount > 0 && (
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Button
                  variant="outline"
                  color="teal"
                  size="sm"
                  radius="md"
                  leftSection={<IconCircleCheck size={14} />}
                  onClick={markAllRead}
                >
                  Mark all read
                </Button>
              </motion.div>
            )}
          </Group>
        </motion.div>

        {/* Notification groups */}
        {groups.map((group) => {
          const items = notifications.filter(n => n.group === group);
          if (items.length === 0) return null;
          return (
            <Box key={group}>
              <Text size="xs" fw={700} c="dimmed" mb="sm" style={{ textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {GROUP_LABELS[group]}
              </Text>
              <motion.div variants={containerVariants} initial="hidden" animate="visible">
                <Card radius="xl" style={{ border: '1px solid #e8ecf0', overflow: 'hidden', padding: 0 }}>
                  <Stack gap={0}>
                    {items.map((notif, i) => {
                      const cfg = NOTIF_ICON[notif.type];
                      const Icon = cfg.icon;
                      return (
                        <motion.div key={notif.id} variants={itemVariants}>
                          <Box
                            onClick={() => markOneRead(notif.id)}
                            style={{
                              padding: '14px 20px',
                              backgroundColor: !notif.isRead ? '#f0f9ff' : 'white',
                              cursor: 'pointer',
                              transition: 'background 0.15s',
                              borderLeft: !notif.isRead ? '3px solid #2d91ab' : '3px solid transparent',
                            }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = !notif.isRead ? '#e8f5f7' : '#f8f9fc'; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = !notif.isRead ? '#f0f9ff' : 'white'; }}
                          >
                            <Group gap="md" align="flex-start">
                              <Box style={{ position: 'relative', flexShrink: 0 }}>
                                <DharmicAvatar name={notif.userName} size={44} />
                                <Box
                                  style={{
                                    position: 'absolute',
                                    bottom: -2, right: -2,
                                    width: 20, height: 20,
                                    borderRadius: '50%',
                                    backgroundColor: cfg.bg,
                                    border: '2px solid white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}
                                >
                                  <Icon size={10} color={cfg.color} />
                                </Box>
                              </Box>
                              <Box style={{ flex: 1 }}>
                                <Text size="sm" style={{ lineHeight: 1.5, color: '#1a202c' }}>
                                  <strong>{notif.userName}</strong>{' '}
                                  <span style={{ color: '#4a5568', fontWeight: 400 }}>{notif.message}</span>
                                </Text>
                                <Text size="xs" c="dimmed" mt={4}>{notif.time}</Text>
                              </Box>
                              {!notif.isRead && (
                                <div style={{
                                  width: 8, height: 8, borderRadius: '50%',
                                  backgroundColor: '#2d91ab', flexShrink: 0, marginTop: 6,
                                }} />
                              )}
                            </Group>
                          </Box>
                          {i < items.length - 1 && <Divider style={{ margin: '0 20px' }} />}
                        </motion.div>
                      );
                    })}
                  </Stack>
                </Card>
              </motion.div>
            </Box>
          );
        })}

        {unreadCount === 0 && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
            <Card radius="xl" p="xl" style={{ textAlign: 'center', border: '1px solid #e8ecf0' }}>
              <ThemeIcon size={56} radius="xl" color="teal" style={{ margin: '0 auto 12px' }}>
                <IconCircleCheck size={28} />
              </ThemeIcon>
              <Text fw={700} style={{ color: '#1a202c' }}>All caught up!</Text>
              <Text size="sm" c="dimmed" mt={4}>No unread notifications. Your dharmic journey continues smoothly.</Text>
            </Card>
          </motion.div>
        )}
      </Stack>
    </div>
  );
}
