$(document).ready(function () {

  // FINAL: Create missing theme button
  if (!document.getElementById('theme-toggle-btn')) {
    const header = document.querySelector('.header__inner') ||
      document.querySelector('.site-header');

    if (header) {
      const button = document.createElement('button');
      button.id = 'theme-toggle-btn';
      button.type = 'button';
      button.className = 'btn btn--light btn--pill btn--small';
      button.textContent = '🌙 Theme';
      header.appendChild(button);
    }
  }

  // FINAL: Create currency converter dynamically
  if (!document.getElementById('currency-status')) {
    const main = document.querySelector('main');

    if (main) {
      const section = document.createElement('section');

      section.className =
        'currency-section mt-5 p-4 rounded-4 border shadow-sm';

      section.setAttribute('aria-label', 'Currency converter');

      section.innerHTML = `
        <div class="d-flex flex-column flex-md-row
                    justify-content-between align-items-md-center gap-3">
          <div>
            <h2 class="h5 fw-bold m-0">Live Currency Exchange</h2>
            <p id="currency-status"
               class="small mt-1 mb-0"
               aria-live="polite">
              Loading exchange rates...
            </p>
          </div>

          <div class="d-flex flex-wrap align-items-center gap-2">
            <label for="usd-amount" class="small fw-bold">USD</label>
            <input id="usd-amount"
                   type="number"
                   min="0"
                   step="0.01"
                   value="10"
                   class="form-control form-control-sm"
                   style="width:110px">

            <span class="fw-bold small">=</span>

            <output id="kzt-result"
                    class="fw-bold fs-5"
                    aria-live="polite">
              ... KZT
            </output>
          </div>
        </div>
      `;

      const faq = main.querySelector('.faq-section');

      if (faq) {
        faq.before(section);
      } else {
        main.appendChild(section);
      }
    }
  }

  // FINAL: Dark mode CSS
  if (!document.getElementById('md-final-home-style')) {
    const style = document.createElement('style');
    style.id = 'md-final-home-style';

    style.textContent = `
      .currency-section {
        background: #fff;
        color: #25301f;
      }

      .currency-section #kzt-result {
        color: #24794b;
      }

      body.dark-mode {
        background: #101810 !important;
        color: #edf6e7 !important;
      }

      body.dark-mode .site-header,
      body.dark-mode .site-footer {
        background: #162316 !important;
        color: #f2f8ec !important;
      }

      body.dark-mode .faq-section,
      body.dark-mode .currency-section,
      body.dark-mode .feature-item,
      body.dark-mode .cta-banner,
      body.dark-mode .title-banner {
        background: #203020 !important;
        color: #f2f8ec !important;
        border-color: #445e44 !important;
      }

      body.dark-mode .faq-item {
        background: #203020 !important;
        border-color: #486048 !important;
      }

      body.dark-mode .text-dark,
      body.dark-mode .text-muted,
      body.dark-mode .description-text,
      body.dark-mode .subtitle,
      body.dark-mode .faq-question h3,
      body.dark-mode .currency-section h2,
      body.dark-mode .currency-section #kzt-result {
        color: #e7f2df !important;
      }

      body.dark-mode .form-control {
        background: #122012 !important;
        color: #fff !important;
        border-color: #668066 !important;
      }

      body.dark-mode .form-control::placeholder {
        color: #a9b9a5 !important;
      }

      body.dark-mode .site-header a,
      body.dark-mode .site-footer a {
        color: #e8f5e3;
      }

      body.dark-mode #theme-toggle-btn {
        background: #e4f4d3 !important;
        color: #172417 !important;
      }
    `;

    document.head.appendChild(style);
  }

  // THEME STORAGE
  const savedTheme = localStorage.getItem('mineDropTheme');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }

  const $themeBtn = $('#theme-toggle-btn');

  if ($themeBtn.length) {
    if (document.body.classList.contains('dark-mode')) {
      $themeBtn.text('☀️ Light');
    }

    $themeBtn.on('click', function () {
      document.body.classList.toggle('dark-mode');

      const isDark = document.body.classList.contains('dark-mode');

      localStorage.setItem(
        'mineDropTheme',
        isDark ? 'dark' : 'light'
      );

      $themeBtn.text(isDark ? '☀️ Light' : '🌙 Theme');
    });
  }

  // USER INFORMATION
  const storedUser = localStorage.getItem('md_user');
  let user = null;

  if (storedUser) {
    try {
      user = JSON.parse(storedUser);
    } catch (error) {
      console.warn('Invalid saved user data:', error);
    }
  }

  if (
    user &&
    typeof user === 'object' &&
    !Array.isArray(user) &&
    user.isLoggedIn !== false
  ) {
    const $row = $('<div>')
      .addClass('d-flex align-items-center gap-2');

    const $greeting = $('<span>')
      .addClass('text-white small')
      .append('Hi, ');

    $('<strong>')
      .text(String(user.name || 'User'))
      .appendTo($greeting);

    const $logout = $('<button>', {
      id: 'logout-btn',
      type: 'button'
    })
      .addClass('btn btn--light btn--pill btn--small')
      .text('Log out');

    $row.append($greeting, $logout);

    $('#auth-header-action').empty().append($row);

    $logout.on('click', function () {
      localStorage.removeItem('md_user');
      window.location.reload();
    });
  }

  // FAQ ACCORDION
  $('.faq-question').on('click', function () {
    const $parentItem = $(this).closest('.faq-item');
    const $answer = $parentItem.find('.faq-answer');
    const $icon = $(this).find('.faq-toggle-icon');

    $('.faq-answer').not($answer).slideUp(200);
    $('.faq-toggle-icon').not($icon).text('+');

    if ($answer.is(':visible')) {
      $answer.slideUp(200);
      $icon.text('+');
    } else {
      $answer.slideDown(200);
      $icon.text('−');
    }
  });

  // FAQ SEARCH
  $('#faq-search').on('input', function () {
    const searchTerm = $(this).val().toLowerCase().trim();

    $('#faq-list .faq-item').each(function () {
      const questionText = $(this)
        .find('.faq-question h3')
        .text()
        .toLowerCase();

      const answerText = $(this)
        .find('.faq-answer')
        .text()
        .toLowerCase();

      if (
        questionText.includes(searchTerm) ||
        answerText.includes(searchTerm)
      ) {
        $(this).fadeIn(200);
      } else {
        $(this).fadeOut(200);
      }
    });
  });

  // FINAL: LIVE API INTEGRATION
  function fetchExchangeRates() {
    const $status = $('#currency-status');
    const $input = $('#usd-amount');
    const $result = $('#kzt-result');

    const fallbackRate = 485.0;

    if (!$status.length || !$input.length || !$result.length) {
      return;
    }

    // Dynamically created DOM element
    $('#api-rate-details').remove();

    const $rateDetails = $('<small>', {
      id: 'api-rate-details',
      'aria-live': 'polite'
    }).addClass('d-block text-muted mt-1');

    $status.after($rateDetails);

    function renderConversion(rate, estimated) {
      const amount = Math.max(0, Number($input.val()) || 0);
      const converted = amount * rate;

      $result.text(
        `${converted.toLocaleString('kk-KZ', {
          maximumFractionDigits: 2
        })} KZT${estimated ? ' (Est.)' : ''}`
      );
    }

    let currentRate = fallbackRate;
    let usingFallback = true;

    // Loading state
    $status.text('Fetching live rates...');
    $result.text('Loading...');

    $rateDetails.text(
      'Waiting for exchange-rate API response.'
    );

    // Input event
    $input.on('input', function () {
      renderConversion(currentRate, usingFallback);
    });

    // API request with Promises
    fetch('https://open.er-api.com/v6/latest/USD')
      .then(response => {
        if (!response.ok) {
          throw new Error('HTTP ' + response.status);
        }

        return response.json();
      })

      .then(data => {
        const rate = Number(
          data && data.rates && data.rates.KZT
        );

        // EMPTY DATA STATE: the API responded, but no usable KZT rate was sent.
        if (!Number.isFinite(rate) || rate <= 0) {
          currentRate = fallbackRate;
          usingFallback = true;
          $status.text('No exchange rate data available.');
          $rateDetails.text(
            'No usable KZT rate was returned. Showing an approximate offline estimate (485 KZT).'
          );
          renderConversion(currentRate, usingFallback);
          return;
        }

        // Success state
        currentRate = rate;
        usingFallback = false;

        $status.text(
          `1 USD = ${rate.toFixed(2)} KZT (Live API)`
        );

        $rateDetails.text(
          `Exchange-rate data received: USD → KZT · ${rate.toFixed(2)} KZT per USD`
        );

        renderConversion(currentRate, usingFallback);
      })

      .catch(error => {
        // Error state
        console.warn('Currency API unavailable:', error);

        $status.text(
          'API unavailable. Using an approximate offline rate (485 KZT).'
        );

        $rateDetails.text(
          'Live data could not be loaded. This estimate may be outdated.'
        );

        renderConversion(currentRate, usingFallback);
      });
  }

  fetchExchangeRates();
});
