import { useStore } from '@nanostores/react';
import {
  $document,
  $transposeSemitones,
  updateMeta,
  transpose,
  resetTranspose,
} from '../infrastructure/stores/editor-state.store';

export function EditorToolbar() {
  const doc = useStore($document);
  const semitones = useStore($transposeSemitones);

  return (
    <div className="space-y-4 mb-8">
      {/* Song metadata */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          type="text"
          value={doc.title}
          onChange={(e) => updateMeta({ title: e.target.value })}
          placeholder="Titulo de la cancion"
          className="px-3 py-2 text-lg font-display font-bold bg-transparent border-b border-paper-dark/30 outline-none focus:border-cardinal/40 placeholder:text-ink-muted/40"
        />
        <input
          type="text"
          value={doc.artist}
          onChange={(e) => updateMeta({ artist: e.target.value })}
          placeholder="Artista"
          className="px-3 py-2 text-base bg-transparent border-b border-paper-dark/30 outline-none focus:border-cardinal/40 placeholder:text-ink-muted/40"
        />
      </div>

      {/* Song details + transpose */}
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          value={doc.key}
          onChange={(e) => updateMeta({ key: e.target.value })}
          placeholder="Tonalidad"
          className="w-20 px-2 py-1 text-sm bg-paper/50 border border-paper-dark/30 rounded outline-none focus:border-cardinal/40 placeholder:text-ink-muted/40"
        />
        <input
          type="number"
          value={doc.bpm ?? ''}
          onChange={(e) =>
            updateMeta({ bpm: e.target.value ? Number(e.target.value) : null })
          }
          placeholder="BPM"
          min={20}
          max={300}
          className="w-20 px-2 py-1 text-sm bg-paper/50 border border-paper-dark/30 rounded outline-none focus:border-cardinal/40 placeholder:text-ink-muted/40"
        />
        <select
          value={doc.timeSignature}
          onChange={(e) => updateMeta({ timeSignature: e.target.value })}
          className="px-2 py-1 text-sm bg-paper/50 border border-paper-dark/30 rounded outline-none focus:border-cardinal/40"
        >
          <option value="4/4">4/4</option>
          <option value="3/4">3/4</option>
          <option value="6/8">6/8</option>
          <option value="2/4">2/4</option>
        </select>

        {/* Transpose controls */}
        <div className="flex items-center gap-1 ml-auto">
          <button
            onClick={() => transpose(-1)}
            className="px-2 py-1 text-sm border border-paper-dark/30 rounded hover:bg-paper/50 transition-colors"
            title="Bajar medio tono"
          >
            -1
          </button>
          <span className="text-xs text-ink-muted min-w-[3ch] text-center">
            {semitones !== 0 ? (semitones > 0 ? `+${semitones}` : semitones) : '0'}
          </span>
          <button
            onClick={() => transpose(1)}
            className="px-2 py-1 text-sm border border-paper-dark/30 rounded hover:bg-paper/50 transition-colors"
            title="Subir medio tono"
          >
            +1
          </button>
          {semitones !== 0 && (
            <button
              onClick={resetTranspose}
              className="px-2 py-1 text-xs text-ink-muted hover:text-cardinal transition-colors"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
