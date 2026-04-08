// components/Toolbar.jsx
// Top navigation bar with all actions

import { useState, useRef, useEffect } from 'react';
import { TEMPLATES } from '../utils/templates.js';

export default function Toolbar({
  theme, onThemeToggle,
  onSave, onLoadSnippet,
  snippetsOpen, onSnippetsToggle,
  onDownload, onRun,
  isLive,
}) {
  const [templateOpen, setTemplateOpen] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);
  const [saveName, setSaveName] = useState('');
  const menuRef = useRef(null);
  const inputRef = useRef(null);

  // Close template menu on outside click
  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setTemplateOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Focus save input when modal opens
  useEffect(() => {
    if (saveOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [saveOpen]);

  function handleSave() {
    const name = saveName.trim();
    if (!name) return;
    onSave(name);
    setSaveName('');
    setSaveOpen(false);
  }

  return (
    <>
      <div className="toolbar">
        {/* Logo */}
        <div className="toolbar-logo">
          <div className="logo-icon">⚡</div>
          <span className="logo-text">CodeForge</span>
          <span className="logo-badge">LIVE</span>
        </div>

        <div className="toolbar-divider" />

        {/* Templates */}
        <div className="template-dropdown" ref={menuRef}>
          <button
            className="btn btn-ghost"
            onClick={() => setTemplateOpen(o => !o)}
            title="Load a starter template"
          >
            <span>📋</span>
            <span>Templates</span>
          </button>

          {templateOpen && (
            <div className="template-menu">
              {TEMPLATES.map(t => (
                <div
                  key={t.id}
                  className="template-item"
                  onClick={() => {
                    onLoadSnippet(t);
                    setTemplateOpen(false);
                  }}
                >
                  <span className="template-item-icon">{t.icon}</span>
                  <div>
                    <div className="template-item-name">{t.name}</div>
                    <div className="template-item-desc">{t.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="toolbar-spacer" />

        {/* Status indicator */}
        <div className="preview-status" style={{ color: 'var(--text-muted)', fontSize: 12 }}>
          <div className={`status-dot ${isLive ? 'status-dot-live' : 'status-dot-loading'}`} />
          <span>{isLive ? 'Live' : 'Updating…'}</span>
        </div>

        <div className="toolbar-divider" />

        {/* Snippets */}
        <button
          className={`btn btn-ghost ${snippetsOpen ? 'btn-outline' : ''}`}
          onClick={onSnippetsToggle}
          title="Saved snippets"
        >
          <span>💾</span>
          <span>Snippets</span>
        </button>

        {/* Save */}
        <button
          className="btn btn-outline"
          onClick={() => setSaveOpen(true)}
          title="Save current code"
        >
          <span>＋</span>
          <span>Save</span>
        </button>

        {/* Download */}
        <button
          className="btn btn-outline"
          onClick={onDownload}
          title="Download as HTML file"
        >
          <span>⬇</span>
        </button>

        {/* Theme Toggle */}
        <button
          className="btn btn-icon"
          onClick={onThemeToggle}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>

      {/* Save Modal */}
      {saveOpen && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setSaveOpen(false)}>
          <div className="modal">
            <h3>Save Snippet</h3>
            <input
              ref={inputRef}
              className="modal-input"
              placeholder="Give it a name…"
              value={saveName}
              onChange={e => setSaveName(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleSave();
                if (e.key === 'Escape') setSaveOpen(false);
              }}
            />
            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={() => setSaveOpen(false)}>Cancel</button>
              <button className="btn btn-accent" onClick={handleSave} disabled={!saveName.trim()}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
