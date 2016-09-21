// $("#text").keyup(function () {
//  let current = $(this).val().length;

//  if (current > 140) {
//   $(".counter").style.color = red;
//  }

// });


$(function () {
  // original number is the counter.text
  let ogNum = $(".counter").text();
  // "[name = 'txt']. on keyup function anon"
  $(".theText").on('keyup', function() {
    let newNum = ogNum - $(".theText").val().length;

    if (newNum < 0) {
      $(".counter").css({"color" : "red"});
    } else {
      $(".counter").css({"color" : "black"});
    }
    $(".counter").text(newNum);
  });
  // new number = number - $'name =text'] .val().length
  // $(".counter").text(newNum);
  // if less than 0 .counter.css({color: red})
  // else black
  //counter.text(newum)

});