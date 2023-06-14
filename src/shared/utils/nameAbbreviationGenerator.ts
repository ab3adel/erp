export function generateAbbreviation(name: string) {
  const words = name.trim().split(" ");

  if (words.length === 1) {
    // If the name has only one word, return the first two characters
    return words[0].substring(0, 2).toUpperCase();
  } else {
    // If the name has multiple words, take the first character of the first two words
    const abbreviation = words
      .slice(0, 2)
      .map((word) => word[0])
      .join("");

    return abbreviation.toUpperCase();
  }
}
