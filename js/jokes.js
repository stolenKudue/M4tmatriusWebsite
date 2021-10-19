const jokeContent = document.getElementById("jokeContent");
const jokeAnswer = document.getElementById("jokeAnswer");

document.getElementById("jokeBtn").addEventListener('click', getJoke);

function getJoke(){
    //API
// Create a request variable and assign a new XMLHttpRequest object to it.
    let request = new XMLHttpRequest();

// Open a new connection, using the GET request on the URL endpoint
    request.open('GET', 'https://v2.jokeapi.dev/joke/Any?safe-mode?format=json', true);

    request.onload = function (){
// JSON here
        let data = JSON.parse(this.response)

        if (request.status === 200 && typeof data.joke == "undefined") { //undefined catch?
            jokeContent.innerText = data.setup;
            jokeAnswer.innerText = data.delivery;
        }
        else if (request.status === 200 && typeof data.setup == "undefined"){
            jokeContent.innerText = data.joke;
            jokeAnswer.innerText = "";
        }
        else {
            console.log('Error')
        }
    }

// Send request
    request.send();

}
