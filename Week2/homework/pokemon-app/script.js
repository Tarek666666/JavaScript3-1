function main() {
  // variables
  const allPokemonsUrl = 'http://pokeapi.co/api/v2/pokemon/?limit=151';
  const appContainer = document.createElement('div');
  const selectBox = document.createElement('select');
  const button = document.createElement('button');
  const pokeDes = document.createElement('p');
  button.innerText = 'Get All Pokemons';
  selectBox.innerHTML = ` <option disabled  selected > Pick a Pokemon</option> `;
  appContainer.appendChild(button);
  appContainer.appendChild(selectBox);
  appContainer.appendChild(pokeDes);

  // styling the pokemon photo
  let createdImg = document.createElement('img');
  createdImg.style.width = '150px';
  createdImg.style.height = '150px';
  document.querySelector('body').appendChild(appContainer);
  // styling the app container
  appContainer.classList.add('container');

  //functions
  // fetching all pokemons and thier names into the select in our page
  function fetchPokemons() {
    fetch(allPokemonsUrl)
      .then(res => res.json())
      .then(data => {
        let results = data.results;

        results.forEach(el => {
          let createdSelection = document.createElement('option');
          createdSelection.innerText = el.name;
          selectBox.appendChild(createdSelection);
        });
      })
      .catch(err => {
        throw new Error('Something went wrong !!', err);
      });
  }
  // fetching the data of the selected pokemon , to append the photo of the selected pokemon to the page
  function addPokemonToDom() {
    let selectedPokemon = selectBox.value;

    fetch(`http://pokeapi.co/api/v2/pokemon/${selectBox.value}`)
      .then(res => res.json())
      .then(data => {
        createdImg.src = data.sprites.front_default;
        pokeDes.innerHTML = `The wieght of this pokemon is : <span>${data.weight}</span> kg.`;
      })
      .catch(err => {
        throw new Error('Something went wrong !!', err);
      });
    appContainer.appendChild(createdImg);
  }

  button.addEventListener('click', fetchPokemons);
  selectBox.addEventListener('change', addPokemonToDom);
}

window.addEventListener('load', main);
