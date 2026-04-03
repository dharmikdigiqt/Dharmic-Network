import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Badge,
  Box,
  Button,
  Card,
  Group,
  Image,
  Input,
  Select,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
  ThemeIcon,
  ActionIcon,
  Divider,
} from '@mantine/core';
import {
  IconSearch,
  IconShoppingBag,
  IconStar,
  IconHeart,
  IconHeartFilled,
  IconShieldCheck,
  IconDownload,
  IconPackage,
  IconSortDescending,
  IconCloudDownload,
  IconTruck,
} from '@tabler/icons-react';
import { DharmicAvatar } from '../components/DharmicAvatar';
import { MARKETPLACE_LISTINGS, ListingCategory } from '../constants/marketplace';
import { toast } from 'sonner';

const CATEGORY_LABELS: Record<ListingCategory, string> = {
  product: 'Products',
  service: 'Services',
  course: 'Courses',
  ebook: 'E-Books',
};

const CATEGORY_ICONS: Record<ListingCategory, typeof IconShoppingBag> = {
  product: IconPackage,
  service: IconShieldCheck,
  course: IconDownload,
  ebook: IconDownload,
};

const SORT_OPTIONS = [
  { value: 'popular',    label: 'Most Popular' },
  { value: 'rating',     label: 'Highest Rated' },
  { value: 'price-low',  label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
];

export function Marketplace() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<string | null>('all');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [sort, setSort] = useState<string | null>('popular');

  const toggleWishlist = (id: string) => {
    const added = !wishlist.includes(id);
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    if (added) toast.success('Added to wishlist!');
  };

  const filtered = MARKETPLACE_LISTINGS.filter(l => {
    const matchesSearch = l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.description.toLowerCase().includes(search.toLowerCase()) ||
      l.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    if (activeTab !== 'all') return matchesSearch && l.category === activeTab;
    return matchesSearch;
  });

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <Stack gap="xl">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <Box>
            <Group gap={8} mb={4}>
              <ThemeIcon size={32} radius="xl" style={{ background: 'linear-gradient(135deg, #ff8f0e, #ff961e)', color: 'white' }}>
                <IconShoppingBag size={16} />
              </ThemeIcon>
              <Text size="xl" fw={800} style={{ color: '#1a202c' }}>Dharmic Marketplace</Text>
            </Group>
            <Text c="dimmed" size="sm">Curated products, services and courses aligned with Dharmic values</Text>
          </Box>
        </motion.div>

        {/* Search and sort */}
        <Group>
          <Input
            placeholder="Search marketplace..."
            leftSection={<IconSearch size={16} />}
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            size="md"
            radius="xl"
            style={{ flex: 1 }}
          />
          <Select
            value={sort}
            onChange={setSort}
            data={SORT_OPTIONS}
            leftSection={<IconSortDescending size={16} />}
            w={210}
            radius="md"
            size="md"
            comboboxProps={{ shadow: 'md', radius: 'md' }}
          />
        </Group>

        {/* Category tabs */}
        <Tabs value={activeTab} onChange={setActiveTab} radius="md">
          <Tabs.List>
            <Tabs.Tab value="all" leftSection={<IconShoppingBag size={14} />}>All Listings</Tabs.Tab>
            <Tabs.Tab value="course" leftSection={<IconDownload size={14} />}>Courses</Tabs.Tab>
            <Tabs.Tab value="service" leftSection={<IconShieldCheck size={14} />}>Services</Tabs.Tab>
            <Tabs.Tab value="product" leftSection={<IconPackage size={14} />}>Products</Tabs.Tab>
            <Tabs.Tab value="ebook" leftSection={<IconDownload size={14} />}>E-Books</Tabs.Tab>
          </Tabs.List>
        </Tabs>

        {/* Dharmic Certified Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Box
            p="md"
            style={{
              background: 'linear-gradient(135deg, #e8f5f7, #d0e9ee)',
              borderRadius: 12,
              border: '1px solid #9ecfdb',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <ThemeIcon size={40} radius="xl" color="teal">
              <IconShieldCheck size={20} />
            </ThemeIcon>
            <Box>
              <Text fw={700} size="sm" style={{ color: '#1a202c' }}>Dharmic Certification</Text>
              <Text size="xs" c="dimmed">All listings marked with ✓ have been manually reviewed for alignment with Dharmic values and principles.</Text>
            </Box>
          </Box>
        </motion.div>

        {/* Listings Grid */}
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
          {filtered.map((listing, index) => {
            const isWishlisted = wishlist.includes(listing.id);
            const CategoryIcon = CATEGORY_ICONS[listing.category];

            return (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.07 }}
                whileHover={{ y: -4 }}
              >
                <Card
                  radius="xl"
                  style={{
                    border: '1px solid #e8ecf0',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                  }}
                >
                  {/* Image */}
                  <Box style={{ position: 'relative', margin: '-16px -16px 16px', overflow: 'hidden', height: 180 }}>
                    <Image
                      src={listing.imageUrl}
                      alt={listing.title}
                      height={180}
                      style={{ objectFit: 'cover' }}
                    />
                    <Box style={{ position: 'absolute', top: 12, left: 12 }}>
                      <Badge
                        size="sm"
                        variant="filled"
                        leftSection={<CategoryIcon size={11} />}
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.92)',
                          color: '#1a202c',
                          backdropFilter: 'blur(8px)',
                          boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
                        }}
                      >
                        {CATEGORY_LABELS[listing.category]}
                      </Badge>
                    </Box>
                    {listing.isDharmicCertified && (
                      <Box style={{ position: 'absolute', top: 12, right: 12 }}>
                        <Badge
                          size="sm"
                          color="teal"
                          variant="filled"
                          leftSection={<IconShieldCheck size={11} />}
                        >
                          Dharmic ✓
                        </Badge>
                      </Box>
                    )}
                    <motion.div
                      style={{ position: 'absolute', bottom: 12, right: 12 }}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ActionIcon
                        size="md"
                        radius="xl"
                        onClick={() => toggleWishlist(listing.id)}
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.9)',
                          color: isWishlisted ? '#f44336' : '#718096',
                          backdropFilter: 'blur(8px)',
                        }}
                      >
                        {isWishlisted ? <IconHeartFilled size={16} /> : <IconHeart size={16} />}
                      </ActionIcon>
                    </motion.div>
                  </Box>

                  {/* Content */}
                  <Stack gap="xs" style={{ flex: 1 }}>
                    <Text fw={700} size="sm" style={{ color: '#1a202c', lineHeight: 1.4 }} lineClamp={2}>
                      {listing.title}
                    </Text>

                    <Text size="xs" c="dimmed" lineClamp={2} style={{ lineHeight: 1.5 }}>
                      {listing.description}
                    </Text>

                    <Group gap={4}>
                      {listing.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} size="xs" variant="light" color="gray">{tag}</Badge>
                      ))}
                    </Group>

                    <Divider />

                    {/* Seller */}
                    <Group gap="xs">
                      <DharmicAvatar name={listing.sellerName} size={24} />
                      <Text size="xs" c="dimmed">{listing.sellerName}</Text>
                    </Group>

                    {/* Rating */}
                    <Group gap={4}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <IconStar
                          key={i}
                          size={12}
                          fill={i < Math.floor(listing.rating) ? '#ff8f0e' : 'none'}
                          color={i < Math.floor(listing.rating) ? '#ff8f0e' : '#d1d5db'}
                        />
                      ))}
                      <Text size="xs" c="dimmed">{listing.rating} ({listing.reviews} reviews)</Text>
                    </Group>
                  </Stack>

                  <Divider mt="sm" mb="sm" />

                  {/* Price and CTA */}
                  <Group justify="space-between" align="center">
                    <Box>
                      <Text size="xl" fw={800} style={{ color: '#1a202c' }}>
                        ₹{listing.price.toLocaleString('en-IN')}
                      </Text>
                      <Group gap={4}>
                        {listing.isDigital
                          ? <><IconCloudDownload size={11} color="#718096" /><Text size="xs" c="dimmed">Digital</Text></>
                          : <><IconTruck size={11} color="#718096" /><Text size="xs" c="dimmed">Physical</Text></>
                        }
                      </Group>
                    </Box>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="sm"
                        radius="md"
                        leftSection={<IconShoppingBag size={14} />}
                        style={{ background: 'linear-gradient(135deg, #ff8f0e, #ff961e)', color: 'white' }}
                        onClick={() => toast.success(`Added "${listing.title}" to cart!`)}
                      >
                        Buy Now
                      </Button>
                    </motion.div>
                  </Group>
                </Card>
              </motion.div>
            );
          })}
        </SimpleGrid>
      </Stack>
    </div>
  );
}
