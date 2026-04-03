import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Group,
  Input,
  Stack,
  Text,
  Badge,
  ActionIcon,
  ThemeIcon,
} from '@mantine/core';
import { IconSearch, IconSend, IconMessage2, IconLock, IconMicrophone } from '@tabler/icons-react';
import { USERS } from '../constants/users';
import { toast } from 'sonner';

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

const MOCK_MESSAGES: Record<string, Message[]> = {
  u2: [
    { id: '1', senderId: 'u2', content: 'Namaste! I saw your post about the decentralized identity system. Very inspiring work!', timestamp: '10:30 AM', isOwn: false },
    { id: '2', senderId: 'u1', content: 'Namaste Dr. Priya! Thank you. Inspired by the Vasudhaiva Kutumbakam principle.', timestamp: '10:35 AM', isOwn: true },
    { id: '3', senderId: 'u2', content: 'Would love to collaborate on integrating Prakruti profiles into the identity system.', timestamp: '10:37 AM', isOwn: false },
    { id: '4', senderId: 'u1', content: 'That\'s a brilliant idea! Let\'s schedule a call.', timestamp: '10:40 AM', isOwn: true },
  ],
  u4: [
    { id: '1', senderId: 'u4', content: 'Your question about Vedic Mathematics in the IKS community was excellent!', timestamp: 'Yesterday', isOwn: false },
    { id: '2', senderId: 'u1', content: 'Thank you! I\'ve been studying the Sulba Sutras and their connection to modern geometry.', timestamp: 'Yesterday', isOwn: true },
  ],
};

const CONVERSATIONS = [
  { userId: 'u2', lastMessage: 'Let\'s schedule a call.', time: '10:40 AM', unread: 0 },
  { userId: 'u4', lastMessage: 'I\'ve been studying the Sulba Sutras...', time: 'Yesterday', unread: 2 },
  { userId: 'u3', lastMessage: 'Interested in your project!', time: 'Monday', unread: 0 },
];

