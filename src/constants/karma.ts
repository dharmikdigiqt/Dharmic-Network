export interface KarmaLevel {
  level: number;
  name: string;
  minKP: number;
  maxKP: number | null;
  color: string;
}

export const KARMA_LEVELS: KarmaLevel[] = [
  { level: 1, name: 'Jignasu',    minKP: 0,    maxKP: 199,  color: '#94a3b8' },
  { level: 2, name: 'Shishya',    minKP: 200,  maxKP: 599,  color: '#22c55e' },
  { level: 3, name: 'Sadhak',     minKP: 600,  maxKP: 1499, color: '#3b82f6' },
  { level: 4, name: 'Vidwan',     minKP: 1500, maxKP: 3499, color: '#8b5cf6' },
  { level: 5, name: 'Prajna',     minKP: 3500, maxKP: 7499, color: '#f59e0b' },
  { level: 6, name: 'Mahasadhak', minKP: 7500, maxKP: null, color: '#f97316' },
];

export function getKarmaLevel(kp: number): KarmaLevel {
  return [...KARMA_LEVELS].reverse().find(l => kp >= l.minKP) ?? KARMA_LEVELS[0];
}

export function getLevelProgress(kp: number): number {
  const current = getKarmaLevel(kp);
  if (!current.maxKP) return 100;
  return Math.min(100, ((kp - current.minKP) / (current.maxKP - current.minKP + 1)) * 100);
}

export function getNextLevel(kp: number): KarmaLevel | null {
  const current = getKarmaLevel(kp);
  return KARMA_LEVELS.find(l => l.level === current.level + 1) ?? null;
}
