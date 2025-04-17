// src/types/global.d.ts
export {};

declare global {
  interface PuzzleResponse {
    puzzle: string;
  }

  interface LocationResponse {
    ip: string;
    city: string;
    region: string;
    country: string;
    loc: string;
    postal: string;
    timezone: string;
    org: string;
  }

  interface Country {
    name: string;
    alpha2Code: string;
    alpha3Code: string;
    capital: string;
    region: string;
    population: number;
  }
}
