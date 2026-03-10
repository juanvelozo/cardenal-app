import { useEffect, useState, useCallback } from 'react';
import { useStore } from '@nanostores/react';
import {
  $document,
  $activeBlockId,
  $transposeSemitones,
  setDocument,
  setActiveBlock,
  updateBlockContent,
  updateBlockType,
  addBlockAfter,
  removeBlock,
  reorderBlocks,
} from '../infrastructure/stores/editor-state.store';
import { createDocument } from '../domain/entities/editor-document.entity';
import { loadDraft } from '../infrastructure/persistence/local-draft.adapter';
import { EditorToolbar } from './EditorToolbar';
import { BlockItem } from './BlockItem';

interface EditorContainerProps {
  draftId?: string;
}

export function EditorContainer({ draftId }: EditorContainerProps) {
  const doc = useStore($document);
  const activeBlockId = useStore($activeBlockId);
  const transposeSemitones = useStore($transposeSemitones);

  const [dragFromIndex, setDragFromIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  useEffect(() => {
    if (draftId) {
      const draft = loadDraft(draftId);
      if (draft) {
        setDocument(draft.document);
        return;
      }
    }
    setDocument(createDocument());
  }, [draftId]);

  const handleDragStart = useCallback((index: number) => {
    setDragFromIndex(index);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  }, []);

  const handleDrop = useCallback((toIndex: number) => {
    if (dragFromIndex !== null && dragFromIndex !== toIndex) {
      reorderBlocks(dragFromIndex, toIndex);
    }
    setDragFromIndex(null);
    setDragOverIndex(null);
  }, [dragFromIndex]);

  const handleDragEnd = useCallback(() => {
    setDragFromIndex(null);
    setDragOverIndex(null);
  }, []);

  return (
    <div onDragEnd={handleDragEnd}>
      <EditorToolbar />

      <div className="space-y-1">
        {doc.blocks.map((block, index) => (
          <BlockItem
            key={block.id}
            block={block}
            isActive={activeBlockId === block.id}
            transposeSemitones={transposeSemitones}
            onActivate={() => setActiveBlock(block.id)}
            onDeactivate={() => setActiveBlock(null)}
            onContentChange={(content) => updateBlockContent(block.id, content)}
            onTypeChange={(type) => updateBlockType(block.id, type)}
            onRemove={() => removeBlock(block.id)}
            onAddAfter={() => addBlockAfter(block.id)}
            canRemove={doc.blocks.length > 1}
            isDragOver={dragOverIndex === index}
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={() => setDragOverIndex(null)}
            onDrop={() => handleDrop(index)}
          />
        ))}
      </div>
    </div>
  );
}
