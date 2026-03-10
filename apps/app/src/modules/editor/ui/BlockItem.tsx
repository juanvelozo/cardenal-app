import { useState } from 'react';
import type { EditorBlock } from '../domain/entities/editor-block.entity';
import { BlockRenderer } from './BlockRenderer';
import { BlockEditor } from './BlockEditor';
import { BlockTypeSelector } from './BlockTypeSelector';
import { BLOCK_TYPE_LABELS } from '../domain/value-objects/block-type.vo';
import type { BlockType } from '../domain/value-objects/block-type.vo';

interface BlockItemProps {
  block: EditorBlock;
  isActive: boolean;
  transposeSemitones: number;
  onActivate: () => void;
  onDeactivate: () => void;
  onContentChange: (content: string) => void;
  onTypeChange: (type: BlockType) => void;
  onRemove: () => void;
  onAddAfter: () => void;
  canRemove: boolean;
  isDragOver: boolean;
  onDragStart: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: () => void;
}

export function BlockItem({
  block,
  isActive,
  transposeSemitones,
  onActivate,
  onDeactivate,
  onContentChange,
  onTypeChange,
  onRemove,
  onAddAfter,
  canRemove,
  isDragOver,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
}: BlockItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative ${isDragOver ? 'border-t-2 border-cardinal' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {/* Block header */}
      <div className="flex items-center gap-2 mb-1">
        <span
          draggable
          onDragStart={onDragStart}
          className="cursor-grab active:cursor-grabbing text-ink-muted/40 hover:text-ink-muted select-none"
          title="Arrastrar para reordenar"
        >
          ⠿
        </span>
        <BlockTypeSelector current={block.type} onChange={onTypeChange} />
        {block.label && (
          <span className="text-xs text-ink-muted">{block.label}</span>
        )}
        {!block.label && (
          <span className="text-xs text-ink-muted/40">
            {BLOCK_TYPE_LABELS[block.type]}
          </span>
        )}

        {/* Actions */}
        {(isHovered || isActive) && (
          <div className="ml-auto flex items-center gap-1">
            {canRemove && (
              <button
                onClick={onRemove}
                className="text-xs text-ink-muted hover:text-cardinal transition-colors px-1"
                title="Eliminar bloque"
              >
                &times;
              </button>
            )}
          </div>
        )}
      </div>

      {/* Block content */}
      <div
        className={`rounded-lg border transition-colors p-3 min-h-[3rem] ${
          isActive
            ? 'border-cardinal/30 bg-cream'
            : 'border-paper-dark/20 bg-paper/30 cursor-pointer hover:border-paper-dark/40'
        }`}
        onClick={!isActive ? onActivate : undefined}
      >
        {isActive ? (
          <BlockEditor
            content={block.content}
            onChange={onContentChange}
            onBlur={onDeactivate}
          />
        ) : block.content ? (
          <BlockRenderer
            content={block.content}
            transposeSemitones={transposeSemitones}
          />
        ) : (
          <p className="text-sm text-ink-muted/40 font-mono">
            Click para escribir...
          </p>
        )}
      </div>

      {/* Add block button */}
      <div className="flex justify-center py-2">
        <button
          onClick={onAddAfter}
          className="flex items-center gap-1 px-3 py-1 text-sm text-ink-muted border border-dashed border-paper-dark/40 rounded-lg hover:border-cardinal/40 hover:text-cardinal transition-colors"
          title="Agregar bloque"
        >
          <span className="text-base leading-none">+</span>
          <span className="text-xs">Agregar bloque</span>
        </button>
      </div>
    </div>
  );
}
