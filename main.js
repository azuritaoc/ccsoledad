// ====== OVERLAY DE BIENVENIDA ======
(function () {
  const overlay = document.createElement('div');
  overlay.id = 'welcome-overlay';
  overlay.innerHTML = `
    <div class="wov-inner">
      <img src="logoo.png" class="wov-logo" alt="Logo Ronda Campesina La Soledad"
           onerror="this.style.display='none'">
      <div class="wov-flowers">🌸 🌹 🌷 🌺 💐</div>
      <h1 class="wov-title">¡ Feliz Día de la Madre !</h1>
      <button id="enter-btn" class="wov-btn">🌹 Toca para entrar</button>
    </div>
  `;
  document.body.appendChild(overlay);

  const style = document.createElement('style');
  style.textContent = `
    #welcome-overlay {
      position: fixed; inset: 0; z-index: 10000;
      background: radial-gradient(ellipse at 50% 30%, #3d0a22 0%, #1a0010 60%, #0d0008 100%);
      display: flex; align-items: center; justify-content: center;
      text-align: center; padding: 2rem;
      transition: opacity 0.7s ease;
    }
    #welcome-overlay.hiding { opacity: 0; pointer-events: none; }
    .wov-inner {
      display: flex; flex-direction: column;
      align-items: center; gap: 1.2rem;
      max-width: 480px; width: 100%;
      padding: 1rem;
    }
    .wov-logo {
      width: min(300px, 75vw);
      filter: drop-shadow(0 0 24px rgba(212,160,23,0.7)) drop-shadow(0 4px 20px rgba(0,0,0,0.6));
      animation: wovFloat 3s ease-in-out infinite;
    }
    @keyframes wovFloat {
      0%,100% { transform: translateY(0); }
      50%      { transform: translateY(-10px); }
    }
    .wov-flowers { font-size: clamp(1.4rem, 5vw, 2rem); letter-spacing: 0.5rem; opacity: 0.75; margin-top: 0.2rem; }
    .wov-title {
      font-family: 'Dancing Script', cursive;
      font-size: clamp(2rem, 8vw, 3.5rem);
      color: #fff;
      text-shadow: 0 2px 24px rgba(194,24,91,0.9), 0 0 40px rgba(244,143,177,0.4);
      line-height: 1.2; margin: 0; white-space: nowrap;
    }
    .wov-sub {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(1rem, 3.5vw, 1.3rem);
      color: rgba(255,255,255,0.6); font-style: italic;
      letter-spacing: 0.08em; margin: 0;
    }
    .wov-btn {
      margin-top: 0.8rem;
      background: linear-gradient(135deg, #880e4f 0%, #c2185b 50%, #e91e8c 100%);
      color: white; border: none; cursor: pointer;
      font-family: 'Dancing Script', cursive;
      font-size: clamp(1.4rem, 5vw, 1.8rem);
      padding: clamp(0.9rem, 3vw, 1.2rem) clamp(2rem, 7vw, 3rem);
      border-radius: 50px;
      box-shadow: 0 8px 30px rgba(194,24,91,0.55);
      animation: wovPulse 2s ease-in-out infinite;
      transition: transform 0.15s;
    }
    .wov-btn:active { transform: scale(0.96); }
    @keyframes wovPulse {
      0%,100% { box-shadow: 0 8px 30px rgba(194,24,91,0.55), 0 0 0 0 rgba(194,24,91,0.4); }
      50%      { box-shadow: 0 8px 30px rgba(194,24,91,0.55), 0 0 0 14px rgba(194,24,91,0); }
    }
    .wov-hint { font-family: 'Cormorant Garamond', serif; font-size: clamp(0.9rem, 2.5vw, 1rem); color: rgba(255,255,255,0.35); margin: 0; }
    #music-btn {
      position: fixed; bottom: 1.2rem; right: 1.2rem; z-index: 999;
      display: none; background: rgba(194,24,91,0.82);
      border: none; border-radius: 50%; width: 46px; height: 46px;
      font-size: 1.25rem; cursor: pointer;
      box-shadow: 0 4px 16px rgba(0,0,0,0.35);
      align-items: center; justify-content: center;
      transition: transform 0.2s, background 0.2s;
    }
    #music-btn:hover { transform: scale(1.1); }
  `;
  document.head.appendChild(style);

  // Audio
  const audio = new Audio('./madre.mp3');
  audio.loop = true;
  audio.volume = 0.45;

  // Botón flotante mute/unmute
  const musicBtn = document.createElement('button');
  musicBtn.id = 'music-btn';
  musicBtn.innerHTML = '🔊';
  musicBtn.title = 'Silenciar música';
  document.body.appendChild(musicBtn);

  let playing = false;
  musicBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (playing) {
      audio.pause(); playing = false; musicBtn.innerHTML = '🔇';
    } else {
      audio.play().then(() => { playing = true; musicBtn.innerHTML = '🔊'; }).catch(() => {});
    }
  });

  // Clic en botón "Toca para entrar" → garantiza audio en iOS/Android
  document.getElementById('enter-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    audio.play()
      .then(() => { playing = true; musicBtn.innerHTML = '🔊'; })
      .catch(() => { musicBtn.innerHTML = '🔇'; });
    overlay.classList.add('hiding');
    setTimeout(() => overlay.remove(), 750);
    musicBtn.style.display = 'flex';
  });
})();

