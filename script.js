/* ==============================
   BIRTHDAY WEBSITE - script.js
   For: Mayang Aeni (May)
   From: anisnurs
============================== */

// ── GLOBALS ─────────────────────────────────────────────
let currentScene = 'scene-loading';
const music = document.getElementById('bgMusic');
let musicStarted = false;

// ── UTILITY ─────────────────────────────────────────────
function goToScene(targetId) {
  const current = document.querySelector('.scene.active');
  if (current) {
    current.style.transition = 'opacity 0.7s ease';
    current.style.opacity = '0';
    current.style.pointerEvents = 'none';
    setTimeout(() => {
      current.classList.remove('active');
      current.style.opacity = '';
      current.style.pointerEvents = '';
    }, 700);
  }
  setTimeout(() => {
    const next = document.getElementById(targetId);
    if (!next) return;
    next.classList.add('active');
    currentScene = targetId;
    onSceneEnter(targetId);
  }, 600);
}

function onSceneEnter(id) {
  if (id === 'scene-intro')   startIntroScene();
  if (id === 'scene-cake')    startCakeScene();
  if (id === 'scene-letter')  startLetterScene();
  if (id === 'scene-video')   startVideoScene();
  if (id === 'scene-voucher') startVoucherScene();
  if (id === 'scene-final')   startFinalScene();
}

// ── MUSIC ─────────────────────────────────────────────
function tryPlayMusic() {
  if (musicStarted) return;
  music.volume = 0;
  music.play().then(() => {
    musicStarted = true;
    fadeInMusic();
  }).catch(() => {});
}

function fadeInMusic() {
  let vol = 0;
  const interval = setInterval(() => {
    vol = Math.min(vol + 0.02, 0.5);
    music.volume = vol;
    if (vol >= 0.5) clearInterval(interval);
  }, 100);
}

// ── SCENE 1: LOADING ────────────────────────────────────
(function initLoading() {
  const bar = document.getElementById('progressBar');
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 3 + 1;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      bar.style.width = '100%';
      setTimeout(() => goToScene('scene-verify'), 600);
    }
    bar.style.width = progress + '%';
  }, 60);
})();

// ── SCENE 2: VERIFICATION ───────────────────────────────
function verifyYes() {
  tryPlayMusic();
  goToScene('scene-intro');
}
function verifyNo() {
  const btns = document.querySelector('.verify-buttons');
  const denied = document.getElementById('verifyDenied');
  if (btns) btns.style.display = 'none';
  if (denied) denied.classList.remove('hidden');
}

// ── SCENE 3: INTRO ──────────────────────────────────────
function startIntroScene() {
  // Falling petals
  const container = document.getElementById('fallingPetals');
  container.innerHTML = '';
  const petals = ['🌸','🌷','💮','🌺','✿','❀'];
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    p.textContent = petals[Math.floor(Math.random() * petals.length)];
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (4 + Math.random() * 6) + 's';
    p.style.animationDelay = (Math.random() * 5) + 's';
    p.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
    container.appendChild(p);
  }

  // Typing effect
  const lines = ['Hai May...', 'Ada sesuatu untukmu 🎁'];
  const el = document.getElementById('introTyping');
  el.textContent = '';
  let lineIdx = 0, charIdx = 0;

  function typeChar() {
    if (lineIdx >= lines.length) {
      setTimeout(() => {
        const btn = document.getElementById('btnGift');
        btn.classList.remove('hidden');
      }, 600);
      return;
    }
    const line = lines[lineIdx];
    if (charIdx < line.length) {
      el.textContent += line[charIdx];
      charIdx++;
      setTimeout(typeChar, 70);
    } else {
      lineIdx++;
      charIdx = 0;
      if (lineIdx < lines.length) {
        el.textContent += '\n';
        setTimeout(typeChar, 900);
      } else {
        setTimeout(() => {
          const btn = document.getElementById('btnGift');
          btn.classList.remove('hidden');
        }, 600);
      }
    }
  }
  setTimeout(typeChar, 400);
}

// ── SCENE 4: CAKE ───────────────────────────────────────
function startCakeScene() {
  tryPlayMusic();
  const container = document.getElementById('cakeContainer');
  container.style.animation = 'none';
  container.style.opacity = '0';
  container.style.transform = 'translateY(80px) scale(0.8)';

  setTimeout(() => {
    container.style.transition = 'all 0.9s cubic-bezier(0.34,1.56,0.64,1)';
    container.style.opacity = '1';
    container.style.transform = 'translateY(0) scale(1)';
  }, 200);

  // Light candles one by one
  const flames = document.querySelectorAll('.flame');
  flames.forEach((flame, i) => {
    setTimeout(() => {
      flame.classList.add('lit');
      createStarBurst(flame);
    }, 800 + i * 600);
  });

  // Stars
  const allLit = 800 + flames.length * 600;
  setTimeout(() => {
    spawnStars();
    spawnBalloons();
    spawnConfetti('confetti');
    setTimeout(() => goToScene('scene-letter'), 4000);
  }, allLit + 400);
}

