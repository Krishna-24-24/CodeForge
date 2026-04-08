// components/Editor.jsx
// CodeMirror 6 editor with syntax highlighting for HTML/CSS/JS

import { useEffect, useRef } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';

// Minimal light theme
import { EditorView as EV } from '@codemirror/view';
const lightTheme = EV.theme({
  '&': { background: 'var(--bg-editor)', color: 'var(--text-code)' },
  '.cm-content': { caretColor: 'var(--accent)' },
  '.cm-cursor': { borderLeftColor: 'var(--accent)' },
  '.cm-gutters': { background: '#f5f4fd', borderRight: '1px solid var(--border)', color: 'var(--text-muted)' },
  '.cm-activeLineGutter': { background: 'rgba(109,84,243,0.06)' },
  '.cm-activeLine': { background: 'rgba(109,84,243,0.04)' },
  '.cm-selectionBackground, ::selection': { background: 'rgba(109,84,243,0.15) !important' },
});

const langMap = { html, css, js: javascript };

export default function Editor({ activeTab, code, onChange, theme }) {
  const editorRef = useRef(null);
  const viewRef   = useRef(null);

  useEffect(() => {
    if (!editorRef.current) return;

    // Destroy previous instance if tab switched
    if (viewRef.current) {
      viewRef.current.destroy();
      viewRef.current = null;
    }

    const langExt = langMap[activeTab]?.() ?? [];

    const state = EditorState.create({
      doc: code,
      extensions: [
        basicSetup,
        langExt,
        theme === 'dark' ? oneDark : lightTheme,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onChange(update.state.doc.toString());
          }
        }),
        EditorView.theme({
          '&': { height: '100%', fontFamily: 'var(--font-code, "JetBrains Mono", monospace)' },
          '.cm-scroller': { overflow: 'auto', fontFamily: 'inherit' },
        }),
      ],
    });

    const view = new EditorView({ state, parent: editorRef.current });
    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
    // We intentionally only re-create when tab or theme changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, theme]);

  // Sync external code changes without re-creating the editor
  // (avoids cursor jump when debounced updates come in)
  useEffect(() => {
    if (!viewRef.current) return;
    const current = viewRef.current.state.doc.toString();
    if (current !== code) {
      viewRef.current.dispatch({
        changes: { from: 0, to: current.length, insert: code },
      });
    }
    // Only run when `code` prop changes from outside
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={editorRef}
      className="cm-editor-container"
      style={{ height: '100%', overflow: 'hidden' }}
    />
  );
}
