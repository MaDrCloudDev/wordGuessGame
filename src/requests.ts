const getPuzzle = async (wordCount: number): Promise<string> => {
  const response = await fetch(
    `https://puzzle.mead.io/puzzle?wordCount=${wordCount}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch puzzle");
  }

  const data = await response.json();
  return data.puzzle; // Assuming the puzzle is returned as a "puzzle" field
};

const getCurrentCountry = async (): Promise<Country> => {
  const location = await getLocation();
  return getCountry(location.country);
};

const getCountry = async (countryCode: string): Promise<Country> => {
  const response = await fetch("//restcountries.eu/rest/v2/all");

  if (response.status === 200) {
    const data = (await response.json()) as Country[];
    const country = data.find((country) => country.alpha2Code === countryCode);

    if (country) {
      return country;
    } else {
      throw new Error(`Country not found for code: ${countryCode}`);
    }
  } else {
    throw new Error("Unable to fetch the country");
  }
};

const getLocation = async (): Promise<LocationResponse> => {
  const response = await fetch("//ipinfo.io/json?token=1a11bd55cc8f9c");

  if (response.status === 200) {
    return (await response.json()) as LocationResponse;
  } else {
    throw new Error("Unable to get the current location");
  }
};

export { getPuzzle as default, getCurrentCountry, getCountry, getLocation };
