(function () {

  /* ─── CSS ─── */
  const style = document.createElement('style');
  style.textContent = `
#hero { width: 100%; height: 100vh; background: #0d0d0d; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; }
#hero::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px); background-size: 52px 52px; }
.hero-img { position: absolute; z-index: 1; top: 50%; left: 50%; transform: translate(-50%, -58%); height: 62vh; width: auto; pointer-events: none; }
.hero-content { position: absolute; z-index: 2; bottom: 60px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 18px; max-width: 450px; padding: 0; }
.hero-title { font-size: clamp(32px, 5vw, 56px); font-weight: 700; line-height: 1.05; letter-spacing: -0.03em; color: #fff; }
.hero-meta { display: flex; align-items: center; gap: 10px; }
.hero-avatar { width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #555, #888); flex-shrink: 0; }
.hero-author { font-size: 16px; color: rgba(255,255,255,0.6); }
`;
  document.head.appendChild(style);

  /* ─── render ─── */
  window.renderHero = function (config) {
    const imgHtml  = config.image ? `<img class="hero-img" src="${config.image}" alt="">` : '';
    const metaHtml = config.meta
      ? `<div class="hero-meta"><div class="hero-avatar"></div><span class="hero-author">${config.meta}</span></div>`
      : '';

    const div = document.createElement('div');
    div.id = 'hero';
    div.innerHTML = `
      ${imgHtml}
      <div class="hero-content">
        <h1 class="hero-title">${config.title}</h1>
        ${metaHtml}
      </div>
    `;

    const root = document.getElementById('hero-root');
    if (root) root.replaceWith(div);
  };

})();
