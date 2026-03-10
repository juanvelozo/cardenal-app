import type { ChordPosition } from '../value-objects/chord-position.vo';
import type { ParsedLine } from '../value-objects/parsed-line.vo';

/**
 * Parses a raw line with inline chord syntax into text + chord positions.
 *
 * Input:  "Hoy es[G] un buen dí[Am]a para can[C]tar"
 * Output: { text: "Hoy es un buen día para cantar",
 *           chords: [{ chord: "G", position: 6 },
 *                    { chord: "Am", position: 17 },
 *                    { chord: "C", position: 25 }] }
 */
export function parseLine(raw: string): ParsedLine {
  const chords: ChordPosition[] = [];
  let text = '';
  let i = 0;

  while (i < raw.length) {
    if (raw[i] === '[') {
      const close = raw.indexOf(']', i);
      if (close !== -1) {
        chords.push({ chord: raw.slice(i + 1, close), position: text.length });
        i = close + 1;
        continue;
      }
    }
    text += raw[i];
    i++;
  }

  return { text, chords };
}

/**
 * Parses a multi-line raw string into an array of parsed lines.
 */
export function parseContent(raw: string): ParsedLine[] {
  return raw.split('\n').map(parseLine);
}
