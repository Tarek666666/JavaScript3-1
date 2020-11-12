/* In this exercise you'll practice refactoring Promise syntax into async/await + try/catch syntax. Rewrite exercise A & B using async/await + try/catch syntax.*/

// Exercise A
function getData(url) {
  fetch(url)
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => console.log(error));
}

getData('https://randomfox.ca/floof/');

// --------------------------------------------------------------------------------//

async function getData2(url) {
  try {
    let response = await fetch(url);
    let parsedResponse = await response.json();
    console.log(parsedResponse);
  } catch (error) {
    console.log(`Something Went wrong: ${error}`);
  }
}

getData2('https://randomfox.ca/floof/');

// Exercise B
const arrayOfWords = ['cucumber', 'tomatos', 'avocado'];

const makeAllCaps = array => {
  return new Promise((resolve, reject) => {
    let capsArray = array.map(word => {
      if (typeof word === 'string') {
        return word.toUpperCase();
      } else {
        reject('Error: Not all items in the array are strings!');
      }
    });
    resolve(capsArray);
  });
};

makeAllCaps(arrayOfWords)
  .then(result => console.log(result))
  .catch(error => console.log(error));

// --------------------------------------------------------------------------------//

const makeAllCapsAsync = async array => {
  let capsArray;

  try {
    capsArray = await array.map(word => {
      if (typeof word === 'string') {
        return word.toUpperCase();
      } else {
        throw new Error('Error: Not all items in the array are strings!');
      }
    });
  } catch (error) {
    console.log(error)
  }
  return capsArray;
};

makeAllCapsAsync(arrayOfWords)
  .then(res => console.log(res))
  .catch(err => console.log(err));
