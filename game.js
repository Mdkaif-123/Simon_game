let buttonColors = ["red" , "yellow" , "green" , "blue"];

var gamePattern = [];
var userClickedPattern =[];

var level = 0;

var started = false;

$(document).keypress(function(){
    if(!started){

    $("#level-title").text("Level " + level);
    nextSequence();
    started =true;
}

});


function startOver(){
    level = 0;
    gamePattern =[];
    started = false;
}
// Next sequence function is here
function nextSequence(){

//6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];

    level = level+1;
    $("#level-title").text(" Level " + level);


    randomNumber =Math.floor((Math.random()*3)+0.5);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor ).fadeOut(400).fadeIn(400);
    playSound(randomChosenColor);

}

// Function to play sound.
function playSound(name){
    var  sound = new Audio("sounds/" + name +".mp3");
    sound.play();

}

// Function that create a shadow effect when clicked
$(".btn").click( function(){
    btnId=this.id;
    userClickedPattern.push(this.id); // when a button is clicked it will stored in an array of userClickedPattern[]
    playSound(btnId);

    checkAnswer(userClickedPattern.length-1);

// Animate press is in clicked press
    $("#" + btnId).addClass("pressed ");
    setTimeout(function(){
        $("#" + btnId).removeClass("pressed");
    },100);
});

//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

//4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if( userClickedPattern[currentLevel] === gamePattern[currentLevel]){

      //5. Call nextSequence() after a 1000 millisecond delay.
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
                }, 1000);
        }
        

    }

    //If the sequence breaks the else function will execute and GAME OVER reflects.
    else {

        $("body").addClass("game-over");
        var sound1 = new Audio('sounds/wrong.mp3');
        sound1.play();
        setTimeout(function () {
            $("body").removeClass("game-over");
            }, 200);

        $("h1").text ("Game Over , Press Any Key to Restart ");
        $(document).keypress( startOver());

        
        }


    }


