$(document).ready(function () {
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
      
      localStorage.setItem('mineDropTheme', isDark ? 'dark' : 'light');
      $themeBtn.text(isDark ? '☀️ Light' : '🌙 Theme');
    });
  }

  
  const storedUser = localStorage.getItem('md_user');
  let user = null;
  if (storedUser) {
    try {
      user = JSON.parse(storedUser);
    } catch (error) {
      console.warn('Invalid saved user data:', error);
    }
  }

  if (user && typeof user === 'object' && !Array.isArray(user) && user.isLoggedIn !== false) {
  
    const $row = $('<div>').addClass('d-flex align-items-center gap-2');
    const $greeting = $('<span>').addClass('text-white small').append('Hi, ');
    $('<strong>').text(String(user.name || 'User')).appendTo($greeting);
    const $logout = $('<button>', { id: 'logout-btn', type: 'button' })
      .addClass('btn btn--light btn--pill btn--small')
      .text('Log out');
    $row.append($greeting, $logout);
    $('#auth-header-action').empty().append($row);

    $logout.on('click', function () {
      localStorage.removeItem('md_user');
      window.location.reload();
    });
  }

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

  $('#faq-search').on('input', function () {
    const searchTerm = $(this).val().toLowerCase().trim();

    $('#faq-list .faq-item').each(function () {
      const questionText = $(this).find('.faq-question h3').text().toLowerCase();
      const answerText = $(this).find('.faq-answer').text().toLowerCase();

      if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
        $(this).fadeIn(200);
      } else {
        $(this).fadeOut(200);
      }
    });
  });

  
  function fetchExchangeRates() {
    const $status = $('#currency-status');
    const $input = $('#usd-amount');
    const $result = $('#kzt-result');
    const fallbackRate = 485.0; 

    const $rateDetails = $('<small>', {
      id: 'api-rate-details',
      'aria-live': 'polite'
    }).addClass('d-block text-muted mt-1');
    $status.after($rateDetails);

    function renderConversion(rate, estimated) {
      const amount = Math.max(0, Number($input.val()) || 0);
      const converted = amount * rate;
      $result.text(`${converted.toLocaleString('kk-KZ', { maximumFractionDigits: 2 })} KZT${estimated ? ' (Est.)' : ''}`);
    }

    let currentRate = fallbackRate;
    let usingFallback = true;
    $status.text('Fetching live rates...');
    $result.text('Loading...');
    $rateDetails.text('Waiting for exchange-rate API response.');

    $input.on('input', () => renderConversion(currentRate, usingFallback));

    fetch('https://open.er-api.com/v6/latest/USD')
      .then(response => {
        if (!response.ok) throw new Error('HTTP ' + response.status);
        return response.json();
      })
      .then(data => {
        const rate = Number(data && data.rates && data.rates.KZT);
        if (!Number.isFinite(rate) || rate <= 0) {
          throw new Error('Valid KZT rate missing from response');
        }
        currentRate = rate;
        usingFallback = false;
        $status.text(`1 USD = ${rate.toFixed(2)} KZT (Live API)`);
        $rateDetails.text(`Exchange-rate data received: USD → KZT · ${rate.toFixed(2)} KZT per USD`);
        renderConversion(currentRate, usingFallback);
      })
      .catch(error => {
        console.warn('Currency API unavailable:', error);
        $status.text('API unavailable. Using an approximate offline rate (485 KZT).');
        $rateDetails.text('Live data could not be loaded. This estimate may be outdated.');
        renderConversion(currentRate, usingFallback);
      });
  }
  fetchExchangeRates();
});