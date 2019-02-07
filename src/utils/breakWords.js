const chunkArray = (myArray, chunkSize) => {
  const results = [];

  while (myArray.length) {
    results.push(myArray.splice(0, chunkSize));
  }

  return results;
};

const breakWords = words => {
  const spittedWords = words.match(/[^\.!\?]+[\.!\?]+/g);
  return chunkArray(spittedWords, 5);
};

export default breakWords;
