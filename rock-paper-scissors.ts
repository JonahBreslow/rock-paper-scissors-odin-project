enum Choice {
  Rock = "Rock",
  Paper = "Paper",
  Scissors = "Scissors",
}

// DOM elements
const startButton = document.getElementById("start-game")!;
const tryAgainButton = document.getElementById("try-again")!;
const container = document.getElementById("container")!;
const humanScoreDisplay = document.getElementById("human-score")!;
const computerScoreDisplay = document.getElementById("computer-score")!;
const roundAnnouncement = document.getElementById("roundAnnouncement")!;

// Game board HTML
let gameBoard = `<div id="game-container">
      <div
        class="flex flex-wrap gap50 justify-center bottom-margin-20 top-margin-50"
      >
        <div>
          <h2>Human</h2>
          <div class="flex justify-center gap5 padding-100 grey">
            <button class='choice-key' id="Rock">Rock</button>
            <button class='choice-key' id="Paper">Paper</button>
            <button class='choice-key' id="Scissors">Scissors</button>
          </div>
          <h3 id="human-score">Score:</h3>
        </div>
        <div>
          <h2>Computer</h2>
          <div id='computer-board' class="flex justify-center gap5  padding-100 grey">
            <button class='choice-key' id="cRock">Rock</button>
            <button class='choice-key' id="cPaper">Paper</button>
            <button class='choice-key' id="cScissors">Scissors</button>
          </div>
          <h3 id="computer-score">Score:</h3>
        </div>
      </div>
      <h3 id="roundAnnouncement"></h3>
    </div>`;

// Initialize game state
let playerScore = 0;
let computerScore = 0;
let nTies = 0;
let announceText: string;

// Event Listeners
startButton.addEventListener("click", startGame());

container.addEventListener("click", handleGamePlay());

// Functions
function handleGamePlay(): (this: HTMLElement, ev: MouseEvent) => any {
  return function (event: MouseEvent) {
    const button = event.target as HTMLButtonElement;
    const invalidButton = ["cRock", "cPaper", "cScissors"]
    if (isButton(button) && button.id === "try-again") {
      resetGame();
    } else if (isButton(button) && button.id === "cRock") {
      console.log("skipping computer choice");
    } else if (isButton(button) && button.id === "cPaper") {
      console.log("skipping computer choice");
    } else if (isButton(button) && button.id === "cScissors") {
      console.log("skipping computer choice");
    } else if (isButton(button) && button.id != "start-game") {
      playGame(button);
    }
  };
}

function playGame(button: HTMLButtonElement): undefined {
  let playerChoice = Choice[button.id];
  let computerChoice = getComputerChoice();
  console.log(computerChoice);
  switch (computerChoice) {
    case Choice.Rock:
      let elem = document.getElementById("cRock")!;
      elem.parentNode?.removeChild(elem);
      elem = document.getElementById('computer-board')!;
      elem.innerHTML = `
      <button class='choice-key chosen' id="cRock">Rock</button>
      <button class='choice-key' id="cPaper">Paper</button>
      <button class='choice-key' id="cScissors">Scissors</button>
      `;
      break
    case Choice.Paper:
      elem = document.getElementById("cPaper")!;
      elem.parentNode?.removeChild(elem);
      elem = document.getElementById('computer-board')!;
      elem.innerHTML = `
      <button class='choice-key' id="cRock">Rock</button>
      <button class='choice-key chosen' id="cPaper">Paper</button>
      <button class='choice-key' id="cScissors">Scissors</button>
      `;
      break
    case Choice.Scissors:
      elem = document.getElementById("cScissors")!;
      elem.parentNode?.removeChild(elem);
      elem = document.getElementById('computer-board')!;
      elem.innerHTML = `
      <button class='choice-key' id="cRock">Rock</button>
      <button class='choice-key' id="cPaper">Paper</button>
      <button class='choice-key chosen' id="cScissors">Scissors</button>
      `;
      break
  }

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

function isButton(button: HTMLButtonElement): boolean {
  return button && button instanceof HTMLButtonElement;
}

function startGame(): (this: HTMLElement, ev: MouseEvent) => undefined {
  return () => {
    let elem = document.getElementById("start-game-div")!;
    console.log(elem);
    elem.parentNode?.removeChild(elem);
    elem = document.getElementById("container")!;
    elem.innerHTML = gameBoard;
  };
}

function resetGame(): undefined {
  playerScore = 0;
  computerScore = 0;
  nTies = 0;
  container.innerHTML = gameBoard;
}

function endGame(text: string): undefined {
  let elem = document.getElementById("game-container")!;
  elem.parentNode?.removeChild(elem);
  elem = document.getElementById("container")!;
  elem.innerHTML = `<h2>GAME OVER</h2>
  <h2>${text}</h2>
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
    elem.innerHTML = "";
    elem.innerHTML = gameBoard;
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
