import { motion } from 'framer-motion';

interface DharmicLogoProps {
  size?: number;
  animated?: boolean;
  showText?: boolean;
  textColor?: string;
}

export function DharmicLogo({ size = 48, animated = true, showText = true, textColor = '#1a1a2e' }: DharmicLogoProps) {
  const dotCount = 60;
  const rings = [
    { radius: 38, count: 20, dotSize: 3.5 },
    { radius: 28, count: 16, dotSize: 2.8 },
    { radius: 19, count: 12, dotSize: 2.2 },
    { radius: 11, count: 8, dotSize: 1.6 },
    { radius: 5.5, count: 4, dotSize: 1.0 },
  ];

  const scale = size / 100;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: showText ? 12 : 0 }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg
          viewBox="-50 -50 100 100"
          width={size}
          height={size}
          style={{ overflow: 'visible' }}
        >
          {rings.map((ring, ringIndex) =>
            Array.from({ length: ring.count }).map((_, i) => {
              const angle = (i / ring.count) * 2 * Math.PI - Math.PI / 2;
              const x = ring.radius * Math.cos(angle);
              const y = ring.radius * Math.sin(angle);
              const delay = (ringIndex * 0.1) + (i / ring.count) * 0.3;

              return (
                <motion.circle
                  key={`${ringIndex}-${i}`}
                  cx={x}
                  cy={y}
                  r={ring.dotSize}
                  fill="#2d91ab"
                  initial={animated ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
                  animate={animated ? { opacity: [0.4, 1, 0.4], scale: 1 } : {}}
                  transition={
                    animated
                      ? {
                          opacity: {
                            delay: delay,
                            duration: 2,
                            repeat: Infinity,
                            repeatType: 'reverse',
                            ease: 'easeInOut',
                          },
                          scale: { delay: delay, duration: 0.3 },
                        }
                      : {}
                  }
                />
              );
            })
          )}

          {/* Central triangle */}
          <motion.polygon
            points="0,-16 14,8 -14,8"
            fill="#ff8f0e"
            initial={animated ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
            animate={animated ? { opacity: 1, scale: 1 } : {}}
            transition={animated ? { delay: 0.5, duration: 0.4, type: 'spring', stiffness: 200 } : {}}
          />
        </svg>
      </div>

      {showText && (
        <div>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: size * 0.36,
            color: textColor,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}>
            Dharmic
          </div>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: size * 0.22,
            color: '#2d91ab',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>
            Network
          </div>
        </div>
      )}
    </div>
  );
}
