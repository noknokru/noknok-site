(function () {

  const style = document.createElement('style');
  style.textContent = `
.rs-container { grid-column: 5 / 9; }
.rs-label { font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #aaa; margin-bottom: 14px; }
.rs-heading { font-size: 36px; font-weight: 500; line-height: 1.1; letter-spacing: -0.025em; color: #000; margin-bottom: 28px; }
.rs-viewport { overflow: hidden; border-radius: 24px; }
.rs-track { display: flex; transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1); will-change: transform; }
.rs-slide { flex-shrink: 0; width: 100%; }
.rs-card {
  background: #fff; border: 1px solid #e8e8e8;
  border-radius: 24px; padding: 40px;
  min-height: 480px; display: flex; flex-direction: column; justify-content: space-between;
}
.rs-quote { font-size: 22px; line-height: 1.55; color: #111; }
.rs-author { display: flex; align-items: center; gap: 20px; }
.rs-avatar {
  width: 96px; height: 96px; border-radius: 14px;
  background: #e0e0e0; flex-shrink: 0; overflow: hidden;
}
.rs-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
.rs-name { font-size: 22px; font-weight: 500; color: #000; line-height: 1.2; letter-spacing: -0.015em; }
.rs-role { font-size: 15px; color: #999; margin-top: 5px; }
.rs-dots { display: flex; gap: 8px; justify-content: center; margin-top: 20px; }
.rs-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: #ddd; border: none; padding: 0; cursor: pointer;
  transition: background 0.25s;
}
.rs-dot.on { background: #111; }
`;
  document.head.appendChild(style);

  const REVIEWS = [
    {
      text: 'Перед запуском рекламных кампаний маркетологи посоветовали обратиться в Нокнок, чтобы проверить юзабилити. Мы получили подробный документ с рекомендациями — некоторые замечания оказались критичными, поэтому решили перенести запуск, доработали сайт и только потом пошли в рекламу. Это помогло избежать лишних затрат и подойти к запуску гораздо увереннее.',
      name: 'Дмитрий Межлумов',
      role: 'Директор компании ТДР',
      avatar: ''
    },
    {
      text: 'Когда перед нами встал вопрос масштабирования дизайн-команды, на помощь пришли ребята из Нокнок. Работать с ними было действительно приятно: максимальная гибкость в формате взаимодействия, чёткое соблюдение договорённостей и готовность подключаться даже к внеплановым и срочным задачам. Благодаря совместной работе нам удалось создать классный продукт — за что ребятам большое спасибо!',
      name: 'Павел Брохин',
      role: 'Head of Design',
      avatar: ''
    },
    {
      text: 'Когда встал вопрос обновления продукта, мы поняли, что текущий интерфейс устарел. Над ним в разное время работало несколько дизайнеров, из-за чего продукт потерял целостность. Концепт-сессия помогла навести порядок: команда предложила, как можно освежить интерфейс без полного редизайна, показала точки роста и где стоит усилить взаимодействие. В результате появилось чёткое понимание, что делать дальше, и план работ с приоритетами.',
      name: 'Алексей Морозов',
      role: 'СТО',
      avatar: ''
    }
  ];

  window.renderReviews = function (rootId, opts) {
    var root = document.getElementById(rootId);
    if (!root) return;
    opts = opts || {};

    var labelHtml = opts.label
      ? '<div class="rs-label">' + opts.label + '</div>'
      : '';
    var headingHtml = opts.title
      ? '<h2 class="rs-heading">' + opts.title + '</h2>'
      : '';

    var slidesHtml = REVIEWS.map(function (r) {
      var avatarInner = r.avatar
        ? '<img src="' + r.avatar + '" alt="' + r.name + '">'
        : '';
      return (
        '<div class="rs-slide">' +
          '<div class="rs-card">' +
            '<p class="rs-quote">' + r.text + '</p>' +
            '<div class="rs-author">' +
              '<div class="rs-avatar">' + avatarInner + '</div>' +
              '<div>' +
                '<div class="rs-name">' + r.name + '</div>' +
                '<div class="rs-role">' + r.role + '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>'
      );
    }).join('');

    var dotsHtml = REVIEWS.map(function (_, i) {
      return '<button class="rs-dot' + (i === 0 ? ' on' : '') + '" data-i="' + i + '"></button>';
    }).join('');

    root.innerHTML =
      '<div class="rs-container">' +
        labelHtml + headingHtml +
        '<div class="rs-viewport">' +
          '<div class="rs-track">' + slidesHtml + '</div>' +
        '</div>' +
        '<div class="rs-dots">' + dotsHtml + '</div>' +
      '</div>';

    var track   = root.querySelector('.rs-track');
    var dots    = root.querySelectorAll('.rs-dot');
    var current = 0;

    function goTo(idx) {
      current = idx;
      track.style.transform = 'translateX(-' + (idx * 100) + '%)';
      dots.forEach(function (d, i) { d.classList.toggle('on', i === idx); });
    }

    dots.forEach(function (d) {
      d.addEventListener('click', function () { goTo(+d.dataset.i); });
    });

    var vp = root.querySelector('.rs-viewport');
    var startX = 0;
    vp.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
    }, { passive: true });
    vp.addEventListener('touchend', function (e) {
      var diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        goTo(Math.max(0, Math.min(REVIEWS.length - 1, current + (diff > 0 ? 1 : -1))));
      }
    }, { passive: true });
  };

})();
