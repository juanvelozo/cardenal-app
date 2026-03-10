import { parseLine } from '../domain/services/chord-parser.service';
import { transposeLine } from '../domain/services/transpose.service';

interface ChordLineProps {
  raw: string;
  transposeSemitones?: number;
}

export function ChordLine({ raw, transposeSemitones = 0 }: ChordLineProps) {
  let parsed = parseLine(raw);

  if (transposeSemitones !== 0) {
    parsed = transposeLine(parsed, transposeSemitones);
  }

  if (parsed.chords.length === 0) {
    return <div className="leading-relaxed whitespace-pre-wrap">{parsed.text}</div>;
  }

  const segments: React.ReactNode[] = [];
  let lastPos = 0;

  for (let i = 0; i < parsed.chords.length; i++) {
    const { chord, position } = parsed.chords[i];

    // Text before the chord
    if (position > lastPos) {
      segments.push(
        <span key={`t-${i}`}>{parsed.text.slice(lastPos, position)}</span>,
      );
    }

    // Character under the chord with the chord floating above
    const charUnder = parsed.text[position] || '';

    segments.push(
      <span key={`c-${i}`} className="relative">
        <span className="absolute bottom-full left-0 text-cardinal text-xs font-bold font-mono whitespace-nowrap">
          {chord}
        </span>
        {charUnder}
      </span>,
    );

    lastPos = position + (charUnder ? 1 : 0);
  }

  // Remaining text
  if (lastPos < parsed.text.length) {
    segments.push(<span key="rest">{parsed.text.slice(lastPos)}</span>);
  }

  return <div className="leading-relaxed whitespace-pre-wrap pt-4">{segments}</div>;
}
