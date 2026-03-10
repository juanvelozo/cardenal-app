import { useStore } from '@nanostores/react';
import {
  $document,
  $activeBlockId,
  $transposeSemitones,
  setActiveBlock,
  updateBlockContent,
  updateBlockType,
  addBlockAfter,
  removeBlock,
} from '../infrastructure/stores/editor-state.store';
import { EditorToolbar } from './EditorToolbar';
import { BlockItem } from './BlockItem';

export function EditorContainer() {
  const doc = useStore($document);
  const activeBlockId = useStore($activeBlockId);
  const transposeSemitones = useStore($transposeSemitones);

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
