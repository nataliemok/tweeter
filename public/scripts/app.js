/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// tweetData = {
//   "user": {
//     "name": "Newton",
//     "avatars": {
//       "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//       "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//       "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//     },
//     "handle": "@SirIsaac"
//   },
//   "content": {
//     "text": "If I have seen further it is by standing on the shoulders of giants"
//   },
//   "created_at": 1461116232227
// }





$(function () {
  function insertFirstTweet() {
    $.ajax ({
      method: "GET",
      url: "/tweets",
      dataType: "json",
      success: function(newTweetArray) {
        var myElement = createTweetElement(newTweetArray[0]);
        myElement.insertBefore($(".allTweets").find( '>:first-child'));
      }
    });
  }

  function registerFocusTextBox() {
    $("button").on("click", function(e) {
      e.preventDefault();
      $("section.new-tweet").slideToggle("slow", function() {
         $("textarea").focus();
         $("section.allTweets");
      });
    });
  }

   function verifyLength(leTweet) {
      console.log( "leTweet:", leTweet);
      const counter = $(".counter");

      if (leTweet.val().length < 1) {
        alert("You can't hum about nothing...!");
        return false;
      } else if (leTweet.val().length > 140) {
        alert("That is far more than 140 characters");
        return false;
      }

      return true;
    }

  function registerMakeTweet() {
    console.log( "makeTweet");
    var $button = $("form");

    $button.on("submit", function (event) {
      event.preventDefault();

      const theForm = $(this);
      let theTweet = $('#theTweet');

      if ( !verifyLength(theTweet) ) {
        console.log('early exit');
        return;
      }

      console.log("Submitted, performing AJAX req");
      $.ajax({
        url: theForm.attr("action"),
        method: theForm.attr("method"),
        data: theForm.serialize(),
        dataType: 'json',
        success: function(data) {
          console.log('success :D');
          theForm.find('textarea').val('');
          insertFirstTweet();
        }
      })

    })
  }

  function reLoadAllTweets(){
    $.ajax({
      datatype: "json",
      url: "/tweets",
      method: "GET",
      success: function (showTweets) {
        renderTweets(showTweets);
      }
    });
  }
 function loadTweets() {
  // const $button = $("form");
  // $button.on("click", function (e) {
      // e.preventDefault();
      $.ajax({
        datatype: "json",
        url: "/tweets",
        method: "GET",
        success: function (showTweets) {
          renderTweets(showTweets);
          registerFocusTextBox();
          registerMakeTweet();
        },
      });
  }


  loadTweets();

function createTweetElement(tweetObject) {
  // $("form input").on("click", function(e) {
    // e.preventDefault();

      console.log(tweetObject);

      let $tweet = $("<article>").addClass("tweet");
      let $header = $("<header>");
      let $img = $("<img>").attr("src", tweetObject.user.avatars.small).addClass("avatarPics");
      let $handle = $("<p>").addClass("handle").text(tweetObject.user.handle);
      let $name = $("<p>").addClass("name").text(tweetObject.user.name);
      $header.append($img).append($handle).append($name);

      let $tweetContainer = $("<div>").addClass("actualTweet");
      let $realTweet = $("<p>").text(tweetObject.content.text);

      $tweetContainer.append($realTweet);

      let $footer = $("<footer>");
      let $date = $("<p>").text(tweetObject.created_at);

      $footer.append($date);

      $tweet.append($header).append($tweetContainer).append($footer);

      //$('.allTweets').prepend($tweet);

      //$("form textarea").val("");
      return $tweet;
    }//);




  function renderTweets(tweets) {
    for (let i = 0; i < tweets.length; i++) {
      myElement = createTweetElement( tweets[i] );
      $('.allTweets').append(myElement);
    }
  }

});



