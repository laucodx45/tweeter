// prevent cross site scripting
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

/**
 * createTweetElement takes in a tweet object and is responsible for returning a tweet <article> element containing the entire HTML structure of the tweet
 * @param {*} object
 * @output returns entire HTML structure of the tweet
 */
const createTweetElement = (object) => {
  let $tweet = $(`<article>
  <div class="box-1">
  <div class="user-info">
    <div class="avatar">
      <img src=${object.user.avatars} alt="">
    </div>
    <div class="user-name">
      <p>${object.user.name}</p>
    </div>
  </div>
  <div class="user-tag">
    <p>${object.user.handle}</p>
  </div>
</div>
<div class="tweet-text">
  <p>${escape(object.content.text)}</p>
</div>
<footer>
  <div class="posting-date">
    <p>${timeago.format(object.created_at)}</p>
  </div>
  <div class="icons">
    <i id="flag" class="fa-solid fa-flag"></i>
    <i id="retweet" class="fa-solid fa-retweet"></i>
    <i id="heart" class="fa-solid fa-heart"></i>
  </div>
</footer></article>`);
  return $tweet;
};

const renderTweets = (array) => {
  // empty container everytime it renders to prevent duplication
  $('#tweets-container').empty();
  for (const tweetData of array) {
    $('#tweets-container').prepend(createTweetElement(tweetData));
  }
};

const loadTweet = () => {
  $.getJSON("/tweets", function(data) {
    renderTweets(data);
  });
};

$(document).ready(function() {
  $('.error-message').hide();

  loadTweet();

  $("#submit-tweet-form").on("submit", function(event) {
    event.preventDefault();
    // slideUp clears the error message if there was any, it ensures that the error message is relevant to the most current submit
    $('.error-message').slideUp(200);
    const $tweet = $(this).serialize();

    // it leaves us with the lenght of the tweet
    const slicedTweet = decodeURIComponent($tweet.slice(5));
    
    if (slicedTweet.length === 0 || slicedTweet === null) {
      $(this).parents('.container').find('#empty-tweet-error').show(200);
      return;
    }
    
    if (slicedTweet.length > 140) {
      $(this).parents('.container').find('#overlimit-error').show(200);
      return;
    }

    $.post("/tweets", $tweet).then(function() {
      $("#tweet-text").val('');
      $('.counter').text(140);
      loadTweet();
    });
    
  });
});