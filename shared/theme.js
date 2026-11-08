/* MineDrop Final: shared theme for Products, Saved, Booking, Payment, Profile.
   Home/Login use their existing toggles and the same mineDropTheme key. */
(function () {
  'use strict';
  const KEY = 'mineDropTheme';
  const STYLE_ID = 'md-universal-theme-style';
  const BTN_ID = 'md-theme-toggle';

  const CSS = `
    #${BTN_ID} {
      all: unset !important;
      box-sizing: border-box !important;
      position: fixed !important;
      right: 20px !important;
      bottom: 20px !important;
      left: auto !important;
      top: auto !important;
      z-index: 2147483000 !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      padding: 11px 17px !important;
      border: 1px solid #91ad89 !important;
      border-radius: 999px !important;
      background: #273c29 !important;
      color: #fff !important;
      font: 600 14px/1.3 Poppins, system-ui, sans-serif !important;
      box-shadow: 0 5px 18px rgba(0,0,0,.25) !important;
      cursor: pointer !important;
    }
    #${BTN_ID}:focus-visible {outline: 3px solid #7bc29c !important; outline-offset: 3px !important;}
    html.md-dark #${BTN_ID} {background: #eef7e9 !important; color: #1b2e20 !important;}
    html.md-dark, html.md-dark body {
      background-color: #101811 !important;
      color: #eef7eb !important;
      color-scheme: dark;
    }
    html.md-dark body {
      --bg: #101811;
      --dark: #eaf4e6;
      --muted: #bed0b7;
      --line: #435b46;
      --green-soft: #233a2b;
      --olive-soft: #23382b;
      --shadow: 0 5px 22px rgba(0,0,0,.25);
    }
    html.md-dark body main,
    html.md-dark body .products-page,
    html.md-dark body .saved-page,
    html.md-dark body .profile-page,
    html.md-dark body .checkout,
    html.md-dark body .checkout__form,
    html.md-dark body .section,
    html.md-dark body .subsection {background-color: #101811 !important; color: #eef7eb !important;}
    html.md-dark body .site-header,
    html.md-dark body .site-footer,
    html.md-dark body footer {background-color: #1d2f1e !important; color: #eef7eb !important;}
    html.md-dark body .site-header a,
    html.md-dark body .site-footer a,
    html.md-dark body .logo-title,
    html.md-dark body .logo-subtitle {color: #eef7eb !important;}
    html.md-dark body .cart,
    html.md-dark body .card,
    html.md-dark body .collection,
    html.md-dark body .product-card,
    html.md-dark body .saved-card,
    html.md-dark body .saved-item,
    html.md-dark body .product-item,
    html.md-dark body .profile-card,
    html.md-dark body .stat-card,
    html.md-dark body .dashboard-card,
    html.md-dark body .dashboard,
    html.md-dark body .order-history,
    html.md-dark body .orders-table,
    html.md-dark body .receipt,
    html.md-dark body .checkout__summary,
    html.md-dark body .checkout__form .panel,
    html.md-dark body .delivery-options,
    html.md-dark body .delivery-fields,
    html.md-dark body .modal-content,
    html.md-dark body .recently-viewed,
    html.md-dark body .recently-viewed-card,
    html.md-dark body .summary-card,
    html.md-dark body .payment-card,
    html.md-dark body .tools-section,
    html.md-dark body .sort-wrapper,
    html.md-dark body .filter-panel {
      background-color: #203223 !important;
      color: #eef7eb !important;
      border-color: #435b46 !important;
    }
    html.md-dark body .photo,
    html.md-dark body .card__body,
    html.md-dark body .collection__body {background-color: #304334 !important;}
    html.md-dark body .page-title,
    html.md-dark body .profile-info,
    html.md-dark body .cart__list,
    html.md-dark body .cart__summary,
    html.md-dark body .cart__item,
    html.md-dark body .checkout__form .field,
    html.md-dark body .dashboard-chart,
    html.md-dark body .receipt__row {color: #edf5e8 !important; border-color: #435b46 !important;}
    html.md-dark body h1,
    html.md-dark body h2,
    html.md-dark body h3,
    html.md-dark body h4,
    html.md-dark body p,
    html.md-dark body label,
    html.md-dark body .cart__title,
    html.md-dark body .cart__name,
    html.md-dark body .cart__price,
    html.md-dark body .cart__total,
    html.md-dark body .card__name,
    html.md-dark body .card__price,
    html.md-dark body .section-title,
    html.md-dark body .stat-number,
    html.md-dark body .stat-label,
    html.md-dark body .profile-info,
    html.md-dark body .text-dark {color: #eef7eb !important;}
    html.md-dark body .text-muted,
    html.md-dark body .cart__empty,
    html.md-dark body .card__desc,
    html.md-dark body .checkout__back {color: #bdd0b8 !important;}
    html.md-dark body input,
    html.md-dark body select,
    html.md-dark body textarea,
    html.md-dark body .form-control {
      background: #16281b !important;
      color: #f3fbf1 !important;
      border-color: #617b64 !important;
    }
    html.md-dark body input::placeholder,
    html.md-dark body textarea::placeholder {color: #becfba !important;}
    html.md-dark body table,
    html.md-dark body thead,
    html.md-dark body tbody,
    html.md-dark body tr,
    html.md-dark body th,
    html.md-dark body td,
    html.md-dark body .table,
    html.md-dark body .table > :not(caption) > * > * {
      background-color: #203223 !important;
      color: #eef7eb !important;
      border-color: #435b46 !important;
    }
    html.md-dark body .btn--light,
    html.md-dark body .arrow,
    html.md-dark body .qty button,
    html.md-dark body .category-button,
    html.md-dark body .sort-button,
    html.md-dark body .tab,
    html.md-dark body .profile-btn.secondary {
      background: #324d37 !important;
      color: #f4faf1 !important;
      border-color: #65836b !important;
    }
    html.md-dark body .btn--primary,
    html.md-dark body .login-button,
    html.md-dark body .pay-button {
      background: #385e43 !important;
      color: white !important;
      border-color: #65836b !important;
    }
    html.md-dark body .btn--primary:hover,
    html.md-dark body .tab:hover {background: #4a7656 !important;}
    @media (max-width: 600px) {
      #${BTN_ID} {right: 12px !important; bottom: 12px !important; padding: 10px 13px !important; font-size: 12px !important;}
    }
  `;

  function getTheme() {
    try { return localStorage.getItem(KEY) === 'dark' ? 'dark' : 'light'; }
    catch (_) { return 'light'; }
  }
  function saveTheme(value) {
    try { localStorage.setItem(KEY, value); }
    catch (error) { console.warn('Theme preference could not be saved:', error); }
  }
  function applyTheme(value, button) {
    const dark = value === 'dark';
    document.documentElement.classList.toggle('md-dark', dark);
    document.body.classList.toggle('dark-mode', dark);
    button.textContent = dark ? '☀️ Light mode' : '🌙 Dark mode';
    button.setAttribute('aria-pressed', String(dark));
  }
  function init() {
    if (!document.getElementById(STYLE_ID)) {
      const style = document.createElement('style');
      style.id = STYLE_ID;
      style.textContent = CSS;
      document.head.appendChild(style);
    }
    let button = document.getElementById(BTN_ID);
    if (!button) {
      button = document.createElement('button');
      button.id = BTN_ID;
      button.type = 'button';
      button.setAttribute('aria-label', 'Toggle site theme');
      document.body.appendChild(button);
    }
    applyTheme(getTheme(), button);
    button.addEventListener('click', function () {
      const next = document.documentElement.classList.contains('md-dark') ? 'light' : 'dark';
      saveTheme(next);
      applyTheme(next, button);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();


/* FINAL FIX: Dark mode contrast for all pages */
(function () {
  const style = document.createElement('style');
  style.id = 'md-contrast-fix';

  style.textContent = `
    body.dark-mode .md-auto-dark-surface {
      background-color: #203124 !important;
      color: #f3f8ef !important;
      border-color: #526a52 !important;
    }

    body.dark-mode .md-auto-dark-surface
      :is(h1, h2, h3, h4, h5, h6, p, span,
          strong, small, label, legend, th, td) {
      color: #f3f8ef !important;
    }

    body.dark-mode .md-auto-dark-surface
      :is(input, textarea, select) {
      background: #142318 !important;
      color: #ffffff !important;
      border-color: #6a846a !important;
    }

    body.dark-mode .md-auto-dark-surface
      :is(input, textarea)::placeholder {
      color: #b8c9b5 !important;
    }

    body.dark-mode .md-auto-dark-surface button {
      color: #f3f8ef !important;
    }

    body.dark-mode .md-auto-dark-surface
      button:not(#md-theme-toggle) {
      background-color: #35563e !important;
      border-color: #638b6a !important;
    }

    body.dark-mode .md-auto-dark-surface
      button:hover {
      background-color: #4c956c !important;
    }

    body.dark-mode .modal-content,
    body.dark-mode [role="dialog"] {
      background-color: #203124 !important;
      color: #f3f8ef !important;
    }

    body.dark-mode .modal-content
      :is(h1, h2, h3, h4, p, span, strong),
    body.dark-mode [role="dialog"]
      :is(h1, h2, h3, h4, p, span, strong) {
      color: #f3f8ef !important;
    }
  `;

  document.head.appendChild(style);

  function fixContrast() {
    const dark = document.body.classList.contains('dark-mode');

    document.querySelectorAll('.md-auto-dark-surface')
      .forEach(el => {
        if (!dark) {
          el.classList.remove('md-auto-dark-surface');
        }
      });

    if (!dark) return;

    const elements = document.querySelectorAll(
      'section, article, div, aside, fieldset, ' +
      '.card, .modal-content, [role="dialog"]'
    );

    elements.forEach(el => {
      if (el.classList.contains('md-auto-dark-surface')) return;

      const css = getComputedStyle(el);
      const bg = css.backgroundColor;
      const match = bg.match(
        /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/
      );

      if (!match) return;

      const r = Number(match[1]);
      const g = Number(match[2]);
      const b = Number(match[3]);
      const alpha = match[4] === undefined
        ? 1
        : Number(match[4]);

      // Only actual light, opaque backgrounds
      const isLight = r > 220 && g > 220 && b > 215;

      if (alpha < 0.9 || !isLight) return;

      const rect = el.getBoundingClientRect();

      // Ignore tiny decorative elements
      if (rect.width < 100 || rect.height < 35) return;

      el.classList.add('md-auto-dark-surface');
    });
  }

  function scheduleFix() {
    requestAnimationFrame(fixContrast);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleFix);
  } else {
    scheduleFix();
  }

  // Fix newly created product cards and modals
  const observer = new MutationObserver(scheduleFix);

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Refresh contrast after switching theme
  document.addEventListener('click', function () {
    setTimeout(fixContrast, 30);
  });
})();

