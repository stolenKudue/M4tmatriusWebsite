let lDigits, rDigits, exercises;
const table = document.getElementById("exerTable");
let totalExer = 0;

document.getElementById("additionButton").addEventListener('click', addition);
document.getElementById("minusButton").addEventListener('click', minus);
document.getElementById("multiplyButton").addEventListener('click', multiply);
document.getElementById("divideButton").addEventListener('click', divide);
document.getElementById("answerCheck").addEventListener('click', answers);
document.getElementById("clear").addEventListener('click', clearMath);

function addition(){
    mathExercises("+");
}

function minus(){
    mathExercises("-");

}

function multiply(){
    mathExercises("*");

}

function divide(){
    mathExercises("/");

}

//Generer spørgsmål og udskriver i tabel
function mathExercises(operator){
    if (inputValidation()) {

        document.getElementById("errorOutput").innerHTML = ""; //Fjerner en evt. fejlbesked.

        for (let i = 0; i < exercises; i++) {
            //Udskriver numre mellem 1-9 ganget med antal decimaler, brugeren har valgt:
            let lNum = Math.round(Math.random() * (0.8 * (10 ** lDigits)) + 1);
            let rNum = Math.round(Math.random() * (0.8 * (10 ** rDigits)) + 1);

            //Indsætter den næste række i tabellen:
            let row = table.insertRow(totalExer);

            //Indsætter celler med indhold:
            row.insertCell(0).innerHTML = lNum;
            row.insertCell(1).innerHTML = operator;
            row.insertCell(2).innerHTML = rNum;
            row.insertCell(3).innerHTML = "=";
            //Celle med svarinput:
            row.insertCell(4).innerHTML = "<input type='number' id='answer" + totalExer +"' type='text' size='5'>";

            //opdatere antallet af opgaver udfra antal rækker i tabellen
            totalExer = table.rows.length;


        }
        //Viser to skjulte knapper
        document.getElementById("answerCheck").style.display = "block";
        document.getElementById("clear").style.display = "block";
    }

}


function inputValidation(){
    //Henter de 3 inputs:
    lDigits = parseInt(document.getElementById("lDigitsInput").value);
    rDigits = parseInt(document.getElementById("rDigitsInput").value);
    exercises = parseInt(document.getElementById("exercisesInput").value);

    //Undersøger lDigitsInput og rDigitInput er korrekte.
    if ((lDigits <= 0 || rDigits <= 0) || (lDigits > 5 || rDigits > 5) || (Number.isNaN(lDigits) || Number.isNaN(rDigits))){
        document.getElementById("errorOutput").innerHTML = "Number of digits has to be between 1-5.";
        return false;
    }

    //Undersøger exercisesInput er korrekt.
    if (exercises <= 0 || exercises > 150 || Number.isNaN(exercises)){
        document.getElementById("errorOutput").innerHTML = "Please pick between 1 - 150 calculations.";
        return false;
    }
    else {
        return true;
    }

}

//Kontrollere svarene
function answers(){
    let correct = 0; //Tæller antal korrekte svar

    //Bruges i næste for-loop til at samle og ændre lNum, operator, rNum fra string til integer.
    let mathFromString = {
        "+": function (x, y) {return x + y},
        "-": function (x, y) {return x - y},
        "*": function (x, y) {return x * y},
        "/": function (x, y) {return x / y},
    };

    for (let i = 0; i < totalExer; i++){
        let lNum = parseInt(table.rows[i].cells[0].innerHTML); //henter tallet til venstre i tabellen
        let rNum = parseInt(table.rows[i].cells[2].innerHTML); //henter tallet til højre i tabellen

        let answer = document.getElementById("answer" + i); //henter svarinput-feltet
        let answerValue = (answer.value).replace(",", "."); //henter værdien fra svar inputtet og ændre et evt. komma til punktum.
        answerValue = parseFloat(answerValue); //ændre datatypen til integer

        operator = table.rows[i].cells[1].innerHTML; //henter operatoren fra tabellen.

        //kontrollere svaret og farver inputfeltet grøn eller rød hhv. ved rigtig eller forkert svar.
        //På venstre side bruges objektet 'mathFromString' til at udregne det korrekte svar.
        //.toFixed afrunder alle svar til 2 decimaler.
        if ((mathFromString[operator](lNum, rNum)).toFixed(2) == answerValue.toFixed(2)){

            answer.style.backgroundColor = "lawngreen";
            answer.style.backgroundImage = "none";

            correct++
        }
        else {
            answer.style.backgroundColor = "red";
            answer.style.backgroundImage = "none";
        }
    }
    //Udskriver antal rigtige til brugeren
    document.getElementById("results").innerHTML = "You got " + correct + " right out of " + totalExer + " exercises."
}

//nulstiller alle elementer.
function clearMath(){
    if (confirm('Do you really want to delete all your calculations?')) {
        document.getElementById("exerTable").innerHTML = "";
        document.getElementById("results").innerHTML = "";
        document.getElementById("answerCheck").style.display = "none";
        document.getElementById("clear").style.display = "none";
        totalExer = 0;
    }

}
