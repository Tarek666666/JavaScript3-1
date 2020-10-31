/* Write a function called checkDoubleDigits that:

Takes 1 argument: a number
Returns a new Promise
If the number is bigger than 10, resolve with the string: "The number is bigger than 10!"
If the number is smaller than 10, reject with the error: "Error! The number is smaller than 10..."
*/

const checkDoubleDigits = number => {
    // handle error if there is no number at all, then throw a new error
  if (!number) {
    throw new Error('You must enter a number !!');
  } else {
    return new Promise((resolve, reject) => {
      if (number > 10) {
        resolve('the number is bigger than 10');
      } else {
        reject(new Error('Error! The number is smaller than 10'));
      }
    });
  }
};

console.log(checkDoubleDigits(15));
