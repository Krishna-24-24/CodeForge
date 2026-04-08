// components/SnippetsPanel.jsx
// Sidebar showing all saved snippets

export default function SnippetsPanel({ snippets, onLoad, onDelete, onClose }) {
  const keys = Object.keys(snippets).reverse(); // newest first

  return (
    <div className="snippets-panel">
      <div className="snippets-header">
        <h3>Saved Snippets</h3>
        <button className="btn btn-icon" onClick={onClose} title="Close">✕</button>
      </div>

      <div className="snippets-list">
        {keys.length === 0 ? (
          <div className="snippets-empty">
            <span className="snippets-empty-icon">💾</span>
            <span>No saved snippets yet.</span>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Click Save in the toolbar to save your work.</span>
          </div>
        ) : (
          keys.map(name => {
            const snippet = snippets[name];
            const date = snippet.savedAt
              ? new Date(snippet.savedAt).toLocaleDateString()
              : '';
            return (
              <div key={name} className="snippet-item">
                <div className="snippet-name">{name}</div>
                {date && <div className="snippet-date">{date}</div>}
                <div className="snippet-actions">
                  <button
                    className="snippet-btn"
                    onClick={() => onLoad(snippet)}
                  >
                    Load
                  </button>
                  <button
                    className="snippet-btn snippet-btn-delete"
                    onClick={() => onDelete(name)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
