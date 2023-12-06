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

  // check if it's a new tweet object
  if (!Array.isArray(array)) {
    const tweetData = array;
    $('#tweets-container').after(createTweetElement(tweetData));
    return;
  }

  // This renders the entire tweets database
  for (const tweetData of array) {
    $('#tweets-container').after(createTweetElement(tweetData));
  }
};

const loadTweet = () => {
  $.getJSON("/tweets", function(data) {
    renderTweets(data);
  });
};

const loadNewTweet = () => {
  $.getJSON("/tweets", function(data) {
    const lastIndex  = data.length - 1;
    console.log(data[lastIndex]);
    renderTweets(data[lastIndex]);
  });
};

$(document).ready(function() {

  loadTweet();

  $("#submit-tweet-form").on("submit", function(event) {
    event.preventDefault();
    const $tweet = $(this).serialize();

    const slicedTweet = decodeURIComponent($tweet.slice(5));
    
    if (slicedTweet.length === 0 || slicedTweet === null) {
      alert('Tweet content is not present');
      return;
    }
    
    if (slicedTweet.length > 140) {
      alert('Please limit tweet to 140 characters');
      return;
    }

    $.post("/tweets", $tweet).then(() => {
      $("#tweet-text").val('');
      loadNewTweet();
    });
    
  });
});