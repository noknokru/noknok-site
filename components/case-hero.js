(function () {

  const style = document.createElement('style');
  style.textContent = `
.case-intro {
  grid-column: 5 / 9;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 24px;
  padding-top: 12px;
}
.case-tag-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--c-ink-3);
  border: 1.5px solid #111;
  border-radius: 10px;
  padding: 6px 16px;
}
.case-intro-title {
  font-size: clamp(28px, 3.8vw, 52px);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.03em;
  color: var(--c-ink);
}
`;
  document.head.appendChild(style);

  window.renderCaseHero = function (config) {
    const tagsHtml = config.tags
      ? config.tags.join(' &bull;&bull; ')
      : '';

    const section = document.createElement('div');
    section.className = 'section';
    section.style.cssText = 'padding-top:24px;padding-bottom:40px;';
    section.innerHTML = `
      <div class="case-intro">
        ${tagsHtml ? `<div class="case-tag-pill">${tagsHtml}</div>` : ''}
        <h1 class="case-intro-title">${config.title}</h1>
      </div>
    `;

    const root = document.getElementById('case-hero-root');
    if (root) root.replaceWith(section);
  };

})();
