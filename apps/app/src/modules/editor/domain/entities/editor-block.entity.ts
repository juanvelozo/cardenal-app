import type { BlockType } from '../value-objects/block-type.vo';

export interface EditorBlock {
  id: string;
  type: BlockType;
  label: string | null;
  content: string;
  order: number;
  refBlockId: string | null;
}

export function createBlock(
  partial: Partial<EditorBlock> & { order: number },
): EditorBlock {
  return {
    id: crypto.randomUUID(),
    type: 'VERSE',
    label: null,
    content: '',
    refBlockId: null,
    ...partial,
  };
}