export function Messages() {
  const [selectedUser, setSelectedUser] = useState<string | null>('u2');
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(MOCK_MESSAGES);

  const selectedUserData = USERS.find(u => u.id === selectedUser);
  const currentMessages = selectedUser ? (messages[selectedUser] || []) : [];

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedUser) return;
    const msg: Message = {
      id: Date.now().toString(),
      senderId: 'u1',
      content: newMessage,
      timestamp: 'Now',
      isOwn: true,
    };
    setMessages(prev => ({
      ...prev,
      [selectedUser]: [...(prev[selectedUser] || []), msg],
    }));
    setNewMessage('');
    toast.success('Message sent!');
  };

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      <Text size="xl" fw={800} style={{ color: '#1a202c' }} mb="md">Messages</Text>

      <Card radius="xl" style={{ border: '1px solid #e8ecf0', overflow: 'hidden', height: 600 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', height: '100%' }}>
          {/* Conversations list */}
          <Box style={{ borderRight: '1px solid #e8ecf0', display: 'flex', flexDirection: 'column' }}>
            <Box p="md" style={{ borderBottom: '1px solid #e8ecf0' }}>
              <Input
                placeholder="Search messages..."
                leftSection={<IconSearch size={14} />}
                size="sm"
                radius="xl"
              />
            </Box>
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {CONVERSATIONS.map((conv) => {
                const user = USERS.find(u => u.id === conv.userId);
                if (!user) return null;
                const isSelected = selectedUser === conv.userId;
                return (
                  <Box
                    key={conv.userId}
                    p="md"
                    style={{
                      cursor: 'pointer',
                      backgroundColor: isSelected ? '#e8f5f7' : 'transparent',
                      borderLeft: isSelected ? '3px solid #1f8ba5' : '3px solid transparent',
                      transition: 'all 0.15s',
                    }}
                    onClick={() => setSelectedUser(conv.userId)}
                  >
                    <Group gap="sm">
                      <Avatar src={user.avatar} size={42} radius="xl" />
                      <Box style={{ flex: 1, minWidth: 0 }}>
                        <Group justify="space-between">
                          <Text size="sm" fw={600} style={{ color: '#1a202c' }}>{user.name}</Text>
                          <Text size="xs" c="dimmed">{conv.time}</Text>
                        </Group>
                        <Group justify="space-between">
                          <Text size="xs" c="dimmed" lineClamp={1}>{conv.lastMessage}</Text>
                          {conv.unread > 0 && (
                            <Badge size="xs" color="teal" variant="filled" circle>{conv.unread}</Badge>
                          )}
                        </Group>
                      </Box>
                    </Group>
                  </Box>
                );
              })}
            </div>
          </Box>

          {/* Chat area */}
          {selectedUserData ? (
            <Box style={{ display: 'flex', flexDirection: 'column' }}>
              {/* Header */}
              <Box p="md" style={{ borderBottom: '1px solid #e8ecf0' }}>
                <Group justify="space-between">
                  <Group gap="sm">
                    <Avatar src={selectedUserData.avatar} size={40} radius="xl" />
                    <Box>
                      <Text fw={700} size="sm">{selectedUserData.name}</Text>
                      <Group gap={4}>
                        <div style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#4caf50' }} />
                        <Text size="xs" c="dimmed">Active now</Text>
                      </Group>
                    </Box>
                  </Group>
                  <Group gap={4}>
                    <ThemeIcon size={28} radius="xl" variant="light" color="teal">
                      <IconLock size={14} />
                    </ThemeIcon>
                    <Text size="xs" c="dimmed">E2E Encrypted</Text>
                  </Group>
                </Group>
              </Box>

              {/* Messages */}
              <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
                <Stack gap="sm" p="md">
                  {currentMessages.map((msg, i) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      style={{ display: 'flex', justifyContent: msg.isOwn ? 'flex-end' : 'flex-start' }}
                    >
                      {!msg.isOwn && (
                        <Avatar src={selectedUserData.avatar} size={28} radius="xl" mr={8} />
                      )}
                      <Box
                        p="sm"
                        style={{
                          maxWidth: '70%',
                          backgroundColor: msg.isOwn ? '#1f8ba5' : '#f0f2f5',
                          borderRadius: msg.isOwn ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                          color: msg.isOwn ? 'white' : '#1a202c',
                        }}
                      >
                        <Text size="sm" style={{ lineHeight: 1.5 }}>{msg.content}</Text>
                        <Text size="xs" style={{ opacity: 0.7, marginTop: 4, textAlign: 'right' }}>{msg.timestamp}</Text>
                      </Box>
                    </motion.div>
                  ))}
                </Stack>
              </div>

              {/* Input */}
              <Box p="md" style={{ borderTop: '1px solid #e8ecf0' }}>
                <Group gap="sm">
                  <ActionIcon size="lg" radius="xl" variant="subtle" color="gray">
                    <IconMicrophone size={18} />
                  </ActionIcon>
                  <Input
                    placeholder="Write a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.currentTarget.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
                    style={{ flex: 1 }}
                    radius="xl"
                  />
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <ActionIcon
                      size="lg"
                      radius="xl"
                      onClick={sendMessage}
                      style={{ background: 'linear-gradient(135deg, #1f8ba5, #0e7891)', color: 'white' }}
                    >
                      <IconSend size={16} />
                    </ActionIcon>
                  </motion.div>
                </Group>
              </Box>
            </Box>
          ) : (
            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <Stack align="center" gap="sm">
                <ThemeIcon size={60} radius="xl" color="gray" variant="light">
                  <IconMessage2 size={30} />
                </ThemeIcon>
                <Text c="dimmed">Select a conversation to start messaging</Text>
              </Stack>
            </Box>
          )}
        </div>
      </Card>
    </div>
  );
}
