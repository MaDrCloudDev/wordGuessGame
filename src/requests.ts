// src/requests.ts
const getPuzzle = async (wordCount = 2): Promise<string> => {
  const response = await fetch(
    `https://puzzle.mead.io/puzzle?wordCount=${wordCount}`
  );
  if (!response.ok) throw new Error("Failed to fetch puzzle");
  const data = await response.json();
  return data.puzzle;
};

export default getPuzzle;
