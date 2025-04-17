import Hangman from "./hangman";
import getPuzzle from "./requests";

let game: Hangman;

const render = () => {
  const puzzleEl = document.querySelector("#puzzle")!;
  const guessesEl = document.querySelector("#guesses")!;

  puzzleEl.innerHTML = "";
  game.puzzle.split("").forEach((letter) => {
    const span = document.createElement("span");
    span.textContent = letter;
    puzzleEl.appendChild(span);
  });

  guessesEl.textContent = game.statusMessage;
};

// start game
const startGame = async () => {
  const puzzle = await getPuzzle(2);
  game = new Hangman(puzzle, 5);
  render();
};

// listen for key presses
window.addEventListener("keypress", (e: KeyboardEvent) => {
  const guess = e.key;
  game.makeGuess(guess);
  render();
});

(document.querySelector("#reset") as HTMLButtonElement).addEventListener(
  "click",
  startGame
);

// start game on load
startGame();
