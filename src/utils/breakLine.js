import nl2br from 'react-newline-to-break';

/**
 * @param {string} name titre a modifier
 */

const breakLine = (name) => {
    let newName = ""; // use to return the name string
    let wordIndex; // word length

    const whiteSpace = name.split(" ").length - 1; // number of white space in the string
    const wordArray = name.split(' '); // array : countain string's words

    switch (whiteSpace) {
        case 1:
            wordIndex = wordArray[0].length;
            newName = `${name.substr(0, wordIndex)} ${"\n"} ${name.substr(wordIndex)}` // add breakline to the string
            return nl2br(newName);
        case 2:
            wordIndex = wordArray[1].length + wordArray[0].length + 1;
            newName = `${name.substr(0, wordIndex)} ${"\n"} ${name.substr(wordIndex)}` // add breakline to the string
            return nl2br(newName);
        default:
            return null
    }



}

export default breakLine;