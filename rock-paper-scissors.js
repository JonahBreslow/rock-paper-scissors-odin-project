var Choice;
(function (Choice) {
    Choice["Rock"] = "Rock";
    Choice["Paper"] = "Paper";
    Choice["Scissors"] = "Scissors";
})(Choice || (Choice = {}));
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
function getPlayerChoice() {
    var playerChoice = prompt("Choose: Rock, Paper, or Scissors");
    if (playerChoice === null) {
        throw new Error("Must choose Rock, Paper, or Scissors");
    }
    else {
        var choice = Choice[playerChoice];
        return choice;
    }
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
                    console.log("It's a tie!");
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
function game(numGames) {
    var score = 0;
    for (var i = 0; i < numGames; i++) {
        var playerChoice = getPlayerChoice();
        var computerChoice = getComputerChoice();
        score += playRound(playerChoice, computerChoice);
    }
    if (score === 0) {
        console.log("Game over: it's a tie!");
    }
    else if (score > 0) {
        console.log("Game over: you won!");
    }
    else {
        console.log("Game over: you lost :(");
    }
}
game(5);
