import { useState } from 'react';
import type { EditorDocument } from '../domain/entities/editor-document.entity';
import { BlockRenderer } from './BlockRenderer';
import { BLOCK_TYPE_LABELS } from '../domain/value-objects/block-type.vo';

interface SongViewerProps {
  document: EditorDocument;
}

export function SongViewer({ document: doc }: SongViewerProps) {
  const [transposeSemitones, setTransposeSemitones] = useState(0);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-5xl font-bold text-ink mb-1">
          {doc.title || 'Sin titulo'}
        </h1>
        {doc.artist && (
          <p className="text-lg text-ink-light">{doc.artist}</p>
        )}
        <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-ink-muted">
          {doc.key && <span>Tonalidad: {doc.key}</span>}
          {doc.bpm && <span>BPM: {doc.bpm}</span>}
          {doc.timeSignature && <span>Compas: {doc.timeSignature}</span>}
        </div>
      </div>

      {/* Transpose bar */}
      <div className="flex items-center gap-2 mb-6 text-sm">
        <span className="text-ink-muted">Transponer:</span>
        <button
          onClick={() => setTransposeSemitones((s) => s - 1)}
          className="px-2 py-0.5 border border-paper-dark/30 rounded hover:bg-paper/50 transition-colors"
        >
          -1
        </button>
        <span className="min-w-[3ch] text-center text-ink-muted">
          {transposeSemitones !== 0
            ? transposeSemitones > 0
              ? `+${transposeSemitones}`
              : transposeSemitones
            : '0'}
        </span>
        <button
          onClick={() => setTransposeSemitones((s) => s + 1)}
          className="px-2 py-0.5 border border-paper-dark/30 rounded hover:bg-paper/50 transition-colors"
        >
          +1
        </button>
        {transposeSemitones !== 0 && (
          <button
            onClick={() => setTransposeSemitones(0)}
            className="px-2 py-0.5 text-xs text-ink-muted hover:text-cardinal transition-colors"
          >
            Reset
          </button>
        )}
      </div>

      {/* Blocks */}
      <div className="space-y-6">
        {doc.blocks.map((block) => (
          <div key={block.id}>
            <p className="text-xs font-medium text-ink-muted uppercase tracking-wider mb-1">
              {block.label || BLOCK_TYPE_LABELS[block.type]}
            </p>
            {block.content ? (
              <BlockRenderer
                content={block.content}
                transposeSemitones={transposeSemitones}
              />
            ) : (
              <p className="text-sm text-ink-muted/40 italic">Sin contenido</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
