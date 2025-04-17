import Hangman from "./hangman";
import getPuzzle from "./requests";

const puzzleEl = document.querySelector("#puzzle") as HTMLDivElement;
const guessesEl = document.querySelector("#guesses") as HTMLParagraphElement;
let game1: Hangman;

window.addEventListener("keypress", (e: KeyboardEvent) => {
  const guess: string = e.key;
  game1.makeGuess(guess);
  render();
});

const render = (): void => {
  puzzleEl.innerHTML = "";
  guessesEl.textContent = game1.statusMessage;

  game1.puzzle.split("").forEach((letter: string) => {
    const letterEl: HTMLSpanElement = document.createElement("span");
    letterEl.textContent = letter;
    puzzleEl.appendChild(letterEl);
  });
};

const startGame = async (): Promise<void> => {
  const puzzle: string = await getPuzzle(2);
  game1 = new Hangman(puzzle, 6);
  render();
};

(document.querySelector("#reset") as HTMLButtonElement).addEventListener(
  "click",
  startGame
);

startGame();
