import type { EditorDocument } from '../../domain/entities/editor-document.entity';

const DRAFTS_KEY = 'cardenal:drafts';
const CURRENT_DRAFT_KEY = 'cardenal:current-draft';

export interface StoredDraft {
  id: string;
  document: EditorDocument;
  savedAt: string;
}

function getDrafts(): StoredDraft[] {
  try {
    const raw = localStorage.getItem(DRAFTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setDrafts(drafts: StoredDraft[]) {
  localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
}

export function saveDraft(doc: EditorDocument): string {
  const drafts = getDrafts();
  const id = doc.songId || crypto.randomUUID();
  const existing = drafts.findIndex((d) => d.id === id);

  const draft: StoredDraft = {
    id,
    document: { ...doc, songId: id },
    savedAt: new Date().toISOString(),
  };

  if (existing !== -1) {
    drafts[existing] = draft;
  } else {
    drafts.push(draft);
  }

  setDrafts(drafts);
  localStorage.setItem(CURRENT_DRAFT_KEY, id);
  return id;
}

export function loadDraft(id: string): StoredDraft | null {
  const drafts = getDrafts();
  return drafts.find((d) => d.id === id) ?? null;
}

export function listDrafts(): StoredDraft[] {
  return getDrafts().sort(
    (a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime(),
  );
}

export function deleteDraft(id: string) {
  const drafts = getDrafts().filter((d) => d.id !== id);
  setDrafts(drafts);
}

export function getCurrentDraftId(): string | null {
  return localStorage.getItem(CURRENT_DRAFT_KEY);
}

export function setCurrentDraftId(id: string | null) {
  if (id) {
    localStorage.setItem(CURRENT_DRAFT_KEY, id);
  } else {
    localStorage.removeItem(CURRENT_DRAFT_KEY);
  }
}
