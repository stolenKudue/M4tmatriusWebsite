let pickedNum;
let numSound;
let counter = 0;
let correctCounter = 0;
let tries;

document.getElementById("getNumBtn").addEventListener('click', pickNum);
document.getElementById("restartBtn").addEventListener('click', restart);
document.getElementById("repeatBtn").addEventListener('click', repeatNum);
document.getElementById("submitBtn").addEventListener('click', checkNum);
document.getElementById("restart").addEventListener('click', restart);


function pickNum() {
    document.getElementById("getNumBtn").style.display = "none";
    gameplayDisplay("block");
    playRandomNum();
}


//style.visibility = hidden vs visible (takes up space)
//style.display = none vs block (doesn't take up space)

function restart() {
    document.getElementById("getNumBtn").style.display = "block";
    gameplayDisplay("none");
    endOGameDisplay("none");
    document.getElementById("correctCount").innerText = "";
    document.getElementById("triesLeft").innerText = "";
    counter = 0;
    correctCounter = 0;
}

function repeatNum(){
    playNumsound();
}

function checkNum() {
    let inputValue = parseInt(document.getElementById("numInput").value);
    let correctCount = document.getElementById("correctCount");
    let triesLeft = document.getElementById("triesLeft");

    if (isNaN(inputValue)) {
        triesLeft.style.visibility = "visible";
        triesLeft.innerText = "Please input number"
    }
    else if (inputValue == pickedNum) {
        triesLeft.style.visibility = "hidden";
        counter++;
        correctCounter++;
        correctCount.innerText = "You got " + correctCounter + " out of " + counter + " right!"
        playRandomNum();
    }
    else {
        let triesText = triesLeft.innerText = "Try again! You got: "
        switch (tries) {
            case 3:
                triesLeft.style.visibility = "visible";
                triesLeft.innerText = triesText + tries + " tries left."
                repeatNum();
                break;
            case 2:
                triesLeft.innerText = triesText + tries + " tries left."
                repeatNum();
                break;
            case 1:
                triesLeft.innerText = triesText + tries + " try left."
                repeatNum();
                break;
            case 0:
                counter++;
                correctCount.innerText = "You got " + correctCounter + " out of " + counter + " right!"
                triesLeft.innerText = "Try this number instead!";
                inputValue = "";
                playRandomNum();
                return;
        }
        tries--;
        return tries;
    }
}

//Controls style.display (block/none) of all .gameplay elements
function gameplayDisplay(display){
    let gameplay = document.querySelectorAll(".gameplay");
    let i;
    for (i = 0; i < gameplay.length; i++){
        gameplay[i].style.display = display;
    }
}

function endOGameDisplay(display) {
    let endGame = document.querySelectorAll(".endOfGame");
    let i;
    for (i = 0; i < endGame.length; i++) {
        endGame[i].style.display = display;
    }
}

function playRandomNum() {
    if (counter == 5) {
        gameplayDisplay("none");
        endOGameDisplay("block");
        document.getElementById("endText").innerText = "You got " + correctCounter + " out of " + counter + " right!"
        return;
    }

    tries = 3;
    document.getElementById("numInput").value = "";
    pickedNum = Math.round(Math.random() * (19 - 11) + 11); //(maxNum - minNum) + minNum
    let numpath = "Numbers/J" + pickedNum + ".m4a";
    numSound = new Audio(numpath);

    playNumsound();
}

function playNumsound() {
    numSound.play();
}
