import type { EditorBlock } from './editor-block.entity';
import { createBlock } from './editor-block.entity';

export interface EditorDocument {
  songId: string | null;
  title: string;
  artist: string;
  key: string;
  bpm: number | null;
  timeSignature: string;
  blocks: EditorBlock[];
}

export function createDocument(
  partial?: Partial<EditorDocument>,
): EditorDocument {
  return {
    songId: null,
    title: '',
    artist: '',
    key: '',
    bpm: null,
    timeSignature: '4/4',
    blocks: [createBlock({ order: 0 })],
    ...partial,
  };
}
