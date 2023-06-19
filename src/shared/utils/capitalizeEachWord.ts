export function capitalizeEachWord(sentence: string) {
  if (typeof sentence !== "string") {
    throw new Error("Input must be a string");
  }

  if (sentence.length === 0) {
    return sentence;
  }

  const words = sentence.split(" ");

  const capitalizedWords = words.map((word) => {
    const firstLetter = word.charAt(0).toUpperCase();
    const remainingLetters = word.slice(1);
    return `${firstLetter}${remainingLetters}`;
  });

  return capitalizedWords.join(" ");
}
