$(function () {

  let ogNum = $(".counter").text();

  $(".theText").on('keyup', function() {
    let newNum = ogNum - $(".theText").val().length;

    if (newNum < 0) {
      $(".counter").css({"color" : "red"});
    } else {
      $(".counter").css({"color" : "black"});
    }
    $(".counter").text(newNum);
  });
});