function createStarBurst(el) {
  const sc = document.getElementById('starsContainer');
  for (let i = 0; i < 5; i++) {
    const s = document.createElement('div');
    s.textContent = '✨';
    s.style.cssText = `
      position:absolute;
      font-size:${0.8 + Math.random()}rem;
      left:${30 + Math.random() * 40}%;
      top:${20 + Math.random() * 30}%;
      opacity:0;
      animation:sparkleAnim ${1 + Math.random()}s ease-in-out infinite;
      animation-delay:${Math.random() * 0.5}s;
    `;
    sc.appendChild(s);
    setTimeout(() => s.remove(), 3000);
  }
}

function spawnStars() {
  const sc = document.getElementById('starsContainer');
  const emojis = ['✨','⭐','💫','🌟','✦'];
  for (let i = 0; i < 20; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    s.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    s.style.left = Math.random() * 100 + '%';
    s.style.top  = Math.random() * 100 + '%';
    s.style.animationDelay = (Math.random() * 2) + 's';
    sc.appendChild(s);
  }
}

function spawnBalloons() {
  const container = document.getElementById('balloons');
  container.innerHTML = '';
  const colors = [
    'radial-gradient(circle at 35% 35%, #ffb8d0, #e07a9a)',
    'radial-gradient(circle at 35% 35%, #ffd6e8, #f4a0b8)',
    'radial-gradient(circle at 35% 35%, #ffe8f0, #ffc0d5)',
    'radial-gradient(circle at 35% 35%, #ffcce0, #e090a8)',
    'radial-gradient(circle at 35% 35%, #c9a0c8, #a07090)',
  ];
  for (let i = 0; i < 12; i++) {
    const b = document.createElement('div');
    b.className = 'balloon';
    b.style.background = colors[Math.floor(Math.random() * colors.length)];
    b.style.left = (5 + Math.random() * 90) + '%';
    b.style.animationDuration = (4 + Math.random() * 4) + 's';
    b.style.animationDelay = (Math.random() * 2) + 's';
    b.style.opacity = 0.85;
    container.appendChild(b);
  }
}

function spawnConfetti(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  const colors = ['#f4a0b8','#e07a9a','#ffd6e8','#c9a0c8','#ffecd2','#fff0f5','#ffb347'];
  for (let i = 0; i < 60; i++) {
    const c = document.createElement('div');
    c.className = 'confetti-piece';
    c.style.left = Math.random() * 100 + '%';
    c.style.background = colors[Math.floor(Math.random() * colors.length)];
    c.style.width = (6 + Math.random() * 8) + 'px';
    c.style.height = (8 + Math.random() * 10) + 'px';
    c.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    c.style.animationDuration = (2.5 + Math.random() * 3) + 's';
    c.style.animationDelay = (Math.random() * 2.5) + 's';
    c.style.opacity = 0.9;
    container.appendChild(c);
  }
}

// ── SCENE 5: LETTER ─────────────────────────────────────
function startLetterScene() {
  const envWrap = document.getElementById('envelopeWrap');
  const letterPaper = document.getElementById('letterPaper');
  const env = document.getElementById('envelope');

  envWrap.classList.remove('hidden');
  letterPaper.classList.add('hidden');

  // Auto-open envelope after short delay
  setTimeout(() => {
    env.classList.add('open');
    setTimeout(() => {
      envWrap.style.display = 'none';
      letterPaper.classList.remove('hidden');
      typeLetterContent();
    }, 800);
  }, 1000);
}

function typeLetterContent() {
  const letterText = `Sometimes I wonder what my life would look like if I had never met you. And honestly, it would have been a little less colorful, a little less warm, and a lot less meaningful.

You've been there through ordinary days and difficult ones, through laughter, random conversations, and moments when words weren't even necessary. Your presence alone has been a gift.

I don't think I say this enough, but thank you. Thank you for being you. Thank you for your kindness, your patience, your genuine heart, and for making people around you feel loved (gue maksudnya wkwk)

As you celebrate your 29th birthday, my wish for you is simple: may life be gentle with you. May your heart always find reasons to smile. May the love you so freely give to others return to you tenfold. And may you always know that you are deeply appreciated, deeply valued, and deeply loved.

No matter how many birthdays pass, I hope we'll always have the chance to celebrate them together, year after year. 🤍

Happy Birthday, Mayaaangku~

The world is brighter because you're in it. 🌷✨
So please stay by my side as my Westie, and let's continue celebrating life's little moments together. Here's to more adventures, more laughter, and more unforgettable WilliamEst memories in the years ahead. 💖`;

  const el = document.getElementById('letterBodyText');
  el.textContent = '';
  let i = 0;
  const speed = 28;

  function typeNext() {
    if (i < letterText.length) {
      el.textContent += letterText[i];
      i++;
      // Auto-scroll
      const paper = document.getElementById('letterPaper');
      paper.scrollTop = paper.scrollHeight;
      setTimeout(typeNext, speed);
    } else {
      const btn = document.getElementById('btnNextLetter');
      if (btn) btn.style.display = 'block';
    }
  }
  setTimeout(typeNext, 400);
}

