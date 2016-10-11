// Client side logic

$(function () {

  // Adds new tweet to top
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

  // Compose button at top
  function registerFocusTextBox() {
    $("button").on("click", function(e) {
      e.preventDefault();
      $("section.new-tweet").slideToggle("slow", function() {
         $("textarea").focus();
      });
    });
  }

  // verifies that the tweet is not empty, nor over 140 characters
  function verifyLength(currentTweet) {
    const counter = $(".counter");

    if (currentTweet.val().length < 1) {
      alert("You can't hum about nothing...!");
      return false;
    } else if (currentTweet.val().length > 140) {
      alert("That is far more than 140 characters");
      return false;
    } else if (currentTweet.val().match(/^\s*$/)) {
      alert("You can't submit a blank tweet..");
      return false;
    }

    return true;
  }

  function registerMakeTweet() {

    var $button = $("form");

    $button.on("submit", function (event) {
      event.preventDefault();

      const theForm = $(this);
      let theTweet = $('#theTweet');

      if ( !verifyLength(theTweet) ) {
        return;
      }


      $.ajax({
        url: theForm.attr("action"),
        method: theForm.attr("method"),
        data: theForm.serialize(),
        dataType: 'json',
        success: function(data) {
          theForm.find('textarea').val('');
          insertFirstTweet();
        }
      });
    });
  }

  function reloadAllTweets(){
    $.ajax({
      datatype: "json",
      url: "/tweets",
      method: "GET",
      success: function (showTweets) {
        renderTweets(showTweets);
      }
    });
  }

  function renderTweets(tweets) {
    for (let i = 0; i < tweets.length; i++) {
      myElement = createTweetElement( tweets[i] );
      $('.allTweets').append(myElement);
    }
  }

 function loadTweets() {
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

    function getDate(unix) {
      var day = new Date();
      return day;
    }

    // tweet container, handle, name, and avatar picture.
    let $tweet = $("<article>").addClass("tweet");
    let $header = $("<header>");
    let $img = $("<img>").attr("src", tweetObject.user.avatars.small).addClass("avatarPics");
    let $handle = $("<p>").addClass("handle").text(tweetObject.user.handle);
    let $name = $("<p>").addClass("name").text(tweetObject.user.name);
    $header.append($img).append($handle).append($name);

    // the tweet
    let $tweetContainer = $("<div>").addClass("actualTweet");
    let $realTweet = $("<p>").text(tweetObject.content.text);
    $tweetContainer.append($realTweet);

    // footer data;
    let $footer = $("<footer>");
    let $date = $("<p>").text(getDate(tweetObject.created_at));
    $footer.append($date);

    $tweet.append($header).append($tweetContainer).append($footer);

    return $tweet;

  }

});



