// utils/buildHTML.js
// Merges HTML, CSS, JS into a single document for iframe rendering

export function buildHTML(html, css, js) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    /* Reset */
    *, *::before, *::after { box-sizing: border-box; }
    body { margin: 0; font-family: system-ui, sans-serif; }
    /* User styles */
    ${css}
  </style>
</head>
<body>
  ${html}
  <script>
    // Intercept console methods and forward to parent
    (function() {
      const methods = ['log', 'warn', 'error', 'info'];
      methods.forEach(method => {
        const original = console[method].bind(console);
        console[method] = function(...args) {
          original(...args);
          try {
            const msg = args.map(a => {
              if (typeof a === 'object') {
                try { return JSON.stringify(a, null, 2); } catch(e) { return String(a); }
              }
              return String(a);
            }).join(' ');
            window.parent.postMessage({ type: 'console', method, msg }, '*');
          } catch(e) {}
        };
      });

      // Catch runtime errors
      window.addEventListener('error', (e) => {
        window.parent.postMessage({
          type: 'console',
          method: 'error',
          msg: e.message + (e.filename ? ' (line ' + e.lineno + ')' : '')
        }, '*');
      });

      // Catch unhandled promise rejections
      window.addEventListener('unhandledrejection', (e) => {
        window.parent.postMessage({
          type: 'console',
          method: 'error',
          msg: 'Unhandled promise rejection: ' + (e.reason?.message || e.reason)
        }, '*');
      });
    })();
  </script>
  <script>
    // User JS — wrapped in try/catch
    try {
      ${js}
    } catch(e) {
      window.parent.postMessage({ type: 'console', method: 'error', msg: e.message }, '*');
    }
  </script>
</body>
</html>`;
}
