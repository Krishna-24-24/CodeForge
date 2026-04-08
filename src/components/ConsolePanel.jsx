// components/ConsolePanel.jsx
// Displays console.log output from the iframe

import { useEffect, useRef } from 'react';

const METHOD_ICON = {
  log:   '›',
  warn:  '⚠',
  error: '✕',
  info:  'ℹ',
};

export default function ConsolePanel({ logs, onClear }) {
  const bodyRef = useRef(null);

  // Auto-scroll to bottom on new logs
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="console-panel">
      <div className="console-header">
        <span className="console-title">Console</span>
        {logs.length > 0 && (
          <span className="console-count">{logs.length}</span>
        )}
        <div style={{ flex: 1 }} />
        {logs.length > 0 && (
          <button className="btn btn-ghost" style={{ fontSize: 11, padding: '2px 8px' }} onClick={onClear}>
            Clear
          </button>
        )}
      </div>

      <div className="console-body" ref={bodyRef}>
        {logs.length === 0 ? (
          <div className="console-empty">
            <span>›_</span>
            <span>console.log() output appears here</span>
          </div>
        ) : (
          logs.map((log, i) => (
            <div key={i} className={`console-line ${log.method}`}>
              <span className="console-icon">{METHOD_ICON[log.method] ?? '›'}</span>
              <span style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{log.msg}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
