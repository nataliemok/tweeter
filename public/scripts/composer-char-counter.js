$(function () {

  let originalNumber = $(".counter").text();

  $(".theText").on('keyup', function() {
    let newNumber = originalNumber - $(".theText").val().length;

    if (newNumber < 0) {
      $(".counter").css({"color" : "red"});
    } else {
      $(".counter").css({"color" : "black"});
    }
    $(".counter").text(newNumber);
  });

});