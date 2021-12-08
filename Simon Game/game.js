var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var gamePattern = [];
var userClickedPattern = [];
var count = 0;
var newLength = 0;

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  if (level != 0) {
    userClickedPattern.push(userChosenColour);
    newLength++;
  } else restart();
  playSound(userChosenColour);
  animatePress(userChosenColour);
  if (
    userClickedPattern[userClickedPattern.length - 1] !=
    gamePattern[userClickedPattern.length - 1]
  )
    restart();
  check();
});

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);

  level++;
  $("#level-title").text("Level " + level);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

$(document).keydown(function () {
  count++;
  if (count == 1) nextSequence();
});

function check() {
  if (newLength === gamePattern.length && newLength != 0) {
    var c = 0;
    for (var p = 0; p < level; p++) {
      if (gamePattern[p] != userClickedPattern[p]) {
        c++;
        restart();
      }
    }
    if (c == 0) {
      nextSequence();
      userClickedPattern.splice(0, userClickedPattern.length);
      newLength = 0;
    }
  }
}

function restart() {
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 100);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  gamePattern.splice(0, gamePattern.length);
  userClickedPattern.splice(0, userClickedPattern.length);
  (count = 0), (level = 0), (newLength = 0);
  $(document).keydown(function () {
    count++;
    if (count == 1) nextSequence();
  });
}
