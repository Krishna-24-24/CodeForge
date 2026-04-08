// components/Preview.jsx
// Sandboxed iframe for live code rendering

export default function Preview({ srcDoc }) {
  return (
    <iframe
      className="preview-frame"
      srcDoc={srcDoc}
      sandbox="allow-scripts allow-modals"
      title="Live Preview"
      allow="none"
    />
  );
}
