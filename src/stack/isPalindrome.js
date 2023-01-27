/**
 * A palindrome is a word, phrase, or number that is spelled the same forward and backward.
 * For example, “dad” is a palindrome; “A man, a plan, a canal: Panama” is a palindrome if you take out the spaces and ignore the punctuation;
 * and 1,001 is a numeric palindrome.
 *
 * Use a stack to determine whether or not a given string is a palindrome.
 *
 * The implementation should have O(n) performance.
 *
 * @param text
 *  a possibly empty string that may be a palindrome.
 */

const Stack = require("../linked-list/stack");

function isPalindrome(text) {
  const cleanText = text.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
  if (!cleanText) {
    return false
  }
  let middle = Math.floor(cleanText.length / 2);
  // just gonna go ahead and say if middle = 0 (aka one letter long), it is true
  if (middle === 0) {
    return true;
  }
  // go from the begining of word, to middle and put it in a stack
  const palindromeStack = new Stack();
  for (let i = 0; i < middle; i++) {
    let currentLetter = cleanText[i];
    console.log(`CURRENT LETTER IS ${currentLetter}`);
    palindromeStack.push(currentLetter);
  }
  // i need to check if word is odd length or not. if so I can go from middle to cleanText.length or middle + 1 to length
  let even = cleanText.length % 2 == 0;
  console.log(`even is ${even}`)
  // if not even, bump middle by one
  if (!even) {
    middle++;
  }
  for (let i = middle; i < cleanText.length; i++) {
    let currentLetter = cleanText[i];
    console.log(`CURRENT LETTER IS ${currentLetter}`);
    let poppedLetter = palindromeStack.pop()
    if (poppedLetter !== currentLetter) {
      return false
    }
  }
  return true
}

console.log(isPalindrome(" "));

module.exports = isPalindrome;
