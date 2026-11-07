$(document).ready(function () {
  const storedUser = localStorage.getItem('md_user');
  if (storedUser) {
    const user = JSON.parse(storedUser);
    $('#auth-header-action').html(`
      <div class="d-flex align-items-center gap-2">
        <span class="text-white small"> Hi, <strong id="logged-in-name"></strong></span>
        <button id="logout-btn" class="btn btn--light btn--pill btn--small">Log out</button>
      </div>
    `);
    $('#logged-in-name').text(user.name || 'Player');

    
    $('#logout-btn').on('click', function () {
      localStorage.removeItem('md_user');
      localStorage.removeItem("profileName");
      localStorage.removeItem("profileEmail");
      
      window.location.reload();
    });
  }

  
  $('.faq-question').on('click', function () {
    // Traversal: closest() находит родителя, find() находит ответ
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
});