$(document).ready(function() {
  console.log('doc ready! callback was successful');

  $('#tweet-text').on('input', function() {
    let initialCount = 140;
    let inputLength = $('#tweet-text').val().length;
    let remaining = initialCount - inputLength;
    $(this).parents('.new-tweet').find('.counter').text(remaining);

    if (remaining < 0) {
      $(this).parents('.new-tweet').find('.counter').css('color', 'red');
    }
  });
});