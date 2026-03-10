export const BLOCK_TYPES = [
  'VERSE',
  'CHORUS',
  'BRIDGE',
  'INTRO',
  'OUTRO',
  'SOLO',
  'TAB',
  'INSTRUMENTAL',
  'CUSTOM',
  'REPEAT',
] as const;

export type BlockType = (typeof BLOCK_TYPES)[number];

export const BLOCK_TYPE_LABELS: Record<BlockType, string> = {
  VERSE: 'Verso',
  CHORUS: 'Coro',
  BRIDGE: 'Puente',
  INTRO: 'Intro',
  OUTRO: 'Outro',
  SOLO: 'Solo',
  TAB: 'Tab',
  INSTRUMENTAL: 'Instrumental',
  CUSTOM: 'Custom',
  REPEAT: 'Repetir',
};