// ── SCENE 6: VIDEO ──────────────────────────────────────
function startVideoScene() {
  const video = document.getElementById('birthdayVideo');
  const placeholder = document.getElementById('videoPlaceholder');

  // Try to detect if video source is available
  video.addEventListener('error', () => {
    placeholder.style.display = 'flex';
  }, { once: true });

  video.addEventListener('loadeddata', () => {
    placeholder.style.display = 'none';
  }, { once: true });

  // Auto-advance when video ends
  video.addEventListener('ended', () => {
    setTimeout(() => goToScene('scene-voucher'), 1200);
  }, { once: true });

  // If src is placeholder, show overlay
  fetch('assets/video.mp4', { method: 'HEAD' })
    .catch(() => {
      placeholder.style.display = 'flex';
    });
}

// ── SCENE 7: VOUCHER ────────────────────────────────────
function startVoucherScene() {
  const wrap = document.getElementById('voucherWrap');
  wrap.style.animation = 'none';
  wrap.style.opacity = '0';
  wrap.style.transform = 'translateY(60px)';
  setTimeout(() => {
    wrap.style.transition = 'all 0.8s cubic-bezier(0.34,1.56,0.64,1)';
    wrap.style.opacity = '1';
    wrap.style.transform = 'translateY(0)';
  }, 100);
}

function claimGift() {
  spawnConfetti('confetti2');
  // Big confetti burst
  for (let i = 0; i < 4; i++) {
    setTimeout(() => spawnConfetti('confetti2'), i * 400);
  }
  setTimeout(() => goToScene('scene-final'), 2800);
}

// ── SCENE 8: FINAL ──────────────────────────────────────
function startFinalScene() {
  // Fairy lights
  const fl = document.getElementById('fairyLights');
  fl.innerHTML = '';
  const lightColors = ['#ff9bba','#ffb347','#b0e0e6','#fffacd','#dda0dd','#f4a0b8','#98fb98'];
  for (let i = 0; i < 30; i++) {
    const l = document.createElement('div');
    l.className = 'fairy-light';
    const color = lightColors[Math.floor(Math.random() * lightColors.length)];
    l.style.background = color;
    l.style.color = color;
    l.style.animationDelay = (Math.random() * 2) + 's';
    l.style.animationDuration = (1 + Math.random() * 1.5) + 's';
    fl.appendChild(l);
  }

  // Falling petals (final)
  const fp = document.getElementById('finalPetals');
  fp.innerHTML = '';
  const petals2 = ['🌸','🌷','💮','🌺','✿'];
  for (let i = 0; i < 25; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    p.textContent = petals2[Math.floor(Math.random() * petals2.length)];
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (5 + Math.random() * 8) + 's';
    p.style.animationDelay = (Math.random() * 6) + 's';
    p.style.fontSize = (0.8 + Math.random() * 1.3) + 'rem';
    fp.appendChild(p);
  }

  // Sparkles
  const sp = document.getElementById('sparkles');
  sp.innerHTML = '';
  for (let i = 0; i < 16; i++) {
    const s = document.createElement('div');
    s.className = 'sparkle';
    s.textContent = ['✨','💫','⭐','🌟','✦'][Math.floor(Math.random()*5)];
    s.style.left = Math.random() * 100 + '%';
    s.style.top  = Math.random() * 100 + '%';
    s.style.animationDuration = (2 + Math.random() * 2) + 's';
    s.style.animationDelay = (Math.random() * 3) + 's';
    sp.appendChild(s);
  }

  // Final confetti shower
  spawnConfetti('finalConfetti');
  setTimeout(() => spawnConfetti('finalConfetti'), 2000);
  setTimeout(() => spawnConfetti('finalConfetti'), 4500);
}

// ── GLOBAL EVENT: tap anywhere to advance letter ────────
document.addEventListener('click', (e) => {
  // Allow video placeholder button clicks
  if (e.target.closest('.btn-skip-video')) return;
  if (e.target.closest('.btn-claim')) return;
  if (e.target.closest('.btn-gift')) return;
  if (e.target.closest('.btn-next-letter')) return;
  if (e.target.closest('.btn-yes') || e.target.closest('.btn-no') || e.target.closest('.btn-close')) return;

  // Try to play music on any interaction
  tryPlayMusic();
});

// ── PREVENT CONTEXT MENU (optional polish) ──────────────
document.addEventListener('contextmenu', e => e.preventDefault());

console.log('🌷 Happy Birthday, May! Made with love by anisnurs 💖');
