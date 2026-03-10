import { useEffect } from 'react';
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

  return (
    <div>
      <EditorToolbar />

      <div className="space-y-1">
        {doc.blocks.map((block) => (
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
          />
        ))}
      </div>
    </div>
  );
}
