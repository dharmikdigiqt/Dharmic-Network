import { useState } from 'react';
import { motion } from 'framer-motion';
import {
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
} from '@mantine/core';
import { IconSearch, IconUsers, IconCheck, IconPlus, IconShieldCheck } from '@tabler/icons-react';
import { COMMUNITIES } from '../constants/communities';
import { useAppStore } from '../store';
import { toast } from 'sonner';

export function Communities() {
  const { joinedCommunities, toggleCommunity } = useAppStore();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<string | null>('all');

  const filtered = COMMUNITIES.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    if (activeTab === 'joined') return matchesSearch && joinedCommunities.includes(c.id);
    if (activeTab === 'discover') return matchesSearch && !joinedCommunities.includes(c.id);
    return matchesSearch;
  });

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <Stack gap="xl">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <Group justify="space-between" align="flex-end">
            <Box>
              <Text size="xl" fw={800} style={{ color: '#1a202c' }}>Communities</Text>
              <Text c="dimmed" size="sm">Connect with like-minded Dharmic individuals</Text>
            </Box>
            <Button
              leftSection={<IconPlus size={16} />}
              variant="filled"
              color="teal"
              radius="md"
              onClick={() => toast.info('Community creation requires 500+ Karma points')}
            >
              Create Community
            </Button>
          </Group>
        </motion.div>

        {/* Search */}
        <Input
          placeholder="Search communities by name, topic, or tag..."
          leftSection={<IconSearch size={16} />}
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          size="md"
          radius="xl"
          style={{ maxWidth: 500 }}
        />

        {/* Tabs */}
        <Tabs value={activeTab} onChange={setActiveTab} radius="md">
          <Tabs.List>
            <Tabs.Tab value="all">All Communities ({COMMUNITIES.length})</Tabs.Tab>
            <Tabs.Tab value="joined">Joined ({joinedCommunities.length})</Tabs.Tab>
            <Tabs.Tab value="discover">Discover</Tabs.Tab>
          </Tabs.List>
        </Tabs>

        {/* Community Grid */}
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
          {filtered.map((community, index) => {
            const isJoined = joinedCommunities.includes(community.id);
            return (
              <motion.div
                key={community.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ y: -4 }}
              >
                <Card
                  radius="xl"
                  style={{
                    border: `1px solid ${isJoined ? community.color + '40' : '#e8ecf0'}`,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}
                >
                  {/* Header */}
                  <Box
                    style={{
                      background: `linear-gradient(135deg, ${community.color}15, ${community.color}05)`,
                      margin: '-16px -16px 16px',
                      padding: '20px 16px 16px',
                      borderBottom: `1px solid ${community.color}20`,
                    }}
                  >
                    <Group justify="space-between" align="flex-start">
                      <div style={{
                        width: 48, height: 48, borderRadius: 12,
                        backgroundColor: `${community.color}20`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 24, border: `2px solid ${community.color}30`,
                      }}>
                        {community.icon}
                      </div>
                      <Group gap={6}>
                        {community.isVerified && (
                          <Badge size="sm" color="teal" variant="light" leftSection={<IconShieldCheck size={11} />}>
                            Verified
                          </Badge>
                        )}
                        {isJoined && (
                          <Badge size="sm" variant="filled" leftSection={<IconCheck size={11} />} style={{ backgroundColor: community.color }}>
                            Joined
                          </Badge>
                        )}
                      </Group>
                    </Group>
                    <Text fw={700} mt="sm" size="md" style={{ color: '#1a202c' }}>{community.name}</Text>
                    <Badge size="xs" variant="outline" style={{ color: community.color, borderColor: community.color + '60' }}>
                      {community.category}
                    </Badge>
                  </Box>

                  {/* Body */}
                  <Text size="sm" c="dimmed" mb="md" style={{ lineHeight: 1.6, flex: 1 }} lineClamp={2}>
                    {community.description}
                  </Text>

                  <Group gap={6} mb="md">
                    {community.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} size="xs" variant="light" color="gray">{tag}</Badge>
                    ))}
                  </Group>

                  {/* Stats */}
                  <Group justify="space-between" mb="md">
                    <Group gap="sm">
                      <Group gap={4}>
                        <IconUsers size={14} color="#718096" />
                        <Text size="xs" c="dimmed">{community.members.toLocaleString()} members</Text>
                      </Group>
                    </Group>
                    <Text size="xs" c="dimmed">{community.posts.toLocaleString()} posts</Text>
                  </Group>

                  {/* Join button */}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      fullWidth
                      variant={isJoined ? 'outline' : 'filled'}
                      radius="md"
                      size="sm"
                      style={isJoined ? {
                        borderColor: community.color + '60',
                        color: community.color,
                      } : {
                        background: `linear-gradient(135deg, ${community.color}, ${community.color}cc)`,
                      }}
                      onClick={() => {
                        toggleCommunity(community.id);
                        toast.success(isJoined ? `Left ${community.name}` : `Joined ${community.name}! 🙏`);
                      }}
                    >
                      {isJoined ? 'Leave Community' : 'Join Community'}
                    </Button>
                  </motion.div>
                </Card>
              </motion.div>
            );
          })}
        </SimpleGrid>

        {filtered.length === 0 && (
          <Box py="xl" style={{ textAlign: 'center' }}>
            <Text c="dimmed" size="lg">No communities found matching "{search}"</Text>
          </Box>
        )}
      </Stack>
    </div>
  );
}
