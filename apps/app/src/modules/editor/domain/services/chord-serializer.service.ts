import type { ParsedLine } from '../value-objects/parsed-line.vo';

/**
 * Serializes a parsed line back to inline chord syntax.
 *
 * Input:  { text: "Hoy es un buen día", chords: [{ chord: "G", position: 6 }] }
 * Output: "Hoy es[G] un buen día"
 */
export function serializeLine(parsed: ParsedLine): string {
  if (parsed.chords.length === 0) return parsed.text;

  const sorted = [...parsed.chords].sort((a, b) => a.position - b.position);
  let result = '';
  let lastPos = 0;

  for (const { chord, position } of sorted) {
    result += parsed.text.slice(lastPos, position);
    result += `[${chord}]`;
    lastPos = position;
  }

  result += parsed.text.slice(lastPos);
  return result;
}

/**
 * Serializes multiple parsed lines back to a raw string.
 */
export function serializeContent(lines: ParsedLine[]): string {
  return lines.map(serializeLine).join('\n');
}
