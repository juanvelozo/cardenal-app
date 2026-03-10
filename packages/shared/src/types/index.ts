export type SongStatus = 'DRAFT' | 'SHARED' | 'PUBLISHED';

export type BlockType =
  | 'VERSE'
  | 'CHORUS'
  | 'BRIDGE'
  | 'INTRO'
  | 'OUTRO'
  | 'SOLO'
  | 'TAB'
  | 'INSTRUMENTAL'
  | 'CUSTOM'
  | 'REPEAT';

export type SuggestionStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED';

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}
