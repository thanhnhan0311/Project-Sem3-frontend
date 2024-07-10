function convertToLetterString(n, length) {
  // Convert the number to a string
  let str = n.toString();

  // Pad the string with leading zeros if its length is less than 5
  while (str.length < length) {
    str = "0" + str;
  }

  return str;
}

export default convertToLetterString;
