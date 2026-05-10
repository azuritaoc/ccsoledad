let pct = 0;
const bar = document.getElementById('loaderBar');
const pctEl = document.getElementById('loaderPct');
const loaderInterval = setInterval(() => {
  pct += Math.random() * 18;
  if (pct >= 100) { pct = 100; clearInterval(loaderInterval); setTimeout(hideLoader, 300); }
  bar.style.width = pct + '%';
  pctEl.textContent = Math.round(pct) + '%';
}, 120);
function hideLoader() {
  document.getElementById('loader').classList.add('hidden');
  spawnParticles();
  revealSections();
}

// ====== PÉTALOS SVG ======
function spawnParticles() {
  const container = document.getElementById('particles');

  // Tipos de pétalos SVG realistas
  const petalShapes = [
    // Pétalo clásico de rosa
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 38'>
      <path d='M15 36 Q4 28 3 16 Q2 6 15 2 Q28 6 27 16 Q26 28 15 36Z' fill='COLOR' opacity='0.88'/>
      <path d='M15 36 Q8 26 9 16 Q10 8 15 4' stroke='SHAD' stroke-width='0.8' fill='none' opacity='0.4'/>
    </svg>`,
    // Pétalo ancho
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 38 30'>
      <path d='M19 28 Q4 22 2 14 Q1 6 19 2 Q37 6 36 14 Q34 22 19 28Z' fill='COLOR' opacity='0.85'/>
      <path d='M19 28 Q10 20 11 12 Q13 6 19 3' stroke='SHAD' stroke-width='0.7' fill='none' opacity='0.35'/>
    </svg>`,
    // Pétalo pequeño curvado
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 32'>
      <path d='M12 30 Q2 22 3 12 Q5 3 12 1 Q20 3 21 12 Q22 22 12 30Z' fill='COLOR' opacity='0.9'/>
      <path d='M12 30 Q6 20 7 12 Q8 5 12 2' stroke='SHAD' stroke-width='0.6' fill='none' opacity='0.3'/>
    </svg>`,
    // Pétalo largo
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 22 42'>
      <path d='M11 40 Q1 30 2 18 Q3 6 11 2 Q19 6 20 18 Q21 30 11 40Z' fill='COLOR' opacity='0.87'/>
      <path d='M11 40 Q5 28 6 17 Q7 7 11 3' stroke='SHAD' stroke-width='0.7' fill='none' opacity='0.35'/>
    </svg>`,
  ];

  // Paleta de colores: rosas rojas, blancas, rosas y coral
  const palettes = [
    { fill: '#e8305a', shad: '#a01030' }, // rojo rosa
    { fill: '#f06880', shad: '#c03050' }, // rosa medio
    { fill: '#ff90a8', shad: '#d05070' }, // rosa claro
    { fill: '#ffe0e8', shad: '#e0a0b0' }, // blanco rosado
    { fill: '#fff4f6', shad: '#d8b0b8' }, // casi blanco
    { fill: '#f5c0c8', shad: '#c07080' }, // rosa pálido
    { fill: '#c01830', shad: '#800010' }, // rojo oscuro
    { fill: '#ff6070', shad: '#cc2040' }, // coral rojo
  ];

  for (let i = 0; i < 55; i++) {
    const wrap = document.createElement('div');
    wrap.className = 'petal';

    const shape = petalShapes[Math.floor(Math.random() * petalShapes.length)];
    const pal   = palettes[Math.floor(Math.random() * palettes.length)];
    const svg   = shape.replace(/COLOR/g, pal.fill).replace(/SHAD/g, pal.shad);

    const size  = 14 + Math.random() * 22; // px
    const drift = (Math.random() - 0.5) * 160; // horizontal drift px
    const dur   = 7 + Math.random() * 11;  // seconds
    const delay = Math.random() * 18;      // stagger

    wrap.style.cssText = `
      left: ${Math.random() * 105}vw;
      top: -60px;
      width: ${size}px;
      height: ${size * 1.3}px;
      --drift: ${drift}px;
      animation-duration: ${dur}s;
      animation-delay: ${delay}s;
      filter: drop-shadow(0 2px 3px rgba(180,20,50,0.18));
    `;
    wrap.innerHTML = svg;
    container.appendChild(wrap);
  }
}

// ====== SCROLL REVEAL ======
function revealSections() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ====== ENVELOPE / LETTER ======
function openLetter() {
  document.getElementById('envelope').classList.add('open');
  setTimeout(() => { document.getElementById('letter-modal').classList.add('open'); fireConfetti(); }, 500);
}
function closeLetter(e) {
  if (!e || e.target === document.getElementById('letter-modal')) {
    document.getElementById('letter-modal').classList.remove('open');
    document.getElementById('envelope').classList.remove('open');
  }
}

