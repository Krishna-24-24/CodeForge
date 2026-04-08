// utils/templates.js
// Starter templates for the playground

export const TEMPLATES = [
  {
    id: 'blank',
    name: 'Blank',
    icon: '📄',
    desc: 'Start from scratch',
    html: `<!-- Start coding here -->
<h1>Hello, World!</h1>
<p>Edit HTML, CSS, and JS to see live changes.</p>`,
    css: `body {
  font-family: system-ui, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 0;
  background: #f8f9fa;
  color: #333;
}

h1 {
  color: #7c6dfa;
}`,
    js: `console.log('CodeForge is ready! 🚀');`,
  },

  {
    id: 'counter',
    name: 'Counter',
    icon: '🔢',
    desc: 'Interactive counter',
    html: `<div class="container">
  <h1>Counter</h1>
  <div class="counter-display">
    <span id="count">0</span>
  </div>
  <div class="buttons">
    <button id="dec">−</button>
    <button id="reset">Reset</button>
    <button id="inc">+</button>
  </div>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: system-ui, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
}

.container {
  text-align: center;
  color: white;
}

h1 {
  font-size: 1.2rem;
  letter-spacing: 4px;
  text-transform: uppercase;
  opacity: 0.6;
  margin-bottom: 20px;
}

.counter-display {
  font-size: 8rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  margin-bottom: 30px;
  line-height: 1;
  background: linear-gradient(135deg, #a78bfa, #7c3aed);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: transform 0.1s ease;
}

.buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
}

button {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.2);
  background: rgba(255,255,255,0.1);
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.15s ease;
  backdrop-filter: blur(10px);
}

button:hover {
  background: rgba(124, 109, 250, 0.4);
  border-color: rgba(124, 109, 250, 0.6);
  transform: scale(1.1);
}

button:active { transform: scale(0.95); }

#reset {
  width: auto;
  padding: 0 20px;
  border-radius: 30px;
  font-size: 0.85rem;
  letter-spacing: 1px;
}`,
    js: `let count = 0;
const display = document.getElementById('count');
const incBtn = document.getElementById('inc');
const decBtn = document.getElementById('dec');
const resetBtn = document.getElementById('reset');

function updateDisplay(newCount) {
  count = newCount;
  display.textContent = count;
  display.parentElement.style.transform = 'scale(1.05)';
  setTimeout(() => display.parentElement.style.transform = '', 100);
  display.style.background = count > 0
    ? 'linear-gradient(135deg, #4ade80, #22c55e)'
    : count < 0
    ? 'linear-gradient(135deg, #f87171, #ef4444)'
    : 'linear-gradient(135deg, #a78bfa, #7c3aed)';
  display.style.webkitBackgroundClip = 'text';
  display.style.webkitTextFillColor = 'transparent';
}

incBtn.addEventListener('click', () => updateDisplay(count + 1));
decBtn.addEventListener('click', () => updateDisplay(count - 1));
resetBtn.addEventListener('click', () => updateDisplay(0));

console.log('Counter ready!');`,
  },

  {
    id: 'todo',
    name: 'Todo App',
    icon: '✅',
    desc: 'Full todo list',
    html: `<div class="app">
  <header>
    <h1>My Tasks</h1>
    <span id="count-badge">0 left</span>
  </header>

  <div class="input-row">
    <input type="text" id="task-input" placeholder="Add a new task..." />
    <button id="add-btn">Add</button>
  </div>

  <ul id="task-list"></ul>

  <footer>
    <button id="clear-btn">Clear completed</button>
  </footer>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: system-ui, sans-serif;
  background: #f0f0f5;
  min-height: 100vh;
  padding: 40px 16px;
}

.app {
  max-width: 480px;
  margin: 0 auto;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
}

header {
  background: linear-gradient(135deg, #7c3aed, #4f46e5);
  padding: 24px 24px 20px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

h1 { font-size: 1.5rem; font-weight: 700; }

#count-badge {
  background: rgba(255,255,255,0.2);
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.input-row {
  display: flex;
  gap: 10px;
  padding: 20px 24px 16px;
  border-bottom: 1px solid #f0f0f0;
}

input {
  flex: 1;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.15s;
}

input:focus { border-color: #7c3aed; }

#add-btn {
  background: #7c3aed;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}

#add-btn:hover { background: #6d28d9; transform: translateY(-1px); }

#task-list { list-style: none; min-height: 60px; }

.task-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 24px;
  border-bottom: 1px solid #f5f5f5;
  animation: slideIn 0.2s ease;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateX(-10px); }
  to { opacity: 1; transform: translateX(0); }
}

.task-item.done .task-text {
  text-decoration: line-through;
  opacity: 0.4;
}

.task-check {
  width: 20px;
  height: 20px;
  border: 2px solid #d1d5db;
  border-radius: 50%;
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
}

.task-check.checked {
  background: #7c3aed;
  border-color: #7c3aed;
  color: white;
}

.task-text { flex: 1; font-size: 0.95rem; transition: all 0.2s; }

.task-delete {
  background: none;
  border: none;
  color: #d1d5db;
  cursor: pointer;
  font-size: 1.1rem;
  padding: 2px 4px;
  transition: color 0.15s;
}
.task-delete:hover { color: #ef4444; }

footer {
  padding: 12px 24px;
  text-align: right;
}

#clear-btn {
  background: none;
  border: none;
  color: #9ca3af;
  font-size: 0.85rem;
  cursor: pointer;
  text-decoration: underline;
}
#clear-btn:hover { color: #ef4444; }`,
    js: `const input = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('task-list');
const badge = document.getElementById('count-badge');
const clearBtn = document.getElementById('clear-btn');

let tasks = [];
let nextId = 1;

function updateBadge() {
  const remaining = tasks.filter(t => !t.done).length;
  badge.textContent = remaining + ' left';
}

function renderTasks() {
  list.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item' + (task.done ? ' done' : '');
    li.innerHTML = \`
      <div class="task-check \${task.done ? 'checked' : ''}" data-id="\${task.id}">
        \${task.done ? '✓' : ''}
      </div>
      <span class="task-text">\${task.text}</span>
      <button class="task-delete" data-id="\${task.id}">✕</button>
    \`;
    list.appendChild(li);
  });
  updateBadge();
}

function addTask() {
  const text = input.value.trim();
  if (!text) return;
  tasks.push({ id: nextId++, text, done: false });
  input.value = '';
  renderTasks();
  console.log('Task added:', text);
}

list.addEventListener('click', (e) => {
  const id = parseInt(e.target.dataset.id);
  if (!id) return;

  if (e.target.classList.contains('task-check')) {
    const task = tasks.find(t => t.id === id);
    if (task) { task.done = !task.done; renderTasks(); }
  }
  if (e.target.classList.contains('task-delete')) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
  }
});

addBtn.addEventListener('click', addTask);
input.addEventListener('keydown', e => { if (e.key === 'Enter') addTask(); });
clearBtn.addEventListener('click', () => {
  tasks = tasks.filter(t => !t.done);
  renderTasks();
});

renderTasks();
console.log('Todo app ready!');`,
  },

  {
    id: 'clock',
    name: 'Digital Clock',
    icon: '🕐',
    desc: 'Animated clock',
    html: `<div class="clock-wrapper">
  <div class="date" id="date"></div>
  <div class="time" id="time"></div>
  <div class="seconds-bar">
    <div class="seconds-fill" id="seconds-fill"></div>
  </div>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background: #0a0a0f;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-family: 'JetBrains Mono', 'Courier New', monospace;
}

.clock-wrapper {
  text-align: center;
}

.date {
  color: rgba(124,109,250,0.7);
  font-size: 1rem;
  letter-spacing: 4px;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.time {
  font-size: 5rem;
  font-weight: 700;
  color: #e0d9ff;
  letter-spacing: -2px;
  line-height: 1;
  margin-bottom: 20px;
  text-shadow: 0 0 30px rgba(124,109,250,0.4);
}

.seconds-bar {
  width: 200px;
  height: 3px;
  background: rgba(255,255,255,0.1);
  border-radius: 2px;
  margin: 0 auto;
  overflow: hidden;
}

.seconds-fill {
  height: 100%;
  background: linear-gradient(90deg, #7c6dfa, #a899ff);
  border-radius: 2px;
  transition: width 0.5s ease;
  box-shadow: 0 0 8px rgba(124,109,250,0.5);
}`,
    js: `function tick() {
  const now = new Date();

  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');

  document.getElementById('time').textContent = h + ':' + m + ':' + s;
  document.getElementById('date').textContent =
    days[now.getDay()] + ', ' + months[now.getMonth()] + ' ' + now.getDate() + ' ' + now.getFullYear();

  const pct = (now.getSeconds() / 60) * 100;
  document.getElementById('seconds-fill').style.width = pct + '%';
}

tick();
setInterval(tick, 1000);
console.log('Clock started!');`,
  },

  {
    id: 'cards',
    name: 'CSS Cards',
    icon: '🃏',
    desc: 'Animated card grid',
    html: `<section class="grid">
  <div class="card">
    <div class="card-icon">🚀</div>
    <h3>Fast</h3>
    <p>Built for speed with optimized rendering and minimal overhead.</p>
  </div>
  <div class="card">
    <div class="card-icon">🎨</div>
    <h3>Beautiful</h3>
    <p>Elegant design system with consistent colors and typography.</p>
  </div>
  <div class="card">
    <div class="card-icon">⚡</div>
    <h3>Powerful</h3>
    <p>Advanced features that scale with your project's needs.</p>
  </div>
  <div class="card">
    <div class="card-icon">🔒</div>
    <h3>Secure</h3>
    <p>Security-first architecture with best practices built in.</p>
  </div>
</section>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  min-height: 100vh;
  background: #0f0f1a;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  font-family: system-ui, sans-serif;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  max-width: 900px;
  width: 100%;
}

.card {
  background: #1a1a2e;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px;
  padding: 28px 24px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(124,109,250,0.1), transparent);
  opacity: 0;
  transition: opacity 0.25s;
}

.card:hover {
  border-color: rgba(124,109,250,0.4);
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 30px rgba(124,109,250,0.1);
}

.card:hover::before { opacity: 1; }

.card-icon {
  font-size: 2rem;
  margin-bottom: 14px;
}

h3 {
  color: #e0d9ff;
  font-size: 1.1rem;
  margin-bottom: 8px;
}

p {
  color: #8b8aa8;
  font-size: 0.875rem;
  line-height: 1.6;
}`,
    js: `// Add stagger animation on load
const cards = document.querySelectorAll('.card');

cards.forEach((card, i) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';

  setTimeout(() => {
    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  }, i * 100);
});

console.log('Cards rendered with stagger animation!');`,
  },
];
