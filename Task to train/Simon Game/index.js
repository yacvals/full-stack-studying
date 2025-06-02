let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let isGameStarted = false;

$(document).on("keydown", function(){
    if(isGameStarted === false){
        nextSequence();
    }
});


function nextSequence(){
    $("h1").html("Level: "+ ++level);
    isGameStarted = true;
    let randomNumber = Math.floor(Math.random()*4); //0-3
    let randomChosenColour = buttonColours[randomNumber]; //зберегли рандомний колір
    gamePattern.push(randomChosenColour); 
    animateButton(randomChosenColour);
    playSound(randomChosenColour);
}

$(".btn").on("click",function(){
    let userChosenColour = this.id;
    animatePress(userChosenColour);
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
})


function playSound(name){
let audio = new Audio ('./sounds/'+name+'.mp3')
    audio.play();
}

function animateButton(currentColour){
    $("#"+currentColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(() => {
        $("#"+currentColour).removeClass("pressed");
    }, 100);

}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        // якщо останній клік правильний і це був останній елемент послідовності
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                userClickedPattern = [];
                nextSequence();
            }, 1000);
        }
    } else {
        // ❌ помилка
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    isGameStarted = false;
    userClickedPattern = [];
}