// ====== CONFETTI ======
function fireConfetti() {
  const colors = ['#f48fb1','#c2185b','#d4a017','#4caf50','#f06292','#fff176'];
  for (let i = 0; i < 60; i++) {
    const c = document.createElement('div');
    c.className = 'confetti-piece';
    c.style.left = Math.random() * 100 + 'vw';
    c.style.background = colors[Math.floor(Math.random() * colors.length)];
    c.style.width = (6 + Math.random() * 8) + 'px';
    c.style.height = (6 + Math.random() * 8) + 'px';
    c.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    c.style.animationDuration = (1.5 + Math.random() * 2) + 's';
    c.style.animationDelay = (Math.random() * 0.5) + 's';
    document.body.appendChild(c);
    c.addEventListener('animationend', () => c.remove());
  }
}

// ====== MÚSICA DE FONDO ======
const audio = new Audio('madre.mp3');
audio.loop   = true;
audio.volume = 0.4;

// Botón flotante mute/unmute
const musicBtn = document.createElement('button');
musicBtn.id = 'music-btn';
musicBtn.innerHTML = '🔊';
musicBtn.title = 'Silenciar música';
musicBtn.style.cssText = `
  position: fixed; bottom: 1.2rem; right: 1.2rem;
  z-index: 999; display: none;
  background: rgba(194,24,91,0.85);
  border: none; border-radius: 50%;
  width: 46px; height: 46px;
  font-size: 1.3rem; cursor: pointer;
  box-shadow: 0 4px 16px rgba(0,0,0,0.3);
  align-items: center; justify-content: center;
  transition: transform 0.2s;
`;
document.body.appendChild(musicBtn);

let playing = false;
musicBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  if (playing) {
    audio.pause(); playing = false;
    musicBtn.innerHTML = '🔇';
  } else {
    audio.play(); playing = true;
    musicBtn.innerHTML = '🔊';
  }
});

// ====== OVERLAY DE BIENVENIDA (garantiza audio en iOS) ======
const overlay = document.createElement('div');
overlay.id = 'welcome-overlay';
overlay.style.cssText = `
  position: fixed; inset: 0; z-index: 10000;
  background: linear-gradient(160deg, #1a0010 0%, #2d0a1a 60%, #1a0010 100%);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  text-align: center; padding: 2rem;
  cursor: pointer;
`;
overlay.innerHTML = `
  <img src="logo.png" alt="Logo" style="max-width:160px;margin-bottom:1.5rem;filter:drop-shadow(0 0 20px rgba(212,160,23,0.6));" onerror="this.style.display='none'">
  <div style="font-family:'Dancing Script',cursive;font-size:clamp(1.8rem,6vw,2.8rem);color:#fff;text-shadow:0 2px 20px rgba(194,24,91,0.8);margin-bottom:0.5rem;">
    ¡Feliz Día de las Madres!
  </div>
  <div style="font-family:'Cormorant Garamond',serif;font-size:1rem;color:rgba(255,255,255,0.6);margin-bottom:2.5rem;font-style:italic;">
    Ronda Campesina La Soledad
  </div>
  <button id="enter-btn" style="
    background: linear-gradient(135deg, #880e4f, #c2185b);
    color: white; border: none; cursor: pointer;
    font-family: 'Dancing Script', cursive;
    font-size: 1.4rem;
    padding: 1rem 2.5rem;
    border-radius: 50px;
    box-shadow: 0 8px 30px rgba(194,24,91,0.5);
    animation: pulse 2s ease-in-out infinite;
  ">🌹 Toca para entrar</button>
  <div style="margin-top:1rem;font-size:0.8rem;color:rgba(255,255,255,0.35);font-family:'Cormorant Garamond',serif;">
      </div>
`;
document.body.appendChild(overlay);

document.getElementById('enter-btn').addEventListener('click', (e) => {
  e.stopPropagation();
  // Iniciar audio DENTRO del evento click — única forma garantizada en iOS
  audio.play().then(() => { playing = true; musicBtn.innerHTML = '🔊'; })
              .catch(() => { musicBtn.innerHTML = '🔇'; });
  // Ocultar overlay con fade
  overlay.style.transition = 'opacity 0.6s ease';
  overlay.style.opacity = '0';
  setTimeout(() => { overlay.remove(); }, 650);
  // Mostrar botón mute
  musicBtn.style.display = 'flex';
});
