/**
 * Capitalizes the first letter of each word in a given string.
 * @param {string} str - The input string.
 * @return {string} - The transformed string with each word's first letter capitalized.
 */
export function firstLetterToCapital(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
