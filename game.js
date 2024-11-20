


var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keydown(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function nextSequence() {
    userClickedPattern = []; // Clear the user clicked pattern at the start of each new sequence
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4); // Get a random number between 0 and 3
    var randomChosenColour = buttonColours[randomNumber]; // Access the color from buttonColours

    gamePattern.push(randomChosenColour); // Add to the game pattern

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); // Animate the chosen button
    playSound(randomChosenColour); // Play sound for the chosen color
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
