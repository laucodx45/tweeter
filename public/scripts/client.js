/**
 * takes in a tweet object and is responsible for returning a tweet <article> element containing the entire HTML structure of the tweet
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
  <p>${object.content.text}</p>
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
  for (const tweetData of array) {
    $('#tweets-container').after(createTweetElement(tweetData));
  }
};

const loadTweet = () => {
  $.getJSON("/tweets", function(data) {
    renderTweets(data);
  });
};

$(document).ready(function() {
  // renderTweets(data);
  loadTweet();

  $("#submit-tweet-form").on("submit", function(event) {
    event.preventDefault();
    const $tweet = $(this).serialize();
    $.post("/tweets", $tweet);
  });
});