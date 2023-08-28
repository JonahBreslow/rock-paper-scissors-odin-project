var Choice;
(function (Choice) {
    Choice["Rock"] = "Rock";
    Choice["Paper"] = "Paper";
    Choice["Scissors"] = "Scissors";
})(Choice || (Choice = {}));
// DOM elements
var startButton = document.getElementById("start-game");
var tryAgainButton = document.getElementById("try-again");
var container = document.getElementById("container");
var humanScoreDisplay = document.getElementById("human-score");
var computerScoreDisplay = document.getElementById("computer-score");
var roundAnnouncement = document.getElementById("roundAnnouncement");
// Game board HTML
var gameBoard = "<div id=\"game-container\">\n      <h2>Choose your weapon!</h2>\n      <div\n        class=\"flex flex-wrap gap50 justify-center bottom-margin-20 top-margin-50\"\n      >\n        <div>\n          <h2>Human</h2>\n          <div class=\"flex justify-center gap5 padding-100 grey\">\n            <button class='choice-key' id=\"Rock\">Rock</button>\n            <button class='choice-key' id=\"Paper\">Paper</button>\n            <button class='choice-key' id=\"Scissors\">Scissors</button>\n          </div>\n          <h3 id=\"human-score\">Score:</h3>\n        </div>\n        <div>\n          <h2>Computer</h2>\n          <div id='computer-board' class=\"flex justify-center gap5  padding-100 grey\">\n            <button class='choice-key' id=\"cRock\">Rock</button>\n            <button class='choice-key' id=\"cPaper\">Paper</button>\n            <button class='choice-key' id=\"cScissors\">Scissors</button>\n          </div>\n          <h3 id=\"computer-score\">Score:</h3>\n        </div>\n      </div>\n      <h3 id=\"roundAnnouncement\"></h3>\n    </div>";
// Initialize game state
var playerScore = 0;
var computerScore = 0;
var nTies = 0;
var announceText;
// Event Listeners
startButton.addEventListener("click", startGame());
container.addEventListener("click", handleGamePlay());
// Functions
function handleGamePlay() {
    return function (event) {
        var button = event.target;
        var invalidButton = ["cRock", "cPaper", "cScissors"];
        if (isButton(button) && button.id === "try-again") {
            resetGame();
        }
        else if (isButton(button) && button.id === "cRock") {
            console.log("skipping computer choice");
        }
        else if (isButton(button) && button.id === "cPaper") {
            console.log("skipping computer choice");
        }
        else if (isButton(button) && button.id === "cScissors") {
            console.log("skipping computer choice");
        }
        else if (isButton(button) && button.id != "start-game") {
            playGame(button);
        }
    };
}
function playGame(button) {
    var _a, _b, _c;
    var playerChoice = Choice[button.id];
    var computerChoice = getComputerChoice();
    console.log(computerChoice);
    switch (computerChoice) {
        case Choice.Rock:
            var elem = document.getElementById("cRock");
            (_a = elem.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(elem);
            elem = document.getElementById('computer-board');
            elem.innerHTML = "\n      <button class='choice-key chosen' id=\"cRock\">Rock</button>\n      <button class='choice-key' id=\"cPaper\">Paper</button>\n      <button class='choice-key' id=\"cScissors\">Scissors</button>\n      ";
            break;
        case Choice.Paper:
            elem = document.getElementById("cPaper");
            (_b = elem.parentNode) === null || _b === void 0 ? void 0 : _b.removeChild(elem);
            elem = document.getElementById('computer-board');
            elem.innerHTML = "\n      <button class='choice-key' id=\"cRock\">Rock</button>\n      <button class='choice-key chosen' id=\"cPaper\">Paper</button>\n      <button class='choice-key' id=\"cScissors\">Scissors</button>\n      ";
            break;
        case Choice.Scissors:
            elem = document.getElementById("cScissors");
            (_c = elem.parentNode) === null || _c === void 0 ? void 0 : _c.removeChild(elem);
            elem = document.getElementById('computer-board');
            elem.innerHTML = "\n      <button class='choice-key' id=\"cRock\">Rock</button>\n      <button class='choice-key' id=\"cPaper\">Paper</button>\n      <button class='choice-key chosen' id=\"cScissors\">Scissors</button>\n      ";
            break;
    }
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
function isButton(button) {
    return button && button instanceof HTMLButtonElement;
}
function startGame() {
    return function () {
        var _a;
        var elem = document.getElementById("start-game-div");
        console.log(elem);
        (_a = elem.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(elem);
        elem = document.getElementById("container");
        elem.innerHTML = gameBoard;
    };
}
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    nTies = 0;
    container.innerHTML = gameBoard;
}
function endGame(text) {
    var _a;
    var elem = document.getElementById("game-container");
    (_a = elem.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(elem);
    elem = document.getElementById("container");
    elem.innerHTML = "<h2>GAME OVER</h2>\n  <h2>".concat(text, "</h2>\n  <div\n        id=\"start-game-div\"\n        class=\"flex justify-center align-center full-height\"\n      >\n        <button class=\"big-text lpad-10\" id=\"try-again\">Try Again?</button>\n      </div>\n  ");
    var tryAgainButton = document.getElementById("try-again");
    tryAgainButton.addEventListener("click", function () {
        resetGame();
        elem.innerHTML = "";
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
