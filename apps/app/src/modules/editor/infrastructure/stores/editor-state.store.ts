import { atom, computed } from 'nanostores';
import type { EditorDocument } from '../../domain/entities/editor-document.entity';
import type { EditorBlock } from '../../domain/entities/editor-block.entity';
import { createDocument } from '../../domain/entities/editor-document.entity';
import { createBlock } from '../../domain/entities/editor-block.entity';
import type { BlockType } from '../../domain/value-objects/block-type.vo';

export const $document = atom<EditorDocument>(createDocument());
export const $activeBlockId = atom<string | null>(null);
export const $transposeSemitones = atom<number>(0);

export const $blocks = computed($document, (doc) => doc.blocks);

export function setDocument(doc: EditorDocument) {
  $document.set(doc);
  $transposeSemitones.set(0);
}

export function updateMeta(meta: Partial<Pick<EditorDocument, 'title' | 'artist' | 'key' | 'bpm' | 'timeSignature'>>) {
  $document.set({ ...$document.get(), ...meta });
}

export function setActiveBlock(blockId: string | null) {
  $activeBlockId.set(blockId);
}

export function updateBlockContent(blockId: string, content: string) {
  const doc = $document.get();
  $document.set({
    ...doc,
    blocks: doc.blocks.map((b) =>
      b.id === blockId ? { ...b, content } : b,
    ),
  });
}

export function updateBlockType(blockId: string, type: BlockType) {
  const doc = $document.get();
  $document.set({
    ...doc,
    blocks: doc.blocks.map((b) =>
      b.id === blockId ? { ...b, type } : b,
    ),
  });
}

export function updateBlockLabel(blockId: string, label: string | null) {
  const doc = $document.get();
  $document.set({
    ...doc,
    blocks: doc.blocks.map((b) =>
      b.id === blockId ? { ...b, label } : b,
    ),
  });
}

export function addBlockAfter(afterBlockId: string) {
  const doc = $document.get();
  const idx = doc.blocks.findIndex((b) => b.id === afterBlockId);
  const newOrder = idx !== -1 ? doc.blocks[idx].order + 1 : doc.blocks.length;
  const newBlock = createBlock({ order: newOrder });

  const blocks = [...doc.blocks];
  blocks.splice(idx + 1, 0, newBlock);

  // Reorder
  const reordered = blocks.map((b, i) => ({ ...b, order: i }));

  $document.set({ ...doc, blocks: reordered });
  $activeBlockId.set(newBlock.id);
}

export function removeBlock(blockId: string) {
  const doc = $document.get();
  if (doc.blocks.length <= 1) return;

  const blocks = doc.blocks
    .filter((b) => b.id !== blockId)
    .map((b, i) => ({ ...b, order: i }));

  $document.set({ ...doc, blocks });

  if ($activeBlockId.get() === blockId) {
    $activeBlockId.set(null);
  }
}

export function reorderBlocks(fromIndex: number, toIndex: number) {
  const doc = $document.get();
  const blocks = [...doc.blocks];
  const [moved] = blocks.splice(fromIndex, 1);
  blocks.splice(toIndex, 0, moved);

  const reordered = blocks.map((b, i) => ({ ...b, order: i }));
  $document.set({ ...doc, blocks: reordered });
}

export function transpose(semitones: number) {
  $transposeSemitones.set($transposeSemitones.get() + semitones);
}

export function resetTranspose() {
  $transposeSemitones.set(0);
}
