// get all Mosters

//QESTION NR 1 how to do: When the page loads, show the first 50 monsters
// _limit=[number] - limit the number of monsters returned
// _page=[number] - offset your request for monsters to some page (must specify a limit)

const url = 'http://localhost:3000/monsters';

function getAllMonsters() {
  return fetch(url)
    .then((response) => response.json())
    .then(function renderMonsters(monstersArray) {
      showAllMonsters(monstersArray);
    })
    .catch(function handleError(error) {
      console.error(error);
    });
}

function renderMonsters(monstersArray) {
    showAllMonsters(monstersArray);
    return monstersArray;
  }

// show all Monsters with name,age, description

function showAllMonsters(monstersArray) {
  monstersArray.forEach(function (monster) {
    addOneMonster(monster);
  })

  const body = document.querySelector('body')

  const showButton = document.createElement('button');
  showButton.innerText = "Load the next 50 Monsters"

  body.append(showButton)

}

// add one Monsters
function addOneMonster(monster) {
  const divMonsterContainer = document.querySelector('#monster-container');

  const div = document.createElement('div');
  div.className = 'show-monster';

  const h1 = document.createElement('h1');
  h1.innerText = 'Name Monster: ' + monster.name;

  const h2 = document.createElement('h2');
  h2.innerText = 'Age Monster: ' + monster.age;

  const p = document.createElement('p');
  p.innerText = monster.description;

  div.append(h1, h2, p);
  // console.log(div);
  divMonsterContainer.append(div);
}

// form for new monster, fields for name, age, description, button "Create Monster Button"

// ---------------create the form
// QUESTION??? NEED I FUNCTION FOR IT AND HOW OT INVOKE IT

const divCreateMonster = document.querySelector('#create-monster');
// console.log('divCreateMonster');

const form = document.createElement('form');

const inputForName = document.createElement('input');
inputForName.placeholder = 'name';

const inputForAge = document.createElement('input');
inputForAge.placeholder = 'age';

const inputForDescription = document.createElement('input');
inputForDescription.placeholder = 'description';

const button = document.createElement('button');
button.innerText = 'Create Monster Button';

form.append(inputForName, inputForAge, inputForDescription, button);
// console.log(form);
// debugger
divCreateMonster.append(form);
// console.log(divCreateMonster);

form.addEventListener('submit', function (event) {
  event.preventDefault();
  console.log(event);
//   debugger;

  const newObject = {
    name: event.target.children[0].value,
    age: event.target.children[1].value,
    description: event.target.children[2].value,
  };

  post(newObject);
});

function post(newObject) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(newObject),
  })
    .then((response) => response.json())
    .then(function (bookObject) {
      addOneMonster(newObject);
    })
    .catch(function (error) {
      console.error(error);
    });
}

// add the monster to the list and saved in API

// end of the list of Monster, show Button => show next 50 mosters

// invoke the master function
getAllMonsters();