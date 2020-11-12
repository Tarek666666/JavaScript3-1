// we import the variables which we are going to use
import {
  body,
  selectBox,
  mainContainer,
  reposResult,
  reposTable,
  contributorsUl,
} from './createAllElements.js';

// this function will be used to listen to the selections, and fetch the data of the specific selected repo , then it adds the information to the dom
export function addSelectedRepo() {
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
    })
    .catch(err => {
      const errorContainer = document.createElement('div');
      errorContainer.className = 'alert alert-danger w-75 mx-auto p-3';
      errorContainer.innerText = ` Ooops!! There is something went wrong !!! `;
      body.insertBefore(errorContainer, mainContainer);
      reposResult.style.display = 'none';
    });
}

export default addSelectedRepo;