// ====== LOADER ======
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
  const petalShapes = [
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 38'><path d='M15 36 Q4 28 3 16 Q2 6 15 2 Q28 6 27 16 Q26 28 15 36Z' fill='COLOR' opacity='0.88'/><path d='M15 36 Q8 26 9 16 Q10 8 15 4' stroke='SHAD' stroke-width='0.8' fill='none' opacity='0.4'/></svg>`,
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 38 30'><path d='M19 28 Q4 22 2 14 Q1 6 19 2 Q37 6 36 14 Q34 22 19 28Z' fill='COLOR' opacity='0.85'/><path d='M19 28 Q10 20 11 12 Q13 6 19 3' stroke='SHAD' stroke-width='0.7' fill='none' opacity='0.35'/></svg>`,
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 32'><path d='M12 30 Q2 22 3 12 Q5 3 12 1 Q20 3 21 12 Q22 22 12 30Z' fill='COLOR' opacity='0.9'/><path d='M12 30 Q6 20 7 12 Q8 5 12 2' stroke='SHAD' stroke-width='0.6' fill='none' opacity='0.3'/></svg>`,
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 22 42'><path d='M11 40 Q1 30 2 18 Q3 6 11 2 Q19 6 20 18 Q21 30 11 40Z' fill='COLOR' opacity='0.87'/><path d='M11 40 Q5 28 6 17 Q7 7 11 3' stroke='SHAD' stroke-width='0.7' fill='none' opacity='0.35'/></svg>`,
  ];
  const palettes = [
    { fill: '#e8305a', shad: '#a01030' }, { fill: '#f06880', shad: '#c03050' },
    { fill: '#ff90a8', shad: '#d05070' }, { fill: '#ffe0e8', shad: '#e0a0b0' },
    { fill: '#fff4f6', shad: '#d8b0b8' }, { fill: '#f5c0c8', shad: '#c07080' },
    { fill: '#c01830', shad: '#800010' }, { fill: '#ff6070', shad: '#cc2040' },
  ];
  for (let i = 0; i < 55; i++) {
    const wrap = document.createElement('div');
    wrap.className = 'petal';
    const shape = petalShapes[Math.floor(Math.random() * petalShapes.length)];
    const pal   = palettes[Math.floor(Math.random() * palettes.length)];
    wrap.style.cssText = `
      left:${Math.random()*105}vw; top:-60px;
      width:${14+Math.random()*22}px; height:${(14+Math.random()*22)*1.3}px;
      --drift:${(Math.random()-0.5)*160}px;
      animation-duration:${7+Math.random()*11}s;
      animation-delay:${Math.random()*18}s;
      filter:drop-shadow(0 2px 3px rgba(180,20,50,0.18));
    `;
    wrap.innerHTML = shape.replace(/COLOR/g, pal.fill).replace(/SHAD/g, pal.shad);
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
    c.style.width  = (6 + Math.random() * 8) + 'px';
    c.style.height = (6 + Math.random() * 8) + 'px';
    c.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    c.style.animationDuration = (1.5 + Math.random() * 2) + 's';
    c.style.animationDelay    = (Math.random() * 0.5) + 's';
    document.body.appendChild(c);
    c.addEventListener('animationend', () => c.remove());
  }
}
