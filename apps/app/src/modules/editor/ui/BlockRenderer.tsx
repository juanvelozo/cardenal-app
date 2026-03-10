import { ChordLine } from './ChordLine';

interface BlockRendererProps {
  content: string;
  transposeSemitones?: number;
}

export function BlockRenderer({ content, transposeSemitones = 0 }: BlockRendererProps) {
  const lines = content.split('\n');

  return (
    <div className="font-mono text-sm">
      {lines.map((line, i) => (
        <ChordLine key={i} raw={line} transposeSemitones={transposeSemitones} />
      ))}
    </div>
  );
}
