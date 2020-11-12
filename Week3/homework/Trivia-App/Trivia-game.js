'use strict';

// variables

const url = 'https://opentdb.com/api.php?amount=5';
const gameContainer = document.querySelector('.app-container');

function main() {
  // getting the data from the api
  async function fetchingData(url) {
    try {
      const data = await fetch(url);
      const parsedData = await data.json();

      return parsedData;
    } catch (error) {
      const errorContainer = document.createElement('div');
      errorContainer.innerHTML = `${error}`;
      gameContainer.appendChild(errorContainer);
      errorContainer.classList.add('error');
      throw new Error('Something went wrong:', error);
    }
  }

  // after getting the data from the api we create a function that adds the questions to the dom, inside the function we call the
  // other function which will post the answers on clicking
  function addingDataToDom(parsedData) {
    const list = document.createElement('ul');
    list.classList.add('questions-wraper');

    let allQuestionsAndAnswers = parsedData.results.map(item => {
      // replacing the &quot to nothing, but i tried to cover more than one case, but sometimes the & is in the middle of the word so this condition will
      // not be enough, i will try using the innerHTML property, i think it will work

      const replacedQuestion = item.question
        .split('&quot;')
        .join('')
        .replace(/&#039;s &quot; &api &minus &eacute; &#039;/g, '');


      // creating a list item for every question and adding a class to style them
      const createdListItemQuestion = document.createElement('li');
      createdListItemQuestion.classList.add('questions');
      createdListItemQuestion.innerHTML = ` ${replacedQuestion} `;
      list.appendChild(createdListItemQuestion);
      gameContainer.appendChild(list);

      // creating a list item with the answer after every question and hiding them by adding a class
      const replacedAnswers = item.correct_answer
        .split('&quot;')
        .join('')
        .replace(/&#039;s &quot; &api &minus &eacute; &#039;/g, '');

      const createdListItemAnswer = document.createElement('li');
      createdListItemAnswer.classList.add('hidden');
      createdListItemAnswer.innerHTML = ` ${replacedAnswers} `;
      list.appendChild(createdListItemAnswer);
      gameContainer.appendChild(list);
    });

    // add event listener to make the answers visible when the user clicks on a question

    let questions = document.querySelectorAll('.questions');

    questions.forEach(item => {
      item.addEventListener('click', addingAnswersOnClick);
    });
  }

  // function to make the answers visible when ever the user clicks on a question
  function addingAnswersOnClick(allAnswers) {
    this.nextSibling.classList.toggle('hidden');
    this.nextSibling.classList.toggle('visible');
  }

  fetchingData(url)
    .then(res => {
      addingDataToDom(res);
    })
    .catch(err => {
      throw new Error('Something went wrong!!!', err);
    });
}

// when the dom is ready we call our main function

window.addEventListener('load', main);
