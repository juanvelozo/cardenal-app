import { useState, useEffect } from 'react';
import { listDrafts, deleteDraft } from '../infrastructure/persistence/local-draft.adapter';
import type { StoredDraft } from '../infrastructure/persistence/local-draft.adapter';

export function DraftList() {
  const [drafts, setDrafts] = useState<StoredDraft[]>([]);

  useEffect(() => {
    setDrafts(listDrafts());
  }, []);

  function handleDelete(id: string) {
    deleteDraft(id);
    setDrafts(listDrafts());
  }

  if (drafts.length === 0) {
    return (
      <div className="text-center py-16 text-ink-muted">
        <p className="font-display text-6xl text-cardinal/20 mb-4">&#9835;</p>
        <p className="text-sm">Todavia no hay canciones. Crea una nueva para empezar.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-display text-3xl font-bold text-ink mb-4">Tus borradores</h2>
      <div className="space-y-2">
        {drafts.map((draft) => (
          <div
            key={draft.id}
            className="flex items-center gap-4 p-4 rounded-xl border border-paper-dark/20 hover:border-paper-dark/40 transition-colors"
          >
            <a
              href={`/song/draft/${draft.id}`}
              className="flex-1 min-w-0"
            >
              <h3 className="font-accent text-lg text-ink truncate">
                {draft.document.title || 'Sin titulo'}
              </h3>
              <p className="text-xs text-ink-muted">
                {draft.document.artist || 'Sin artista'}
                {' — '}
                {new Date(draft.savedAt).toLocaleDateString('es-AR', {
                  day: 'numeric',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </a>
            <a
              href={`/song/${draft.id}`}
              className="text-xs text-ink-muted hover:text-cardinal transition-colors px-2 py-1"
              title="Ver cancion"
            >
              Ver
            </a>
            <button
              onClick={() => handleDelete(draft.id)}
              className="text-xs text-ink-muted hover:text-cardinal transition-colors px-2 py-1"
              title="Eliminar borrador"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
