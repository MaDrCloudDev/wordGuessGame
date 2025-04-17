// requests.ts
const getPuzzle = async (): Promise<string> => {
  const response = await fetch("https://wgg.madr.io");

  if (!response.ok) {
    throw new Error("Failed to fetch puzzle");
  }

  const puzzle = await response.json();
  return puzzle.puzzle;
};

export default getPuzzle;
