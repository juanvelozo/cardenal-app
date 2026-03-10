import { useState, useEffect } from 'react';
import { loadDraft } from '../infrastructure/persistence/local-draft.adapter';
import type { EditorDocument } from '../domain/entities/editor-document.entity';
import { SongViewer } from './SongViewer';

interface SongViewerContainerProps {
  draftId: string;
}

export function SongViewerContainer({ draftId }: SongViewerContainerProps) {
  const [document, setDocument] = useState<EditorDocument | null>(null);

  useEffect(() => {
    const draft = loadDraft(draftId);
    if (draft) {
      setDocument(draft.document);
    }
  }, [draftId]);

  if (!document) {
    return (
      <div className="text-center py-16 text-ink-muted">
        <p className="font-display text-6xl text-cardinal/20 mb-4">&#9835;</p>
        <p className="text-sm">Cancion no encontrada</p>
        <a href="/" className="text-sm text-cardinal hover:underline mt-2 inline-block">
          Volver al inicio
        </a>
      </div>
    );
  }

  return (
    <div>
      <SongViewer document={document} />
      <div className="mt-8 flex gap-3">
        <a
          href={`/song/draft/${draftId}`}
          className="px-4 py-2 text-sm border border-paper-dark/30 rounded-lg hover:border-cardinal/30 transition-colors"
        >
          Editar
        </a>
        <a
          href="/"
          className="px-4 py-2 text-sm text-ink-muted hover:text-ink transition-colors"
        >
          Volver
        </a>
      </div>
    </div>
  );
}
