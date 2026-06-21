import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LINES = [
  [{ t: 'const ', c: '#cba6f7' }, { t: 'developer', c: '#89b4fa' }, { t: ' = {', c: '#cdd6f4' }],
  [{ t: '  name', c: '#f38ba8' }, { t: ': ', c: '#cdd6f4' }, { t: '"Parth Shikhare"', c: '#a6e3a1' }, { t: ',', c: '#cdd6f4' }],
  [{ t: '  role', c: '#f38ba8' }, { t: ': ', c: '#cdd6f4' }, { t: '"Full Stack Developer"', c: '#a6e3a1' }, { t: ',', c: '#cdd6f4' }],
  [{ t: '  stack', c: '#f38ba8' }, { t: ': [', c: '#cdd6f4' }],
  [{ t: '    ', c: '#cdd6f4' }, { t: '"React"', c: '#a6e3a1' }, { t: ', ', c: '#cdd6f4' }, { t: '"Node.js"', c: '#a6e3a1' }, { t: ', ', c: '#cdd6f4' }, { t: '"Python"', c: '#a6e3a1' }, { t: ',', c: '#cdd6f4' }],
  [{ t: '    ', c: '#cdd6f4' }, { t: '"Django"', c: '#a6e3a1' }, { t: ', ', c: '#cdd6f4' }, { t: '"MongoDB"', c: '#a6e3a1' }, { t: ', ', c: '#cdd6f4' }, { t: '"MySQL"', c: '#a6e3a1' }],
  [{ t: '  ],', c: '#cdd6f4' }],
  [{ t: '  passion', c: '#f38ba8' }, { t: ': ', c: '#cdd6f4' }, { t: '"Building amazing things 🚀"', c: '#a6e3a1' }, { t: ',', c: '#cdd6f4' }],
  [{ t: '  openToWork', c: '#f38ba8' }, { t: ': ', c: '#cdd6f4' }, { t: 'true', c: '#cba6f7' }],
  [{ t: '};', c: '#cdd6f4' }],
  [],
  [{ t: 'console', c: '#89b4fa' }, { t: '.', c: '#cdd6f4' }, { t: 'log', c: '#89b4fa' }, { t: '(', c: '#fab387' }, { t: 'developer', c: '#89b4fa' }, { t: '.', c: '#cdd6f4' }, { t: 'passion', c: '#f38ba8' }, { t: ');', c: '#fab387' }],
  [],
  [{ t: '// Output: ', c: '#6c7086' }, { t: '"Building amazing things 🚀"', c: '#a6e3a1' }],
];

const LINE_DELAY_MS = 200;
const RESET_PAUSE_MS = 3500;

export default function CodeTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [cycling, setCycling] = useState(false);

  useEffect(() => {
    if (cycling) return;

    if (visibleLines >= LINES.length) {
      setCycling(true);
      const t = setTimeout(() => {
        setVisibleLines(0);
        setCycling(false);
      }, RESET_PAUSE_MS);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => setVisibleLines(v => v + 1), LINE_DELAY_MS);
    return () => clearTimeout(t);
  }, [visibleLines, cycling]);

  const showCursor = !cycling && visibleLines < LINES.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-lg mx-auto select-none"
    >
      <div
        className="rounded-xl overflow-hidden shadow-2xl border border-slate-700/40"
        style={{ background: '#1e1e2e' }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-2 px-4 py-3 border-b border-slate-700/40"
          style={{ background: '#181825' }}
        >
          <span className="w-3 h-3 rounded-full bg-[#f38ba8] block" />
          <span className="w-3 h-3 rounded-full bg-[#f9e2af] block" />
          <span className="w-3 h-3 rounded-full bg-[#a6e3a1] block" />
          <span className="ml-3 text-xs text-slate-500 font-mono tracking-wide">portfolio.js</span>
        </div>

        {/* Code body */}
        <div className="px-4 py-5 font-mono text-sm leading-7 min-h-[360px]">
          {LINES.slice(0, visibleLines).map((tokens, lineIdx) => (
            <div key={lineIdx} className="flex gap-4">
              <span className="shrink-0 w-5 text-right text-xs pt-[3px] text-slate-600" style={{ minWidth: '1.25rem' }}>
                {lineIdx + 1}
              </span>
              <span>
                {tokens.map((tok, i) => (
                  <span key={i} style={{ color: tok.c }}>{tok.t}</span>
                ))}
              </span>
            </div>
          ))}

          {showCursor && (
            <div className="flex gap-4">
              <span className="shrink-0 w-5 text-right text-xs pt-[3px] text-slate-600" style={{ minWidth: '1.25rem' }}>
                {visibleLines + 1}
              </span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
                className="inline-block w-[2px] h-5 align-middle rounded-sm"
                style={{ background: '#cba6f7', marginTop: '3px' }}
              />
            </div>
          )}
        </div>

        {/* Status bar */}
        <div
          className="flex items-center justify-between px-4 py-1.5 text-xs font-mono"
          style={{ background: '#89b4fa', color: '#1e1e2e' }}
        >
          <span className="font-semibold">JavaScript</span>
          <span>Ln {Math.min(visibleLines, LINES.length)}&nbsp;&nbsp;Col 1</span>
        </div>
      </div>
    </motion.div>
  );
}
