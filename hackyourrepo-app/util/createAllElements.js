// variables , to create all html elemnts using only javascript

const body = document.querySelector('body');
const header = document.createElement('header');
const nav = document.createElement('nav');
const h4 = document.createElement('h4');
const selectBox = document.createElement('select');
const defaultOption = document.createElement('option');
const mainContainer = document.createElement('div');
const sectionReposContainer = document.createElement('section');
const sectionContributorsContainer = document.createElement('section');
const reposResult = document.createElement('div');
const contributorsResult = document.createElement('div');
const reposTable = document.createElement('table');
const contributorsUl = document.createElement('ul');
const url = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';

export function createAllElements() {
  // appending elemnts to thier containers and adding the classes to get the same old style

  body.appendChild(header);
  header.classList.add('main-header');

  header.appendChild(nav);
  nav.classList.add('main-nav');

  nav.appendChild(h4);
  h4.innerText = 'HYF Repositories';
  nav.appendChild(selectBox);

  selectBox.setAttribute('id', 'select');
  selectBox.appendChild(defaultOption);

  defaultOption.disabled = true;
  defaultOption.selected = true;
  defaultOption.innerText = 'Select a Repo';

  body.appendChild(mainContainer);
  mainContainer.classList.add('main-container');

  mainContainer.appendChild(sectionReposContainer);
  sectionReposContainer.classList.add('output-repos');

  sectionReposContainer.appendChild(reposResult);
  reposResult.className = 'repo-result shadow p-3 mb-1 mt-1 bg-white rounded';

  reposResult.appendChild(reposTable);

  mainContainer.appendChild(sectionContributorsContainer);
  sectionContributorsContainer.className = 'output-contributors';

  sectionContributorsContainer.appendChild(contributorsResult);
  contributorsResult.className = 'contributors-result';

  contributorsResult.appendChild(contributorsUl);

  contributorsUl.classList.add('contributors-list');

  
}



export {
  body,
  selectBox,
  mainContainer,
  sectionReposContainer,
  sectionContributorsContainer,
  reposResult,
  contributorsResult,
  reposTable,
  contributorsUl,
  url,
};
