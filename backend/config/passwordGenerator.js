const generator = require("generate-password");

const passwordGenerator = generator.generate({
  length: 16,
  numbers: true,
  symbols: true,
  lowercase: true,
  uppercase: true,
  excludeSimilarCharacters: true,
  strict: true,
});

// console.log("your password ----->", passwordGenerator);
module.exports = { passwordGenerator };
