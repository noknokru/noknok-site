(function () {

  /* ─── CSS ─── */
  const style = document.createElement('style');
  style.textContent = `
#leftnav { position: fixed; left: var(--outer, 40px); top: 24px; z-index: 300; }
#leftnav .brand { display: flex; align-items: baseline; text-decoration: none; font-size: 28px; font-weight: 700; letter-spacing: -0.02em; transition: opacity 0.15s; }
#leftnav .brand:hover { opacity: 0.7; }
#leftnav .brand-main { color: #fff; transition: color 0.3s; }
#leftnav .brand-sep  { color: rgba(255,255,255,0.5); transition: color 0.3s; }
#leftnav .brand-sub  { color: rgba(255,255,255,0.4); transition: color 0.3s; }
#leftnav.dark .brand-main { color: #111; }
#leftnav.dark .brand-sep  { color: #bbb; }
#leftnav.dark .brand-sub  { color: #aaa; }
#copyright { position: fixed; left: var(--outer, 40px); bottom: 28px; font-size: 12px; color: rgba(255,255,255,0.4); z-index: 300; transition: color 0.3s; }
#copyright.dark { color: #999; }
#navwrap { position: fixed; bottom: 20px; left: calc(var(--outer, 40px) + (100vw - 2 * var(--outer, 40px) - 11 * var(--gap, 20px)) / 3 + 4 * var(--gap, 20px)); width: calc((100vw - 2 * var(--outer, 40px) - 11 * var(--gap, 20px)) / 3 + 3 * var(--gap, 20px)); z-index: 400; display: flex; flex-direction: column-reverse; height: 56px; transition: height 0.45s cubic-bezier(0.4,0,0.2,1); }
#navwrap.open { height: calc(100vh - 40px); }
#topnav { height: 56px; background: linear-gradient(to right, #333 var(--scroll, 0%), transparent var(--scroll, 0%)), #1e1e1e; border-radius: 18px; display: flex; align-items: stretch; padding: 5px; position: relative; z-index: 2; }
#navdrop { background: #1e1e1e; border-radius: 18px 18px 0 0; overflow: hidden; margin-bottom: -6px; flex: 1; opacity: 0; pointer-events: none; transition: opacity 0.35s ease; }
#navdrop.on { opacity: 1; pointer-events: all; }
.drop-inner { padding: 10px 16px 20px; height: 100%; overflow-y: auto; scrollbar-width: none; }
.drop-inner::-webkit-scrollbar { display: none; }
.drop-section { margin-bottom: 48px; }
.drop-section:last-child { margin-bottom: 0; }
.drop-label { font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #555; margin-bottom: 12px; padding-left: 2px; }
.drop-portfolio { display: flex; gap: 10px; overflow-x: auto; scrollbar-width: none; }
.drop-portfolio::-webkit-scrollbar { display: none; }
.drop-card { text-decoration: none; flex-shrink: 0; width: 200px; }
.drop-card-img { width: 100%; height: 130px; border-radius: 14px; background: #2a2a2a; margin-bottom: 10px; }
.drop-card-tag { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: #555; margin-bottom: 6px; }
.drop-card-title { font-size: 14px; color: #fff; line-height: 1.3; }
.drop-grid-1 { display: flex; flex-direction: column; gap: 8px; }
.drop-grid-1 .drop-btn { justify-content: flex-start; }
.drop-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.drop-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; }
.drop-btn { display: flex; align-items: center; justify-content: center; padding: 14px 12px; border-radius: 12px; border: 1px solid #2e2e2e; color: #fff; font-size: 14px; font-weight: 500; text-decoration: none; font-family: inherit; transition: border-color 0.15s, background 0.15s; text-align: center; line-height: 1.2; }
.drop-btn:hover { border-color: #444; background: rgba(255,255,255,0.04); }
.nav-menu { flex: 1; display: flex; align-items: center; justify-content: center; cursor: pointer; background: none; border: none; font-family: inherit; font-size: 17px; font-weight: 500; color: #fff; letter-spacing: -0.01em; }
.nav-cta { flex: 1; display: flex; align-items: center; justify-content: center; background: #1e1e1e; border-radius: 13px; border: 1.5px solid rgba(70,68,75,0.5); font-size: 17px; font-weight: 600; color: #fff; letter-spacing: -0.01em; text-decoration: none; transition: border-color 0.15s; }
.nav-cta:hover { border-color: rgba(70,68,75,0.9); }
#formdrop { position: absolute; bottom: 50px; top: 0; left: 0; right: 0; background: #1e1e1e; border-radius: 18px 18px 0 0; overflow: hidden; opacity: 0; pointer-events: none; transition: opacity 0.35s ease; }
#formdrop.on { opacity: 1; pointer-events: all; }
.form-inner { padding: 20px 16px 24px; height: 100%; overflow-y: auto; scrollbar-width: none; }
.form-inner::-webkit-scrollbar { display: none; }
.form-contacts { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 24px; }
.form-contact-btn { display: flex; align-items: center; gap: 8px; border: 1px solid #2e2e2e; border-radius: 12px; padding: 12px 14px; font-size: 14px; color: #fff; text-decoration: none; font-family: inherit; font-weight: 500; transition: border-color 0.15s; }
.form-contact-btn:hover { border-color: #444; }
.form-field { display: block; width: 100%; background: none; border: none; border-bottom: 1px solid #2e2e2e; color: #fff; font-family: inherit; font-size: 16px; padding: 14px 0; outline: none; }
.form-field::placeholder { color: #444; }
.form-field:focus { border-bottom-color: #555; }
textarea.form-field { resize: none; min-height: 144px; }
.form-file { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; border: 1px dashed #3a3a3a; border-radius: 14px; padding: 28px 16px; margin-top: 16px; cursor: pointer; transition: border-color 0.2s, background 0.2s; text-align: center; }
.form-file:hover, .form-file.drag-over { border-color: #666; background: rgba(255,255,255,0.03); }
.form-file input { display: none; }
.form-file-icon { color: #444; }
.form-file-text { font-size: 14px; color: #555; line-height: 1.3; }
.form-file-text strong { color: #888; font-weight: 500; }
.form-budget-label { font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #555; margin: 20px 0 10px; }
.form-budget { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 4px; }
.form-budget-item { cursor: pointer; }
.form-budget-item input { display: none; }
.form-budget-item span { display: block; padding: 10px 14px; border-radius: 10px; border: 1px solid #2e2e2e; font-size: 14px; color: #666; transition: border-color 0.15s, color 0.15s; }
.form-budget-item input:checked + span { border-color: #fff; color: #fff; }
.form-budget-item:hover span { border-color: #444; color: #aaa; }
.form-consent { display: flex; align-items: flex-start; gap: 10px; margin: 20px 0 0; cursor: pointer; }
.form-consent input[type=checkbox] { display: none; }
.form-consent-box { width: 18px; height: 18px; border-radius: 5px; flex-shrink: 0; border: 1px solid #3a3a3a; margin-top: 1px; display: flex; align-items: center; justify-content: center; transition: border-color 0.15s, background 0.15s; }
.form-consent-box svg { opacity: 0; transition: opacity 0.15s; }
.form-consent input:checked + .form-consent-box { background: #fff; border-color: #fff; }
.form-consent input:checked + .form-consent-box svg { opacity: 1; }
.form-consent span { font-size: 13px; color: #555; line-height: 1.3; }
.form-submit { width: 100%; margin-top: 20px; padding: 16px; background: #fff; color: #000; border: none; border-radius: 14px; font-family: inherit; font-size: 16px; font-weight: 500; cursor: pointer; transition: background 0.15s; }
.form-submit:hover { background: #e8e8e8; }
`;
  document.head.appendChild(style);

  /* ─── HTML ─── */
  const _sub = window.BRAND_SUB || '';
  const _subHtml = _sub
    ? `<span class="brand-sep">&nbsp;:&nbsp;</span><span class="brand-sub">${_sub}</span>`
    : '';

  document.body.insertAdjacentHTML('afterbegin', `
<div id="leftnav">
  <a class="brand" href="index.html">
    <span class="brand-main">Нокнок</span>${_subHtml}
  </a>
</div>
<div id="copyright">©2026 Нокнок</div>
<div id="navwrap">
  <div id="topnav">
    <button class="nav-menu" onclick="toggleNav()">Меню</button>
    <a class="nav-cta" href="#" onclick="openForm();return false;">Заявка</a>
  </div>
  <div id="formdrop">
    <div class="form-inner">
      <div class="form-contacts">
        <a class="form-contact-btn" href="https://t.me/">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
          telegram
        </a>
        <a class="form-contact-btn" href="mailto:hello@noknok.agency">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/>
          </svg>
          hello@noknok.agency
        </a>
      </div>
      <form onsubmit="return false;">
        <input class="form-field" type="text" placeholder="Ваше имя">
        <input class="form-field" type="tel" placeholder="Телефон">
        <input class="form-field" type="email" placeholder="Email">
        <textarea class="form-field" placeholder="Опишите задачу"></textarea>
        <label class="form-file" id="form-drop-zone">
          <svg class="form-file-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          <div class="form-file-text">
            <strong>Выберите файл</strong> или перетащите сюда<br>
            <span id="form-file-name"></span>
          </div>
          <input type="file" id="form-file-input" onchange="handleFileSelect(this.files[0])">
        </label>
        <div class="form-budget-label">Бюджет</div>
        <div class="form-budget">
          <label class="form-budget-item"><input type="radio" name="budget" value="1"><span>до 500 т.р.</span></label>
          <label class="form-budget-item"><input type="radio" name="budget" value="2"><span>500 т.р. — 1 млн</span></label>
          <label class="form-budget-item"><input type="radio" name="budget" value="3"><span>1 — 3 млн</span></label>
          <label class="form-budget-item"><input type="radio" name="budget" value="4"><span>от 3 млн</span></label>
        </div>
        <label class="form-consent">
          <input type="checkbox" id="form-cb" required>
          <div class="form-consent-box">
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4L3.5 6.5L9 1" stroke="#000" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span>Согласен на обработку персональных данных</span>
        </label>
        <button class="form-submit" type="submit">Отправить</button>
      </form>
    </div>
  </div>
  <div id="navdrop">
    <div class="drop-inner">
      <div class="drop-section">
        <div class="drop-label">Услуги</div>
        <div class="drop-grid-1">
          <a class="drop-btn" href="service-design.html">Дизайн интерфейса</a>
          <a class="drop-btn" href="service-branding.html">Цифровой брендинг</a>
          <a class="drop-btn" href="service-landing.html">Продуктовый лендинг</a>
          <a class="drop-btn" href="ux-ui-audit.html">UX/UI аудит</a>
        </div>
      </div>
      <div class="drop-section">
        <div class="drop-label">Портфолио</div>
        <div class="drop-portfolio">
          <a class="drop-card" href="case-1.html">
            <div class="drop-card-img"></div>
            <div class="drop-card-tag">Брендинг · Интерфейсы</div>
            <div class="drop-card-title">Урбика — путеводитель по городу для детей и родителей</div>
          </a>
          <a class="drop-card" href="case-2.html">
            <div class="drop-card-img"></div>
            <div class="drop-card-tag">Брендинг · Интерфейсы</div>
            <div class="drop-card-title">Урбика — путеводитель по городу для детей и родителей</div>
          </a>
          <a class="drop-card" href="case-3.html">
            <div class="drop-card-img"></div>
            <div class="drop-card-tag">Продукт · UX</div>
            <div class="drop-card-title">Мобильное приложение для онлайн-записи</div>
          </a>
        </div>
        <a class="drop-btn" href="portfolio.html" style="margin-top:10px;">Все проекты</a>
      </div>
      <div class="drop-section">
        <div class="drop-label">Дизайнеру</div>
        <div class="drop-grid-2">
          <a class="drop-btn" href="blog.html">Лучшие практики</a>
          <a class="drop-btn" href="vacancies.html">Вакансии</a>
        </div>
      </div>
      <div class="drop-section">
        <div class="drop-grid-1">
          <a class="drop-btn" href="about.html">О нас</a>
        </div>
      </div>
    </div>
  </div>
</div>
`);

  /* ─── JS ─── */
  const navwrap  = document.getElementById('navwrap');
  const navdrop  = document.getElementById('navdrop');
  const formdrop = document.getElementById('formdrop');
  const bar      = document.getElementById('topnav');
  let navState   = null;

  function setNavState(state) {
    navState = state;
    navdrop.classList.toggle('on', state === 'menu');
    formdrop.classList.toggle('on', state === 'form');
    navwrap.classList.toggle('open', state !== null);
    bar.style.borderRadius = state ? '0 0 18px 18px' : '18px';
  }

  window.toggleNav = function () { setNavState(navState === 'menu' ? null : 'menu'); };
  window.openForm  = function () { setNavState(navState === 'form' ? null : 'form'); };

  document.addEventListener('click', function (e) {
    if (navState && !e.target.closest('#navwrap')) setNavState(null);
  });

  window.handleFileSelect = function (file) {
    if (!file) return;
    document.getElementById('form-file-name').textContent = file.name;
  };

  document.addEventListener('DOMContentLoaded', function () {
    var re = / (в|на|с|к|о|по|за|из|до|от|под|над|при|без|для|или|и|а|но|не|со|об|ко|во|уже|как|что|то|это) /gi;
    document.querySelectorAll('h1, h2, h3, p, li, blockquote').forEach(function (el) {
      var prev;
      do { prev = el.innerHTML; el.innerHTML = el.innerHTML.replace(re, ' $1 '); }
      while (el.innerHTML !== prev);
    });
  });

  (function initDrop() {
    const zone = document.getElementById('form-drop-zone');
    if (!zone) return;
    zone.addEventListener('dragover', function (e) { e.preventDefault(); zone.classList.add('drag-over'); });
    zone.addEventListener('dragleave', function () { zone.classList.remove('drag-over'); });
    zone.addEventListener('drop', function (e) {
      e.preventDefault();
      zone.classList.remove('drag-over');
      const file = e.dataTransfer.files[0];
      if (file) { document.getElementById('form-file-input').files = e.dataTransfer.files; window.handleFileSelect(file); }
    });
  })();

})();
