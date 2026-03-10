import type { ParsedLine } from '../value-objects/parsed-line.vo';

const NOTES_SHARP = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const NOTES_FLAT = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

/**
 * Parses a chord string into root note and suffix.
 * "Am7" → { root: "A", suffix: "m7" }
 * "F#m" → { root: "F#", suffix: "m" }
 * "Bb"  → { root: "Bb", suffix: "" }
 */
function parseChord(chord: string): { root: string; suffix: string } | null {
  const match = chord.match(/^([A-G][#b]?)(.*)/);
  if (!match) return null;
  return { root: match[1], suffix: match[2] };
}

/**
 * Finds the index of a note in the chromatic scale.
 */
function noteIndex(note: string): number {
  let idx = NOTES_SHARP.indexOf(note);
  if (idx !== -1) return idx;
  idx = NOTES_FLAT.indexOf(note);
  return idx;
}

/**
 * Determines whether to use sharps or flats based on the original note.
 */
function useSharps(note: string): boolean {
  return note.includes('#') || !note.includes('b');
}

/**
 * Transposes a single chord by a number of semitones.
 * Positive = up, negative = down.
 */
export function transposeChord(chord: string, semitones: number): string {
  const parsed = parseChord(chord);
  if (!parsed) return chord;

  const idx = noteIndex(parsed.root);
  if (idx === -1) return chord;

  const newIdx = ((idx + semitones) % 12 + 12) % 12;
  const notes = useSharps(parsed.root) ? NOTES_SHARP : NOTES_FLAT;
  return notes[newIdx] + parsed.suffix;
}

/**
 * Transposes all chords in a parsed line by a number of semitones.
 */
export function transposeLine(line: ParsedLine, semitones: number): ParsedLine {
  return {
    text: line.text,
    chords: line.chords.map((cp) => ({
      ...cp,
      chord: transposeChord(cp.chord, semitones),
    })),
  };
}

/**
 * Transposes all chords in multiple parsed lines.
 */
export function transposeContent(lines: ParsedLine[], semitones: number): ParsedLine[] {
  return lines.map((line) => transposeLine(line, semitones));
}
