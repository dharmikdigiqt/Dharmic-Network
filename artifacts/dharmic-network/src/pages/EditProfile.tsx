import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Button,
  Card,
  Divider,
  Group,
  Stack,
  Text,
  TextInput,
  Textarea,
  ThemeIcon,
  Badge,
} from '@mantine/core';
import {
  IconEdit,
  IconArrowLeft,
  IconMapPin,
  IconUser,
  IconAt,
  IconAlignLeft,
  IconSparkles,
  IconCircleCheck,
  IconLeaf,
  IconCode,
  IconBrush,
  IconHeartHandshake,
  IconMicroscope,
  IconPlant2,
} from '@tabler/icons-react';
import { Link, useLocation } from 'wouter';
import { CURRENT_USER } from '../constants/users';
import { DharmicAvatar } from '../components/DharmicAvatar';
import { toast } from 'sonner';

const SKILL_OPTIONS = [
  { label: 'Vedic Studies', icon: IconSparkles },
  { label: 'Sanskrit', icon: IconAlignLeft },
  { label: 'Ayurveda', icon: IconLeaf },
  { label: 'Yoga', icon: IconPlant2 },
  { label: 'Software Dev', icon: IconCode },
  { label: 'Digital Art', icon: IconBrush },
  { label: 'Philosophy', icon: IconHeartHandshake },
  { label: 'Research', icon: IconMicroscope },
];

const PRAKRUTI_OPTIONS = ['Vata', 'Pitta', 'Kapha', 'Vata-Pitta', 'Pitta-Kapha', 'Vata-Kapha'];
const PRAKRUTI_COLORS: Record<string, [string, string]> = {
  Vata:        ['#9c27b0', '#673ab7'],
  Pitta:       ['#ff5722', '#f44336'],
  Kapha:       ['#4caf50', '#2e7d32'],
  'Vata-Pitta':  ['#9c27b0', '#ff5722'],
  'Pitta-Kapha': ['#ff5722', '#4caf50'],
  'Vata-Kapha':  ['#9c27b0', '#4caf50'],
};

const fieldVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.35 } }),
};

