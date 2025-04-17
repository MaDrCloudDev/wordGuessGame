// src/hangman.ts
class Hangman {
  word;
  remainingGuesses;
  guessedLetters;
  status;
  constructor(word, remainingGuesses) {
    this.word = word.toLowerCase().split("");
    this.remainingGuesses = remainingGuesses;
    this.guessedLetters = [];
    this.status = "playing";
  }
  calculateStatus() {
    const finished = this.word.every((letter) => this.guessedLetters.includes(letter) || letter === " ");
    if (this.remainingGuesses === 0) {
      this.status = "failed";
    } else if (finished) {
      this.status = "finished";
    } else {
      this.status = "playing";
    }
  }
  get statusMessage() {
    if (this.status === "playing") {
      return `Guesses left: ${this.remainingGuesses}`;
    } else if (this.status === "failed") {
      return `Nice try! The word was "${this.word.join("")}".`;
    } else {
      return "You guessed the word!";
    }
  }
  get puzzle() {
    let puzzle = "";
    this.word.forEach((letter) => {
      if (this.guessedLetters.includes(letter) || letter === " ") {
        puzzle += letter;
      } else {
        puzzle += "*";
      }
    });
    return puzzle;
  }
  makeGuess(guess) {
    guess = guess.toLowerCase();
    const isUnique = !this.guessedLetters.includes(guess);
    const isBadGuess = !this.word.includes(guess);
    if (this.status !== "playing") {
      return;
    }
    if (isUnique) {
      this.guessedLetters = [...this.guessedLetters, guess];
    }
    if (isUnique && isBadGuess) {
      this.remainingGuesses--;
    }
    this.calculateStatus();
  }
}

// src/requests.ts
var getPuzzle = async () => {
  const response = await fetch("https://cloudflare-wgg-worker.madrclouddev.workers.dev/");
  if (!response.ok) {
    throw new Error("Failed to fetch puzzle");
  }
  const puzzle = await response.json();
  return puzzle.puzzle;
};
var requests_default = getPuzzle;

// src/index.ts
var puzzleEl = document.querySelector("#puzzle");
var guessesEl = document.querySelector("#guesses");
var game1;
window.addEventListener("keypress", (e) => {
  const guess = e.key;
  game1.makeGuess(guess);
  render();
});
var render = () => {
  puzzleEl.innerHTML = "";
  guessesEl.textContent = game1.statusMessage;
  game1.puzzle.split("").forEach((letter) => {
    const letterEl = document.createElement("span");
    letterEl.textContent = letter;
    puzzleEl.appendChild(letterEl);
  });
};
var startGame = async () => {
  const puzzle = await requests_default(2);
  game1 = new Hangman(puzzle, 6);
  render();
};
document.querySelector("#reset").addEventListener("click", startGame);
startGame();
