/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

$(function focusTextBox() {
  $("button").on("click", function(e) {
    e.preventDefault();
    $("section.new-tweet").slideToggle("slow", function() {
       $("textarea").focus();
       $("section.allTweets");
    });
  });
});


$(function renderTweets() {
  $("form input").on("click", function(e) {
    e.preventDefault();

    const counter = $(".counter");

    if (counter.text() < 0) {
      alert("Your tweet is too long...");
    } else if (counter.text() == 140) {
      alert("You can't hum about nothing!");
    } else {
      let $tweet = $("<article>").addClass("tweet");
      let $header = $("<header>");
      let $img = $("<img>").attr("src", tweetData.user.avatars.small).addClass("avatarPics");
      let $handle = $("<p>").addClass("handle").text(tweetData.user.handle);
      let $name = $("<p>").addClass("name").text(tweetData.user.name);
      $header.append($img).append($handle).append($name);

      let $tweetContainer = $("<div>").addClass("actualTweet");
      let $realTweet = $("<p>").text(document.getElementById('theTweet').value);

      $tweetContainer.append($realTweet);

      let $footer = $("<footer>");
      let $date = $("<p>").text(tweetData.created_at);

      $footer.append($date);

      $tweet.append($header).append($tweetContainer).append($footer);

      $('.allTweets').prepend($tweet);

      $("form textarea").val("");
    }
  });

  $(function loadTweets() {
    const $button = $("input");
    $button.on("click", function (e) {
      e.preventDefault();
      $.ajax({
        url: "/tweets",
        method: "GET",
        success: function (showTweets) {
          console.log("Success: ", showTweets);
        },
        datatype: "JSON"
      });
    });
  });
});