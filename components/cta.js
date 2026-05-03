(function () {
  const wrap = document.createElement('div');
  wrap.className = 'final-cta';
  wrap.innerHTML = `
    <div class="cta-inner">
      <div class="cta-content">
        <h2 class="cta-title">Обсудим ваш проект?</h2>
        <p class="cta-sub">Расскажите о задаче — мы ответим в течение дня и предложим формат работы.</p>
        <div class="cta-card-wrap">
          <button class="cta-btn" onclick="openForm()">Оставить заявку</button>
          <div class="cta-hints">Бесплатная консультация · Без обязательств</div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(wrap);

  const inner = wrap.querySelector('.cta-inner');

  function updateCta() {
    const parent = inner.parentElement;
    const rect   = parent.getBoundingClientRect();
    const vh     = window.innerHeight;
    const cs     = getComputedStyle(document.documentElement);
    const gap    = parseFloat(cs.getPropertyValue('--gap'))   || 20;
    const outer  = parseFloat(cs.getPropertyValue('--outer')) || 40;
    const w      = parent.clientWidth - 2 * outer;
    const maxM   = (w - 11 * gap) / 3 + 4 * gap;
    const visible  = Math.max(0, Math.min(vh, rect.bottom) - Math.max(0, rect.top));
    const half     = rect.height * 0.5;
    const progress = Math.max(0, Math.min(1, (visible - half) / half));
    inner.style.marginLeft  = maxM * (1 - progress) + 'px';
    inner.style.marginRight = maxM * (1 - progress) + 'px';
  }

  window.addEventListener('scroll', updateCta, { passive: true });
  updateCta();
})();
