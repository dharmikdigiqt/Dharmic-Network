import { ReactNode } from 'react';
import { useLocation, Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ActionIcon,
  Avatar,
  Group,
  Stack,
  Text,
  Tooltip,
  UnstyledButton,
  Box,
  Indicator,
} from '@mantine/core';
import {
  IconHome2,
  IconUsers,
  IconShoppingBag,
  IconMessage2,
  IconSearch,
  IconBell,
  IconBookmark,
  IconChevronLeft,
  IconChevronRight,
  IconPlus,
  IconCompass,
  IconUser,
} from '@tabler/icons-react';
import { DharmicLogo } from '../components/DharmicLogo';
import { CURRENT_USER } from '../constants/users';
import { getKarmaLevel } from '../constants/karma';
import { useAppStore } from '../store';
import { Toaster } from 'sonner';

interface NavItem {
  icon: typeof IconHome2;
  label: string;
  path: string;
  badge?: number;
}

const NAV_ITEMS: NavItem[] = [
  { icon: IconHome2,     label: 'Dashboard',     path: '/' },
  { icon: IconCompass,   label: 'Discover',      path: '/discover' },
  { icon: IconUsers,     label: 'Communities',   path: '/communities' },
  { icon: IconShoppingBag, label: 'Marketplace', path: '/marketplace' },
  { icon: IconBell,      label: 'Notifications', path: '/notifications' },
  { icon: IconMessage2,  label: 'Messages',      path: '/messages', badge: 2 },
  { icon: IconBookmark,  label: 'Saved',         path: '/saved' },
  { icon: IconUser,      label: 'Profile',       path: '/profile' },
];

export function AppLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const { notificationsCount, sidebarOpen, setSidebarOpen } = useAppStore();
  const userLevel = getKarmaLevel(CURRENT_USER.karmaScore);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fc' }}>
      <Toaster position="top-right" richColors closeButton />

      {/* Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 240 : 70 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e8ecf0',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Logo */}
        <Box p="md" style={{ borderBottom: '1px solid #e8ecf0', minHeight: 72, display: 'flex', alignItems: 'center' }}>
          <AnimatePresence mode="wait">
            {sidebarOpen ? (
              <motion.div
                key="full-logo"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <DharmicLogo size={40} animated={false} showText={true} />
              </motion.div>
            ) : (
              <motion.div
                key="icon-logo"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <DharmicLogo size={36} animated={false} showText={false} />
              </motion.div>
            )}
          </AnimatePresence>
        </Box>

        {/* Navigation */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 8px' }}>
          <Stack gap={4} mt="sm">
            {NAV_ITEMS.map((item) => {
              const isActive = location === item.path || (item.path !== '/' && location.startsWith(item.path));
              return (
                <Link key={item.path} href={item.path}>
                  <UnstyledButton
                    title={!sidebarOpen ? item.label : undefined}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '10px 12px',
                      borderRadius: 10,
                      width: '100%',
                      backgroundColor: isActive ? '#e8f5f7' : 'transparent',
                      color: isActive ? '#1f8ba5' : '#4a5568',
                      fontWeight: isActive ? 600 : 400,
                      transition: 'all 0.15s ease',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = '#f5f7fa';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                    }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: 3,
                          backgroundColor: '#1f8ba5',
                          borderRadius: '0 2px 2px 0',
                        }}
                      />
                    )}
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                      <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                      {(item.path === '/notifications' ? notificationsCount : item.badge ?? 0) > 0 && (
                        <div style={{
                          position: 'absolute',
                          top: -4,
                          right: -4,
                          backgroundColor: '#ff8f0e',
                          color: 'white',
                          borderRadius: '50%',
                          width: 14,
                          height: 14,
                          fontSize: 9,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                        }}>
                          {item.path === '/notifications' ? notificationsCount : item.badge}
                        </div>
                      )}
                    </div>
                    <AnimatePresence>
                      {sidebarOpen && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 'auto' }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2 }}
                          style={{ fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden' }}
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </UnstyledButton>
                </Link>
              );
            })}
          </Stack>
        </div>

        {/* Bottom section */}
        <Box p="xs" style={{ borderTop: '1px solid #e8ecf0' }}>
          {/* Collapse toggle */}
          <UnstyledButton
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title={sidebarOpen ? 'Collapse' : 'Expand'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: sidebarOpen ? 'flex-end' : 'center',
              padding: '8px 12px',
              width: '100%',
              borderRadius: 8,
              color: '#718096',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#f5f7fa'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}
          >
            {sidebarOpen ? <IconChevronLeft size={18} /> : <IconChevronRight size={18} />}
          </UnstyledButton>

          {/* User avatar */}
          <Link href="/profile">
            <UnstyledButton
              title={!sidebarOpen ? CURRENT_USER.name : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px',
                borderRadius: 10,
                width: '100%',
                marginTop: 4,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#f5f7fa'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}
            >
              <Avatar src={CURRENT_USER.avatar} size={36} radius="xl" />
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Text size="sm" fw={600} style={{ whiteSpace: 'nowrap', color: '#1a202c' }}>{CURRENT_USER.name}</Text>
                      {CURRENT_USER.streak && CURRENT_USER.streak > 0 && (
                        <Tooltip label={`🔥 ${CURRENT_USER.streak}-day active streak`} position="right" withArrow>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 2, background: '#fff7ed', border: '1px solid #ff8f0e30', borderRadius: 10, padding: '1px 6px', cursor: 'default' }}>
                            <span style={{ fontSize: 10 }}>🔥</span>
                            <span style={{ fontSize: 10, fontWeight: 700, color: '#d97706', whiteSpace: 'nowrap' }}>{CURRENT_USER.streak}</span>
                          </div>
                        </Tooltip>
                      )}
                    </div>
                    <Text size="xs" fw={600} style={{ whiteSpace: 'nowrap', color: userLevel.color }}>{userLevel.name} · {CURRENT_USER.karmaScore} KP</Text>
                  </motion.div>
                )}
              </AnimatePresence>
            </UnstyledButton>
          </Link>
        </Box>
      </motion.aside>

      {/* Main content */}
      <div style={{
        flex: 1,
        marginLeft: sidebarOpen ? 240 : 70,
        transition: 'margin-left 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}>
        {/* Top bar */}
        <header style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backgroundColor: 'rgba(248, 249, 252, 0.9)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid #e8ecf0',
          padding: '0 24px',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ flex: 1 }} />

          <Group gap="sm">
            <ActionIcon variant="subtle" color="gray" size="lg" radius="xl" title="Search">
              <IconSearch size={18} />
            </ActionIcon>

            <Link href="/notifications">
              <Indicator disabled={notificationsCount === 0} label={notificationsCount} size={16} color="orange">
                <ActionIcon variant="subtle" color="gray" size="lg" radius="xl" title="Notifications">
                  <IconBell size={18} />
                </ActionIcon>
              </Indicator>
            </Link>

            <Link href="/create">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <ActionIcon
                  size="lg"
                  radius="xl"
                  style={{
                    background: 'linear-gradient(135deg, #2d91ab, #1f8ba5)',
                    color: 'white',
                  }}
                >
                  <IconPlus size={18} />
                </ActionIcon>
              </motion.div>
            </Link>
          </Group>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: '24px' }}>
          <motion.div
            key={location}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
