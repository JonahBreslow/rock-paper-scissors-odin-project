var Choice;
(function (Choice) {
    Choice["Rock"] = "Rock";
    Choice["Paper"] = "Paper";
    Choice["Scissors"] = "Scissors";
})(Choice || (Choice = {}));
var startButton = document.getElementById("start-game");
var tryAgain = document.getElementById("try-again");
var gameBoard = "<div id=\"game-container\">\n      <div\n        class=\"flex flex-wrap gap50 justify-center bottom-margin-20 top-margin-50\"\n      >\n        <div>\n          <h2>Human</h2>\n          <div class=\"flex justify-center gap5 border-solid padding-100\">\n            <button id=\"Rock\">Rock</button>\n            <button id=\"Paper\">Paper</button>\n            <button id=\"Scissors\">Scissors</button>\n          </div>\n          <h3 id=\"human-score\">Score:</h3>\n        </div>\n        <div>\n          <h2>Computer</h2>\n          <div class=\"flex justify-center gap5 border-solid padding-100\">\n            <button id=\"cRock\">Rock</button>\n            <button id=\"cPaper\">Paper</button>\n            <button id=\"cScissors\">Scissors</button>\n          </div>\n          <h3 id=\"computer-score\">Score:</h3>\n        </div>\n      </div>\n      <h3 id=\"roundAnnouncement\"></h3>\n    </div>";
startButton.addEventListener("click", function () {
    var _a;
    var elem = document.getElementById("start-game-div");
    console.log(elem);
    (_a = elem.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(elem);
    elem = document.getElementById("container");
    elem.innerHTML = gameBoard;
});
var playerScore = 0;
var computerScore = 0;
var announceText;
var nTies = 0;
document
    .getElementById("container")
    .addEventListener("click", function (event) {
    var button = event.target;
    console.log(button);
    if (button &&
        button instanceof HTMLButtonElement &&
        button.id != "start-game" &&
        button.id != "try-again") {
        var playerChoice = Choice[button.id];
        var computerChoice = getComputerChoice();
        var score = playRound(playerChoice, computerChoice);
        if (score === 1) {
            playerScore += 1;
            announceText = "You win! ".concat(playerChoice, " beats ").concat(computerChoice);
        }
        else if (score === -1) {
            computerScore += 1;
            announceText = "You lose :( ".concat(computerChoice, " beats ").concat(playerChoice);
        }
        else {
            nTies += 1;
            announceText = "It's a tie: You both chose ".concat(computerChoice);
        }
        var humanResult = "Score: ".concat(playerScore);
        var computerResult = "Score: ".concat(computerScore);
        var humanScoreDisplay = document.getElementById("human-score");
        var computerScoreDisplay = document.getElementById("computer-score");
        var roundAnnouncement = document.getElementById("roundAnnouncement");
        if (playerScore === 5) {
            endGame("Humans Win!");
        }
        else if (computerScore === 5) {
            endGame("Machines Win :(");
        }
        else {
            roundAnnouncement.textContent = announceText;
        }
        humanScoreDisplay.textContent = humanResult;
        computerScoreDisplay.textContent = computerResult;
    }
});
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    nTies = 0;
}
function endGame(text) {
    var _a;
    var elem = document.getElementById("game-container");
    (_a = elem.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(elem);
    elem = document.getElementById("container");
    elem.innerHTML = "<h2>GAME OVER</h2>\n  <h3>".concat(text, "</h3>\n  <div\n        id=\"start-game-div\"\n        class=\"flex justify-center align-center full-height\"\n      >\n        <button class=\"big-text lpad-10\" id=\"try-again\">Try Again?</button>\n      </div>\n  ");
    var tryAgainButton = document.getElementById("try-again");
    tryAgainButton.addEventListener("click", function () {
        resetGame();
        elem.innerHTML = ""; // Clear the container
        elem.innerHTML = gameBoard;
    });
}
function randomNumber(n) {
    var result = Math.floor(Math.random() * n);
    return result;
}
function getComputerChoice() {
    var choices = Object.keys(Choice);
    var index = randomNumber(choices.length);
    var choice = Choice[choices[index]];
    return choice;
}
function playRound(playerSelection, computerSelection) {
    switch (playerSelection) {
        case Choice.Rock:
            switch (computerSelection) {
                case Choice.Rock:
                    console.log("It's a tie!");
                    return 0;
                case Choice.Paper:
                    console.log("You lose! Paper beats Rock");
                    return -1;
                case Choice.Scissors:
                    console.log("You win! Rock beats Scissors");
                    return 1;
            }
        case Choice.Paper:
            switch (computerSelection) {
                case Choice.Paper:
                    console.log("It's a tie!");
                    return 0;
                case Choice.Rock:
                    console.log("You win! Paper beats Rock");
                    return 1;
                case Choice.Scissors:
                    console.log("You lose! Scissors beats Paper");
                    return -1;
            }
        case Choice.Scissors:
            switch (computerSelection) {
                case Choice.Scissors:
                    console.log("It's a ie!");
                    return 0;
                case Choice.Rock:
                    console.log("You lose! Rock beats Scissors");
                    return -1;
                case Choice.Paper:
                    console.log("You win! Scissors beats Paper");
                    return 1;
            }
    }
}
