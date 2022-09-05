var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

//step2
var level = 0;

//step 1
$(document).keypress(function() {
  if (!started) {
    //step3
    $("#level-title").text("Level" + level);
    nextSequence();
    sterted = true;
  }
});
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  //step2
  checkAnswer(userClickedPattern.length - 1);
});

//step1
function checkAnswer(currentLevel) {
  //step3
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    //step4
    if (userClickedPattern.length === gamePattern.length) {

      //step5
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
  } else {
    console.log("wrong");

    //step 1 - 9
    playSound("wrong");

    //step 2 -9
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    //step 3 -9
    $("#level-title").text("Game over, Press any key to restart");
    //step 2 - 10
    startOver();
  }
}

function nextSequence() {
  //step6
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level" + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//1. Create a new function called animatePress(), it should take a single input parameter called currentColour.
function animatePress(currentColor) {

  //2. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
  $("#" + currentColor).addClass("pressed");

  //3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//step 1-10
function startOver() {

  //step 3 -10
  level = 0;
  gamePattern = [];
  started = false;
}
