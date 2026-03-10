import { BLOCK_TYPES, BLOCK_TYPE_LABELS } from '../domain/value-objects/block-type.vo';
import type { BlockType } from '../domain/value-objects/block-type.vo';

interface BlockTypeSelectorProps {
  current: BlockType;
  onChange: (type: BlockType) => void;
}

export function BlockTypeSelector({ current, onChange }: BlockTypeSelectorProps) {
  return (
    <select
      value={current}
      onChange={(e) => onChange(e.target.value as BlockType)}
      className="text-xs font-accent bg-transparent text-ink-muted border border-paper-dark/30 rounded px-2 py-1 outline-none focus:border-cardinal/40 cursor-pointer"
    >
      {BLOCK_TYPES.filter((t) => t !== 'REPEAT').map((type) => (
        <option key={type} value={type}>
          {BLOCK_TYPE_LABELS[type]}
        </option>
      ))}
    </select>
  );
}
