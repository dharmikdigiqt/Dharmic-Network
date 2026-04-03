const AVATAR_GRADIENTS: [string, string][] = [
  ['#1f8ba5', '#0e7891'],
  ['#ff8f0e', '#e67e00'],
  ['#9c27b0', '#673ab7'],
  ['#4caf50', '#2e7d32'],
  ['#f44336', '#b71c1c'],
  ['#3f51b5', '#1a237e'],
  ['#009688', '#00695c'],
  ['#ff5722', '#bf360c'],
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

  const colorIndex = (name.charCodeAt(0) + (name.charCodeAt(1) || 0)) % AVATAR_GRADIENTS.length;
  const [from, to] = AVATAR_GRADIENTS[colorIndex];
  const fontSize = Math.round(size * 0.36);

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: `linear-gradient(135deg, ${from}, ${to})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 700,
        fontSize,
        letterSpacing: '0.04em',
        flexShrink: 0,
        userSelect: 'none',
        fontFamily: 'system-ui, sans-serif',
        ...style,
      }}
    >
      {initials}
    </div>
  );
}
