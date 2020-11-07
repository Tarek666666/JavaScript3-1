'use strict';

function main() {
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

  // functions
  //this function fetches all repos names, and set them alphabetically-ordered into an Array and finally it adds those names as options in selectbox;
  function fetchingAllRepos() {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        // getting the repos name from the API, and put all repos's names in reposNames array. [ alphabetically-ordered as asked]
        let reposNames = data.map(repo => repo.name).sort((a,b) => {
          if (a.toUpperCase() > b.toUpperCase()){
            return 1
          } else if (a.toUpperCase() < b.toUpperCase() ){
            return -1
          } else { return 0}
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

  // this function will be used to listen to the selections, and fetch the data of the specific selected repo , then it adds the information to the dom
  function addSelectedRepo() {
    const selectedRepo = selectBox.value;
    // fetching the selected repo data from github api

    fetch(`https://api.github.com/repos/HackYourFuture/${selectedRepo}`)
      .then(res => res.json())
      .then(data => {
        // to make section visible
        reposResult.style.display = 'block';
        reposTable.innerHTML = ` <tr>
                                      <td><span>Repository:</span></td>
                                      <td id="repo">${data.name}</td>
                                      </tr>
                                      <tr>
                                        <td><span>Description:</span></td>
                                        <td id="desc">${
                                          data.description === null
                                            ? 'Unfortunately There is no Description for this repo !!!'
                                            : data.description
                                        }</td>
                                      </tr>
                                      <tr>
                                        <td><span>Fork:</span></td>
                                        <td id="fork">${data.forks_count}</td>
                                      </tr>
                                      <tr>
                                        <td><span>Updated:</span></td>
                                        <td id="update">${data.updated_at
                                          .split('-')
                                          .join(' ')
                                          .replace('T', ' Time: ')
                                          .replace('Z', '')} </td>
                                 </tr>  `;
        //also checking when there is no description for the repo ,then we add class red, to make the sentences red
        if (
          document.getElementById('desc').innerText ==
          'Unfortunately There is no Description for this repo !!!'
        ) {
          document.getElementById('desc').classList.add('red');
        }
        // here after getting the result from the first fetch we return a new fetch to get the contributers's information, it returns a promise we will
        // handle it to publish the data on dom
        return fetch(data.contributors_url);
      })
      .then(res => res.json())
      .then(data => {
        contributorsUl.innerHTML = `<li class="shadow-sm p-3 mb-1 bg-light rounded">
                                         Contributors
                                  </li>`;
        // handle the case when there are no contributors, then we write that result on the li that holds contributors word,
        if (data.length === 0) {
          contributorsUl.innerHTML = `<li class="shadow-sm p-3 mb-1 alert alert-danger rounded">
                                         There is no Contributions on this Repo !!!
                                  </li>`;
        }
        // otherwise we show the contributors's information in the section
        data.forEach(contributor => {
          let createdListItem = document.createElement('li');
          createdListItem.className = 'shadow p-3 mb-1 bg-white rounded';
          let createdContributorImg = document.createElement('img');
          createdContributorImg.src = `${contributor.avatar_url}`;
          let createdLink = document.createElement('a');
          createdLink.innerText = `${contributor.login}`;
          createdLink.className = 'ml-3 text-primary';
          createdLink.href = `${contributor.html_url}`;
          createdLink.target = '_blank';
          let createdSpan = document.createElement('span');
          createdSpan.className = 'badge badge-secondary float-right';
          createdSpan.innerText = `${contributor.contributions}`;
          contributorsUl.appendChild(createdListItem);
          createdListItem.appendChild(createdContributorImg);
          createdListItem.appendChild(createdLink);
          createdListItem.appendChild(createdSpan);
        });
      })
      .catch(err => {
        const errorContainer = document.createElement('div');
        errorContainer.className = 'alert alert-danger w-75 mx-auto p-3';
        errorContainer.innerText = ` Ooops!! There is something went wrong !!! `;
        body.insertBefore(errorContainer, mainContainer);
        reposResult.style.display = 'none';
      });
  }

  fetchingAllRepos();
  selectBox.addEventListener('change', addSelectedRepo);
}

window.addEventListener('load', main);








