// components/Toast.jsx
// Animated notification toast

import { useEffect, useState } from 'react';

export default function Toast({ message, onDone }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(onDone, 200);
    }, 2200);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className={`toast ${exiting ? 'toast-out' : ''}`}>
      <span>✓</span>
      <span>{message}</span>
    </div>
  );
}
