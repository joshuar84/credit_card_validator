// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]
/************************************ */
/*********Begin main function******** */
/************************************ */
// Used Luhn's Algorithm https://en.wikipedia.org/wiki/Luhn_algorithm#Description
const validateCred = (cardNumArray) => {

    /********inital variables********* */
    // Made copy of the number and saved to oGCard
    const oGCard = cardNumArray.slice();

    // popped off the last element and saved to checkDigit
    const checkDigit = oGCard.pop();

    // Saved the original number length to cardLength
    const cardLength = oGCard.length + 1;

    // Should be an array alternating between doubled numbers turned strings and numbers
    const arrOfEveryOtherDouble = [];

    // An array that will contain everyother number summed
    const skip1SumArray = [];

    /*************************for loop 1 of 2************************ */
    // Iterate over oGCard in reverse.
    for (let i = oGCard.length - 1; i >= 0; i--) {

        // num is the number at index i.
        let num = oGCard[i];

        // If the original card length is even execute code below.
        if (cardLength % 2 === 0) {

            // It's even because even length converted to index is odd.
            // Then you pop() one off at the top and its even again.
            if (i % 2 === 0) {
                // Everyother number is doubled and converted to a string starting with the second to the last number
                // Every number and string is pushed to arrOfEveryDouble in reverse.
                let newNum = num + num;
                arrOfEveryOtherDouble.unshift(newNum.toString());
            } else {
                arrOfEveryOtherDouble.unshift(num);
            };

        // This runs when the original card length is odd
        } else {
            if (i % 2 === 1) {
                // Everyother number is doubled and converted to a string starting with the second to the last number
                // Every number and string is pushed to arrOfEveryDouble in reverse.
                let newNum = num + num;
                arrOfEveryOtherDouble.unshift(newNum.toString());
            } else {
                arrOfEveryOtherDouble.unshift(num);
            };
        }
    };

    /***************************for loop 2 of 2********************************** */

    // iterate over arrOfEveryOtherDouble from left to right
    for (let i = 0; i < arrOfEveryOtherDouble.length; i++) {

        // This is the element at index i
        let el = arrOfEveryOtherDouble[i];

        /**If its a string and more than one digit convert to a number and
         * add each digit up. If its one digit just convert it to a number. 
         * If its a number do nothing. All items get pushed to skip1SumArray*/ 
        if (typeof el === 'string' && el.length === 2) {
            let digit1 = Number(el[0]);
            let digit2 = Number(el[1]);
            let sum = digit1 + digit2;
            skip1SumArray.push(sum);
        } else if (typeof el === 'string' && el.length === 1) {
            let digit = Number(el[0]);
            skip1SumArray.push(digit);
        } else {
            skip1SumArray.push(el);
        };
    };

    /****************************more variables*************************** */
    // Trying to get the sum of all elements in skip1SumArray
    const sumOfAllSums = skip1SumArray.reduce((accumulator, currentElement) => {
        return accumulator + currentElement;
    });

    // Multiplied the above variable by 9
    const multipliedBy9 = sumOfAllSums * 9;

    // moduloed multipliedBy9 by 10
    const mod10 = multipliedBy9 % 10;

    // If the result of mod10 is equal to the checkDigit the card is valid. Otherwise, invalid.
    if (mod10 === checkDigit) {
        return true;
    } else {
        return false;
    };
};

const findInvalidCards = arrayOfCards => {
    let invalidCardArray = [];
    arrayOfCards.forEach((elem) => {
       if (!(validateCred(elem))) {
           invalidCardArray.push(elem)
       };
    });
    return invalidCardArray;
};









