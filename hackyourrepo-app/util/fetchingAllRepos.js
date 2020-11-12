// we import the variables which we are going to use
import {
  body,
  selectBox,
  mainContainer,
  url,
} from './createAllElements.js';

// functions
//this function fetches all repos names, and set them alphabetically-ordered into an Array and finally it adds those names as options in selectbox;
export function fetchingAllRepos() {
  body.appendChild(mainContainer);
  fetch(url)
    .then(res => res.json())
    .then(data => {
      // getting the repos name from the API, and put all repos's names in reposNames array. [ alphabetically-ordered as asked]
      let reposNames = data
        .map(repo => repo.name)
        .sort((a, b) => {
          if (a.toUpperCase() > b.toUpperCase()) {
            return 1;
          } else if (a.toUpperCase() < b.toUpperCase()) {
            return -1;
          } else {
            return 0;
          }
        });

      // after getting the sorted array ready , we start to set those names as options in the selection box;
      reposNames.forEach(option => {
        const createdOption = document.createElement('option');
        createdOption.innerText = option;
        selectBox.appendChild(createdOption);
      });
    })
    // handle error in the api's link, if  the data couldn't be fetched then we show the error in a new div element
    .catch(err => {
      const errorContainer = document.createElement('div');
      errorContainer.className = 'alert alert-danger w-75 mx-auto p-3';
      errorContainer.innerText = ` Ooops!! There is something went wrong !!!  `;
      body.insertBefore(errorContainer, mainContainer);
    });
}


