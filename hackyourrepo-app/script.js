'use strict';

import { fetchingAllRepos } from './util/fetchingAllRepos.js';
import { createAllElements } from './util/createAllElements.js';
import { addSelectedRepo } from './util/addSelectedRepoData.js';
import { addContributors } from './util/addContributos.js';

function main() {
  // variables , to create all html elemnts using only javascript

  createAllElements();

  //this function fetches all repos names, and set them alphabetically-ordered into an Array and finally it adds those names as options in selectbox;
  fetchingAllRepos();

  // this function will be used to listen to the selections, and fetch the data of the specific selected repo , then it adds the information to the dom
  document.getElementById('select').addEventListener('change', addSelectedRepo);

  // this function will be used to listen to the selections, and fetch the data of the contributers and append them to the page in contributors's section
  document.getElementById('select').addEventListener('change', addContributors);

  
}

window.addEventListener('load', main);
