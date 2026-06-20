import { useMemo } from 'react';

interface AntiScrapeTextProps {
  value: string;
}

export default function AntiScrapeText({ value }: AntiScrapeTextProps) {
  const elements = useMemo(() => {
    const chars = value.split('');
    
    // Create elements with their actual visual positions (1-indexed order)
    const items = chars.map((char, index) => ({
      char,
      order: index + 1,
      isDecoy: false,
      key: `real-${index}`,
    }));

    // Add deterministic decoys (so there is no hydration mismatch between server/client)
    const decoysCount = Math.min(3, Math.max(1, Math.floor(chars.length / 3)));
    const decoyChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '/', '-'];
    
    // Simple deterministic hash function based on the input value to seed our random selection
    let seed = 0;
    for (let i = 0; i < value.length; i++) {
      seed += value.charCodeAt(i);
    }
    
    const seededRandom = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    // Push decoys
    for (let i = 0; i < decoysCount; i++) {
      const randomDecoy = decoyChars[Math.floor(seededRandom() * decoyChars.length)];
      items.push({
        char: randomDecoy,
        order: 999, // Decoys are hidden, order doesn't matter visually
        isDecoy: true,
        key: `decoy-${i}`,
      });
    }

    // Shuffle using Fisher-Yates with seeded random
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(seededRandom() * (i + 1));
      const temp = items[i];
      items[i] = items[j];
      items[j] = temp;
    }

    return items;
  }, [value]);

  const handleCopy = (e: React.ClipboardEvent<HTMLSpanElement>) => {
    e.preventDefault();
    if (e.clipboardData) {
      e.clipboardData.setData('text/plain', '[Contenido protegido - Captura deshabilitada]');
    }
  };

  return (
    <span 
      className="inline-flex flex-row select-none" 
      style={{ cursor: 'default', userSelect: 'none' }}
      onCopy={handleCopy}
      aria-label="Contenido protegido contra copia"
    >
      {elements.map((item) => {
        if (item.isDecoy) {
          return (
            <span 
              key={item.key} 
              className="absolute opacity-0 pointer-events-none select-none"
              style={{ 
                width: 0, 
                height: 0, 
                overflow: 'hidden', 
                display: 'inline-block',
                fontSize: 0,
                lineHeight: 0
              }}
              aria-hidden="true"
            >
              {item.char}
            </span>
          );
        }
        return (
          <span 
            key={item.key} 
            style={{ order: item.order }}
            className="select-none pointer-events-none"
          >
            {item.char}
          </span>
        );
      })}
    </span>
  );
}
