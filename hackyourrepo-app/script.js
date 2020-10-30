'use strict';

const placeholderRepos = [
  {
    name: 'SampleRepo1',
    description: 'This repository is meant to be a sample',
    forks: 5,
    updated: '2020-05-27 12:00:00',
  },
  {
    name: 'AndAnotherOne',
    description: 'Another sample repo! Can you believe it?',
    forks: 9,
    updated: '2020-05-27 12:00:00',
  },
  {
    name: 'HYF-Is-The-Best',
    description:
      "This repository contains all things HackYourFuture. That's because HYF is amazing!!!!",
    forks: 130,
    updated: '2020-05-27 12:00:00',
  },
];

// variables
const selectBox = document.getElementById('select');
const reposContainer = document.querySelector('.repo-result');
const repoData = document.getElementById('repo');
const descritopnData = document.getElementById('desc');
const forkData = document.getElementById('fork');
const updateData = document.getElementById('update');

// function that will create our selections in the select box, taking data from array placeholderRepos
function createSelections() {
  placeholderRepos.forEach(el => {
    const repoName = el.name;
    const createdOption = document.createElement('option');
    createdOption.innerText = repoName;
    selectBox.appendChild(createdOption);
  });
}

// function to fill the sections with the data from the selected repo ;

function fillSectionsWithRepoData() {
  let selectedRepoValue = selectBox.value;
  let selectedRepoData = placeholderRepos.map((el, index) => {

    // catch the selected element from the array, and append it's value to the section repo results
    if (el.name === selectedRepoValue) {
      reposContainer.style.display = 'block'
      repoData.innerText = placeholderRepos[index].name;
      descritopnData.innerText = placeholderRepos[index].description;
      forkData.innerText = placeholderRepos[index].forks;
      updateData.innerText = placeholderRepos[index].updated;
      
    }
  });
}

// when page is fully loaded, fire function to create our selections from the placrholder array
window.addEventListener('load', createSelections);
// when selection is made, fire the function that will fill it's data to the section
selectBox.addEventListener('change', fillSectionsWithRepoData);
