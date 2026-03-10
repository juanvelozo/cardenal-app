import type { ChordPosition } from './chord-position.vo';

export interface ParsedLine {
  text: string;
  chords: ChordPosition[];
}
