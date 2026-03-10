import { useRef, useEffect } from 'react';

interface BlockEditorProps {
  content: string;
  onChange: (content: string) => void;
  onBlur: () => void;
}

export function BlockEditor({ content, onChange, onBlur }: BlockEditorProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
      ref.current.selectionStart = ref.current.value.length;
      adjustHeight(ref.current);
    }
  }, []);

  function adjustHeight(el: HTMLTextAreaElement) {
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  }

  return (
    <textarea
      ref={ref}
      value={content}
      onChange={(e) => {
        onChange(e.target.value);
        adjustHeight(e.target);
      }}
      onBlur={onBlur}
      placeholder="Escribi la letra con acordes: Pal[G]abra del al[Am]ma..."
      className="w-full resize-none bg-transparent font-mono text-sm text-ink leading-relaxed outline-none placeholder:text-ink-muted/40"
      rows={1}
    />
  );
}
