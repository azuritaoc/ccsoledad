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
// ====== MUSIC ======
const audio = document.getElementById("musica");

audio.volume = 1;

// intentar autoplay
window.addEventListener("load", async () => {
  try {
    await audio.play();
    console.log("Autoplay funcionando");
  } catch (e) {
    console.log("Autoplay bloqueado");
  }
});

// función universal
async function iniciarMusica() {
  try {
    if (audio.paused) {
      await audio.play();
      console.log("Música iniciada");
    }
  } catch (err) {
    console.log(err);
  }
}

// móvil
document.addEventListener("touchstart", iniciarMusica, { passive: true });

// deslizar pantalla
document.addEventListener("touchmove", iniciarMusica, { passive: true });

// scroll
window.addEventListener("scroll", iniciarMusica, { passive: true });

// pc
document.addEventListener("click", iniciarMusica);