export function EditProfile() {
  const [, navigate] = useLocation();
  const [form, setForm] = useState({
    name: CURRENT_USER.name,
    username: CURRENT_USER.username,
    bio: CURRENT_USER.bio,
    location: CURRENT_USER.location,
    prakruti: CURRENT_USER.prakruti,
    skills: [...CURRENT_USER.skills],
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    setSaving(false);
    toast.success('Profile updated successfully! ✦');
    navigate('/profile');
  };

  const toggleSkill = (skill: string) => {
    setForm(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  return (
    <div style={{ maxWidth: 680, margin: '0 auto' }}>
      <Stack gap="xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
          <Group gap="md">
            <Link href="/profile">
              <Box style={{
                width: 36, height: 36, borderRadius: '50%',
                border: '1px solid #e8ecf0', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', backgroundColor: 'white',
              }}>
                <IconArrowLeft size={16} color="#4a5568" />
              </Box>
            </Link>
            <Box>
              <Group gap={8}>
                <ThemeIcon size={32} radius="xl" style={{ background: 'linear-gradient(135deg, #2d91ab, #1f8ba5)', color: 'white' }}>
                  <IconEdit size={16} />
                </ThemeIcon>
                <Text size="xl" fw={800} style={{ color: '#1a202c' }}>Edit Profile</Text>
              </Group>
              <Text size="sm" c="dimmed" mt={2}>Update your Dharmic identity</Text>
            </Box>
          </Group>
        </motion.div>

        {/* Avatar section */}
        <motion.custom={0} variants={fieldVariants} initial="hidden" animate="visible">
          <Card radius="xl" style={{ border: '1px solid #e8ecf0' }}>
            <Group gap="lg" align="center">
              <Box style={{ position: 'relative' }}>
                <DharmicAvatar name={form.name} size={80} />
                <Box style={{
                  position: 'absolute', bottom: 0, right: 0,
                  width: 28, height: 28, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #2d91ab, #1f8ba5)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid white', cursor: 'pointer',
                }}>
                  <IconEdit size={13} color="white" />
                </Box>
              </Box>
              <Box>
                <Text fw={700} style={{ color: '#1a202c' }}>{form.name}</Text>
                <Text size="sm" c="dimmed">@{form.username}</Text>
                <Text size="xs" c="teal" mt={4} style={{ cursor: 'pointer' }}>Change avatar photo</Text>
              </Box>
            </Group>
          </Card>
        </motion.custom>

        {/* Form fields */}
        <Card radius="xl" style={{ border: '1px solid #e8ecf0' }}>
          <Stack gap="lg">
            <Text size="sm" fw={700} c="dimmed" style={{ textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Basic Information
            </Text>

            {[
              { label: 'Full Name', field: 'name', icon: IconUser, placeholder: 'Your full name' },
              { label: 'Username', field: 'username', icon: IconAt, placeholder: 'username' },
              { label: 'Location', field: 'location', icon: IconMapPin, placeholder: 'City, Country' },
            ].map((item, i) => (
              <motion.div key={item.field} custom={i + 1} variants={fieldVariants} initial="hidden" animate="visible">
                <TextInput
                  label={item.label}
                  placeholder={item.placeholder}
                  value={form[item.field as keyof typeof form] as string}
                  onChange={(e) => setForm(prev => ({ ...prev, [item.field]: e.currentTarget.value }))}
                  leftSection={<item.icon size={16} color="#718096" />}
                  radius="md"
                  styles={{
                    input: { borderColor: '#e8ecf0' },
                    label: { fontWeight: 600, color: '#4a5568', fontSize: 13 },
                  }}
                />
              </motion.div>
            ))}

            <motion.div custom={4} variants={fieldVariants} initial="hidden" animate="visible">
              <Textarea
                label="Bio"
                placeholder="Share your Dharmic story..."
                value={form.bio}
                onChange={(e) => setForm(prev => ({ ...prev, bio: e.currentTarget.value }))}
                minRows={3}
                maxRows={5}
                radius="md"
                styles={{
                  input: { borderColor: '#e8ecf0' },
                  label: { fontWeight: 600, color: '#4a5568', fontSize: 13 },
                }}
              />
            </motion.div>
          </Stack>
        </Card>

        {/* Prakruti */}
        <motion.div custom={5} variants={fieldVariants} initial="hidden" animate="visible">
          <Card radius="xl" style={{ border: '1px solid #e8ecf0' }}>
            <Stack gap="md">
              <Group gap={8}>
                <ThemeIcon size={24} radius="xl" style={{ background: 'linear-gradient(135deg, #9c27b0, #ff5722)', color: 'white' }}>
                  <IconLeaf size={12} />
                </ThemeIcon>
                <Text size="sm" fw={700} style={{ color: '#1a202c' }}>Prakruti Type</Text>
              </Group>
              <Text size="xs" c="dimmed">Your Ayurvedic constitution determines your natural tendencies and wellness approach.</Text>
              <Group gap={8}>
                {PRAKRUTI_OPTIONS.map(p => {
                  const isSelected = form.prakruti === p;
                  const [from, to] = PRAKRUTI_COLORS[p];
                  return (
                    <motion.div key={p} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Box
                        onClick={() => setForm(prev => ({ ...prev, prakruti: p }))}
                        style={{
                          padding: '6px 14px',
                          borderRadius: 20,
                          cursor: 'pointer',
                          background: isSelected ? `linear-gradient(135deg, ${from}, ${to})` : 'transparent',
                          border: isSelected ? 'none' : '1px solid #e8ecf0',
                          color: isSelected ? 'white' : '#4a5568',
                          fontSize: 13,
                          fontWeight: isSelected ? 700 : 400,
                          transition: 'all 0.2s',
                        }}
                      >
                        {p}
                      </Box>
                    </motion.div>
                  );
                })}
              </Group>
            </Stack>
          </Card>
        </motion.div>

        {/* Skills */}
        <motion.div custom={6} variants={fieldVariants} initial="hidden" animate="visible">
          <Card radius="xl" style={{ border: '1px solid #e8ecf0' }}>
            <Stack gap="md">
              <Group gap={8}>
                <ThemeIcon size={24} radius="xl" style={{ background: 'linear-gradient(135deg, #2d91ab, #1f8ba5)', color: 'white' }}>
                  <IconSparkles size={12} />
                </ThemeIcon>
                <Text size="sm" fw={700} style={{ color: '#1a202c' }}>Skills & Interests</Text>
              </Group>
              <Group gap={8}>
                {SKILL_OPTIONS.map(({ label, icon: Icon }) => {
                  const isSelected = form.skills.includes(label);
                  return (
                    <motion.div key={label} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Box
                        onClick={() => toggleSkill(label)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: 20,
                          cursor: 'pointer',
                          backgroundColor: isSelected ? '#e8f5f7' : 'transparent',
                          border: `1px solid ${isSelected ? '#2d91ab' : '#e8ecf0'}`,
                          color: isSelected ? '#1f8ba5' : '#718096',
                          fontSize: 13,
                          fontWeight: isSelected ? 600 : 400,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          transition: 'all 0.2s',
                        }}
                      >
                        <Icon size={13} />
                        {label}
                      </Box>
                    </motion.div>
                  );
                })}
              </Group>
            </Stack>
          </Card>
        </motion.div>

        {/* Save */}
        <motion.div custom={7} variants={fieldVariants} initial="hidden" animate="visible">
          <Group justify="flex-end" gap="sm">
            <Link href="/profile">
              <Button variant="outline" color="gray" radius="md">Cancel</Button>
            </Link>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Button
                radius="md"
                loading={saving}
                leftSection={<IconCircleCheck size={16} />}
                style={{ background: 'linear-gradient(135deg, #2d91ab, #1f8ba5)', color: 'white' }}
                onClick={handleSave}
              >
                Save Changes
              </Button>
            </motion.div>
          </Group>
        </motion.div>
      </Stack>
    </div>
  );
}
