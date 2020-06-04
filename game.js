
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = 0;
var level = 0;

$(document).on('keypress', function (e) {
    started = started + 1;
    if (started === 1) {
        $('h1').text("Level " + level);
        nextSequence();
    }

});



$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    var index = userClickedPattern.length - 1;

    checkAnswer(index);

});


function checkAnswer(currentLevel) {


    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        // console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);

        }
    } else {
        // console.log("wrong");
        var audio1 = new Audio("sounds/wrong.mp3");
        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass('game-over');
        }, 200);
        audio1.play();
        $('h1').text("Game Over, Press Any Key to Restart");
        startOver();
    }

}


function nextSequence() {

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.random();
    randomNumber = Math.floor(randomNumber * 4)
    var randomChosenColour = buttonColours[randomNumber];
    console.log(randomChosenColour);

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}


function playSound(colour) {
    var audio = new Audio("sounds/" + colour + ".mp3");
    audio.play();

}

function animatePress(currentColour) {


    $("." + currentColour).addClass("pressed");

    setTimeout(function () {
        $("." + currentColour).removeClass('pressed');
    }, 100);
}

function startOver() {
    gamePattern = [];

    userClickedPattern = [];

    started = 0;
    level = 0;
}

