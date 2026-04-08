// App.jsx — Root component
// Manages all state: code, theme, tabs, snippets, console logs

import { useState, useEffect, useCallback, useRef } from 'react';
import { buildHTML } from './utils/buildHTML.js';
import { TEMPLATES } from './utils/templates.js';
import { useLocalStorage } from './hooks/useLocalStorage.js';
import Editor from './components/Editor.jsx';
import Preview from './components/Preview.jsx';
import Toolbar from './components/Toolbar.jsx';
import ConsolePanel from './components/ConsolePanel.jsx';
import SnippetsPanel from './components/SnippetsPanel.jsx';
import Toast from './components/Toast.jsx';

// Default starter code (loads on first visit)
const DEFAULT = TEMPLATES[0];

export default function App() {
  // ─── Code state (persisted) ──────────────────────────────────
  const [htmlCode, setHtmlCode] = useLocalStorage('cf_html', DEFAULT.html);
  const [cssCode,  setCssCode]  = useLocalStorage('cf_css',  DEFAULT.css);
  const [jsCode,   setJsCode]   = useLocalStorage('cf_js',   DEFAULT.js);

  // ─── UI state ────────────────────────────────────────────────
  const [activeTab,     setActiveTab]     = useState('html');
  const [theme,         setTheme]         = useLocalStorage('cf_theme', 'dark');
  const [previewDoc,    setPreviewDoc]    = useState('');
  const [isLive,        setIsLive]        = useState(true);
  const [consoleLogs,   setConsoleLogs]   = useState([]);
  const [snippetsOpen,  setSnippetsOpen]  = useState(false);
  const [toast,         setToast]         = useState(null);
  const [snippets,      setSnippets]      = useLocalStorage('cf_snippets', {});

  // ─── Resize handle state ──────────────────────────────────────
  const [editorWidth, setEditorWidth] = useState(50); // percentage
  const isDragging = useRef(false);
  const mainRef = useRef(null);

  // ─── Live preview with debounce ───────────────────────────────
  // Advanced JS: useEffect + setTimeout + cleanup = debounce pattern
  useEffect(() => {
    setIsLive(false);
    const timer = setTimeout(() => {
      setPreviewDoc(buildHTML(htmlCode, cssCode, jsCode));
      setIsLive(true);
    }, 500);
    return () => clearTimeout(timer); // cleanup prevents stale updates
  }, [htmlCode, cssCode, jsCode]);

  // ─── Console message listener ─────────────────────────────────
  // Advanced JS: event listener on window for postMessage from iframe
  useEffect(() => {
    function handleMessage(event) {
      if (event.data?.type === 'console') {
        setConsoleLogs(prev => [...prev, {
          method: event.data.method,
          msg: event.data.msg,
          time: Date.now(),
        }]);
      }
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // ─── Resize handle logic ──────────────────────────────────────
  // Advanced JS: mousedown, mousemove, mouseup event flow
  const handleResizeMouseDown = useCallback((e) => {
    e.preventDefault();
    isDragging.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    function onMouseMove(e) {
      if (!isDragging.current || !mainRef.current) return;
      const rect = mainRef.current.getBoundingClientRect();
      const newPct = ((e.clientX - rect.left) / rect.width) * 100;
      // Clamp between 25% and 75%
      setEditorWidth(Math.min(75, Math.max(25, newPct)));
    }

    function onMouseUp() {
      isDragging.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, []);

  // ─── Get current code for active tab ─────────────────────────
  function getCurrentCode() {
    if (activeTab === 'html') return htmlCode;
    if (activeTab === 'css')  return cssCode;
    return jsCode;
  }

  function setCurrentCode(val) {
    if (activeTab === 'html') setHtmlCode(val);
    else if (activeTab === 'css') setCssCode(val);
    else setJsCode(val);
  }

  // ─── Actions ─────────────────────────────────────────────────

  function loadTemplate(template) {
    setHtmlCode(template.html);
    setCssCode(template.css);
    setJsCode(template.js);
    setConsoleLogs([]);
    showToast(`Template "${template.name}" loaded`);
  }

  function saveSnippet(name) {
    const updated = {
      ...snippets,
      [name]: {
        html: htmlCode,
        css: cssCode,
        js: jsCode,
        savedAt: new Date().toISOString(),
      }
    };
    setSnippets(updated);
    showToast(`"${name}" saved!`);
  }

  function loadSnippet(snippet) {
    setHtmlCode(snippet.html);
    setCssCode(snippet.css);
    setJsCode(snippet.js);
    setConsoleLogs([]);
    setSnippetsOpen(false);
    showToast('Snippet loaded');
  }

  function deleteSnippet(name) {
    const updated = { ...snippets };
    delete updated[name];
    setSnippets(updated);
    showToast(`"${name}" deleted`);
  }

  function downloadFile() {
    const doc = buildHTML(htmlCode, cssCode, jsCode);
    const blob = new Blob([doc], { type: 'text/html' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'codeforge-project.html';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Downloaded as HTML!');
  }

  function showToast(msg) {
    setToast(msg);
  }

  // ─── Line / char count ────────────────────────────────────────
  const lineCount = getCurrentCode().split('\n').length;
  const charCount = getCurrentCode().length;

  // ─── Render ───────────────────────────────────────────────────
  return (
    <div className={`app theme-${theme}`}>
      <Toolbar
        theme={theme}
        onThemeToggle={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
        onSave={saveSnippet}
        onLoadSnippet={loadTemplate}
        snippetsOpen={snippetsOpen}
        onSnippetsToggle={() => setSnippetsOpen(o => !o)}
        onDownload={downloadFile}
        isLive={isLive}
      />

      <div className="main-layout" ref={mainRef} style={{ position: 'relative' }}>

        {/* ── EDITOR SIDE ── */}
        <div className="editor-side" style={{ width: `${editorWidth}%` }}>

          {/* Tab Bar */}
          <div className="tab-bar">
            {['html', 'css', 'js'].map(tab => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? `active-${tab}` : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                <span className={`tab-dot tab-dot-${tab}`} />
                {tab.toUpperCase()}
              </button>
            ))}
            <div className="tab-bar-spacer" />
            <div className="tab-bar-info">
              <span>{lineCount} lines</span>
              <span>{charCount} chars</span>
            </div>
          </div>

          {/* CodeMirror Editor */}
          <div className="editor-wrap">
            <Editor
              key={activeTab}        // remount when tab switches
              activeTab={activeTab}
              code={getCurrentCode()}
              onChange={setCurrentCode}
              theme={theme}
            />
          </div>
        </div>

        {/* ── RESIZE HANDLE ── */}
        <div
          className="resize-handle"
          onMouseDown={handleResizeMouseDown}
        />

        {/* ── PREVIEW SIDE ── */}
        <div className="preview-side">

          {/* Browser-style header */}
          <div className="preview-header">
            <div className="preview-dots">
              <div className="preview-dot preview-dot-red" />
              <div className="preview-dot preview-dot-yellow" />
              <div className="preview-dot preview-dot-green" />
            </div>
            <div className="preview-url-bar">
              <span>🔒</span>
              <span>codeforge://preview</span>
            </div>
            <div className="preview-status" style={{ marginLeft: 'auto' }}>
              <div className={`status-dot ${isLive ? 'status-dot-live' : 'status-dot-loading'}`} />
              <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>
                {isLive ? 'Live' : 'Updating…'}
              </span>
            </div>
          </div>

          {/* iframe Preview */}
          <Preview srcDoc={previewDoc} />

          {/* Console Panel */}
          <ConsolePanel
            logs={consoleLogs}
            onClear={() => setConsoleLogs([])}
          />
        </div>

        {/* ── SNIPPETS SIDEBAR ── */}
        {snippetsOpen && (
          <SnippetsPanel
            snippets={snippets}
            onLoad={loadSnippet}
            onDelete={deleteSnippet}
            onClose={() => setSnippetsOpen(false)}
          />
        )}
      </div>

      {/* Toast notification */}
      {toast && (
        <Toast
          message={toast}
          onDone={() => setToast(null)}
        />
      )}
    </div>
  );
}
