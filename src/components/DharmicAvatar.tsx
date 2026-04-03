const AVATAR_GRADIENTS: [string, string][] = [
  ['#1f8ba5', '#0e7891'],
  ['#ff8f0e', '#c96a00'],
  ['#9c27b0', '#6a1b9a'],
  ['#43a047', '#2e7d32'],
  ['#e53935', '#b71c1c'],
  ['#3949ab', '#1a237e'],
  ['#00897b', '#00695c'],
  ['#f4511e', '#bf360c'],
];

interface DharmicAvatarProps {
  name: string;
  size?: number;
  style?: React.CSSProperties;
}

export function DharmicAvatar({ name, size = 40, style }: DharmicAvatarProps) {
  const words = name.trim().split(/\s+/);
  const initials = words.length >= 2
    ? (words[0][0] + words[words.length - 1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase();

  const colorIndex = (name.charCodeAt(0) * 3 + (name.charCodeAt(1) || 0) * 7) % AVATAR_GRADIENTS.length;
  const [from, to] = AVATAR_GRADIENTS[colorIndex];
  const fontSize = Math.round(size * 0.35);
  const ringInset = Math.max(2, Math.round(size * 0.07));

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: `linear-gradient(145deg, ${from}, ${to})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 800,
        fontSize,
        letterSpacing: '0.03em',
        flexShrink: 0,
        userSelect: 'none',
        fontFamily: '"Inter", system-ui, sans-serif',
        boxShadow: `0 2px 10px ${from}55, inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(0,0,0,0.12)`,
        position: 'relative',
        ...style,
      }}
    >
      {/* Subtle inner ring for depth */}
      <div style={{
        position: 'absolute',
        inset: ringInset,
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.28)',
        pointerEvents: 'none',
      }} />
      <span style={{ position: 'relative', zIndex: 1 }}>{initials}</span>
    </div>
  );
}
