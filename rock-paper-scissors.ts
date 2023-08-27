enum Choice {
  Rock = "Rock",
  Paper = "Paper",
  Scissors = "Scissors",
}

const startButton = document.getElementById("start-game")!;
const tryAgain = document.getElementById("try-again")!;
let gameBoard = `<div id="game-container">
      <div
        class="flex flex-wrap gap50 justify-center bottom-margin-20 top-margin-50"
      >
        <div>
          <h2>Human</h2>
          <div class="flex justify-center gap5 border-solid padding-100">
            <button id="Rock">Rock</button>
            <button id="Paper">Paper</button>
            <button id="Scissors">Scissors</button>
          </div>
          <h3 id="human-score">Score:</h3>
        </div>
        <div>
          <h2>Computer</h2>
          <div class="flex justify-center gap5 border-solid padding-100">
            <button id="cRock">Rock</button>
            <button id="cPaper">Paper</button>
            <button id="cScissors">Scissors</button>
          </div>
          <h3 id="computer-score">Score:</h3>
        </div>
      </div>
      <h3 id="roundAnnouncement"></h3>
    </div>`;

startButton.addEventListener("click", () => {
  let elem = document.getElementById("start-game-div")!;
  console.log(elem);
  elem.parentNode?.removeChild(elem);
  elem = document.getElementById("container")!;
  elem.innerHTML = gameBoard;
});

let playerScore = 0;
let computerScore = 0;
let announceText: string;
let nTies = 0;

document
  .getElementById("container")!
  .addEventListener("click", function (event: MouseEvent) {
    const button = event.target as HTMLButtonElement;
    console.log(button);
    if (
      button &&
      button instanceof HTMLButtonElement &&
      button.id != "start-game" &&
      button.id != "try-again"
    ) {
      let playerChoice = Choice[button.id];
      let computerChoice = getComputerChoice();
      let score = playRound(playerChoice, computerChoice);
      if (score === 1) {
        playerScore += 1;
        announceText = `You win! ${playerChoice} beats ${computerChoice}`;
      } else if (score === -1) {
        computerScore += 1;
        announceText = `You lose :( ${computerChoice} beats ${playerChoice}`;
      } else {
        nTies += 1;
        announceText = `It's a tie: You both chose ${computerChoice}`;
      }
      let humanResult = `Score: ${playerScore}`;
      let computerResult = `Score: ${computerScore}`;
      let humanScoreDisplay = document.getElementById("human-score")!;
      let computerScoreDisplay = document.getElementById("computer-score")!;
      let roundAnnouncement = document.getElementById("roundAnnouncement")!;
      if (playerScore === 5) {
        endGame("Humans Win!");
      } else if (computerScore === 5) {
        endGame("Machines Win :(");
      } else {
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

function endGame(text: string): undefined {
  let elem = document.getElementById("game-container")!;
  elem.parentNode?.removeChild(elem);
  elem = document.getElementById("container")!;
  elem.innerHTML = `<h2>GAME OVER</h2>
  <h3>${text}</h3>
  <div
        id="start-game-div"
        class="flex justify-center align-center full-height"
      >
        <button class="big-text lpad-10" id="try-again">Try Again?</button>
      </div>
  `;

  const tryAgainButton = document.getElementById("try-again")!;
  tryAgainButton.addEventListener("click", () => {
    resetGame();
    elem.innerHTML = ""; // Clear the container
    elem.innerHTML = gameBoard 
  });
}


function randomNumber(n: number): number {
  let result = Math.floor(Math.random() * n);
  return result;
}

function getComputerChoice(): Choice {
  let choices = Object.keys(Choice) as (keyof typeof Choice)[];
  let index = randomNumber(choices.length);
  let choice = Choice[choices[index]];
  return choice;
}

function playRound(playerSelection: Choice, computerSelection: Choice): number {
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
