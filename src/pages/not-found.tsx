import { Box, Card, Text, ThemeIcon } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

export default function NotFound() {
  return (
    <Box style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fc' }}>
      <Card radius="lg" p="xl" style={{ maxWidth: 420, width: '100%', border: '1px solid #e8ecf0' }}>
        <Box style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <ThemeIcon size={40} radius="xl" color="red" variant="light">
            <IconAlertCircle size={22} />
          </ThemeIcon>
          <Text size="xl" fw={700} style={{ color: '#1a202c' }}>404 Page Not Found</Text>
        </Box>
        <Text size="sm" c="dimmed">Did you forget to add the page to the router?</Text>
      </Card>
    </Box>
  );
}
