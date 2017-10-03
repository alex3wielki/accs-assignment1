console.log('testing');
/**
 * Global variables
 */
let pointers = {
  current_selection: 0,
  previous_selection: null,
  how_many_games_added: 0
};

let games = [{
    'id': 0,
    'publisher': 'Namco',
    'avatar': 'https://archive.org/services/img/msdos_Pac-Man_1983',
    'title': 'Pac-Man',
    'desc': 'Pac-Man stars a little, yellow dot-muncher who works his way around to clear a maze of the dots.',
    'publishedDate': '1983',
    'link': 'https://archive.org/embed/msdos_Pac-Man_1983',
    'isTrashed': false
  },
  {
    'id': 1,
    'publisher': 'Broderbund',
    'avatar': 'https://archive.org/services/img/msdos_Where_in_the_World_is_Carmen_Sandiego_1985',
    'title': 'Where in the World is Carmen Sandiego',
    'desc': 'Capture the thief that stole the artifact using clues dealing with your knowledge of geography.',
    'publishedDate': '1985',
    'link': 'https://archive.org/embed/msdos_Where_in_the_World_is_Carmen_Sandiego_1985',
    'isTrashed': false
  },
  {
    'id': 2,
    'publisher': 'Ingenuity',
    'avatar': 'https://archive.org/services/img/msdos_Crosscountry_Canada_1991',
    'title': 'Crosscountry Canada',
    'desc': 'Drive an 18-wheel truck picking up and delivering a variety of commodities with typed-in commands.',
    'publishedDate': '1991',
    'link': 'https://archive.org/embed/msdos_Crosscountry_Canada_1991',
    'isTrashed': true
  }
]

let form = `
  <div class="email-content" style="width:90%;margin: auto; margin-top: 20px;">
    <form class="form-horizontal">
      <div class="form-group row">
        <label class="col-md-4" for='publisher'>Publisher</label>
        <input class="col-md-8" type="text" id="publisher">
      </div>

      <div class="form-group row">
        <label class="col-md-4" for='avatar'>Avatar link</label>
        <input class="col-md-8" type="text" id="avatar">
      </div>

      <div class="form-group row">
        <label class="col-md-4" for="title">Title</label>
        <input class="col-md-8" type="text" id="title">
      </div>

      <div class="form-group row">
        <label class="col-md-4" for='desc'>Description</label>
        <input class="col-md-8" type="text" id="desc">
      </div>

      <div class="form-group row">
        <label class="col-md-4" for='publishedDate'>Published date:</label>
        <input class="col-md-8" type="date" id="publishedDate">
      </div>

      <div class="form-group row">
        <label class="col-md-4" for='link'>Link</label>
        <input class="col-md-8" type="text" id="link">
      </div>
      <div class="row">
        <button type="submit" id="submit-button" class="col-md-offset-3 btn btn-default">Add to library</button>
      </div>
    </form>
  </div>
`;

/**
 * Beginnig of snippet forging
 */
function createMenuSnippet(game) {
  return `
    <div class="email-item pure-g" data-id="${game.id}">
      <div class="pure-u">
        <img alt="${game.title == '' || game.title == undefined || game.title == null ? '' : game.title + "'s avatar"}"
          class="email-avatar" src="${game.avatar == '' || game.avatar == undefined || game.avatar == null ? '' : game.avatar}"
          width="64" height="64">
      </div>
      <div class="pure-u-3-4">
        <h5 class="email-name">
          ${game.publisher == '' || game.publisher == undefined || game.publisher == null ? '' : game.publisher} 
          ${game.publisheddate == '' || game.publisheddate == undefined || game.publisheddate == null ? '' : game.publisheddate}
        </h5>
        <h4 class="email-subject">${game.title == '' || game.title == undefined || game.title == null ? '' : game.title}</h4>
        <p class="email-desc">${game.desc == '' || game.desc == undefined || game.desc == null ? '' : game.desc}</p>
      </div>
    </div>`;
}

function createContentSnippet(game) {
  return `
    <div class="email-content" data-id="${game.id}">
      <div class="email-content-header pure-g">
        <div class="pure-u-1-2">
          <h1 class="email-content-title">${game.title == '' || game.title == undefined || game.title == null ? '' : game.title}</h1>
          <p class="email-content-subtitle">
              ${game.publisher == '' || game.publisher == undefined || game.publisher == null ? '' : 'published by: ' + game.publisher} 
              ${game.publisheddate == '' || game.publisheddate == undefined || game.publisheddate == null ? '' : game.publisheddate}
          </p>
        </div>

        <div class="email-content-controls pure-u-1-2">
          <button id="delete-button" class="secondary-button pure-button">delete</button>
          <button id="move-to-trash-button" class="secondary-button pure-button">trash</button>
          <button id="set-unread-button" class="secondary-button pure-button">unread</button>
        </div>
      </div>

      <div style="height: 100%;" class="email-content-body">
        <iframe src="${game.link == '' || game.link == undefined || game.link == null ? '' : game.link}"
          width="720px" height="450px"
          frameborder="0"
          webkitallowfullscreen="true"
          mozallowfullscreen="true"
          allowfullscreen>
        </iframe>
      </div>
    </div>`;
}

/**
 * Rendering content
 */
function renderGameContent(snippet) {
  document.querySelector('.rightSidebar').insertAdjacentHTML('beforeend', snippet);
}

function renderGame(index) {
  let rightContent = Array.from(games.map(game => createContentSnippet(game)));
  renderGameContent(rightContent[index]);
}

function renderInboxMenuContent() {
  let notTrashedGames = games.filter((game) => (game.isTrashed === false))
  let leftItems = notTrashedGames.map(game => createMenuSnippet(game)).join('');
  document.querySelector('.leftSidebar').innerHTML = leftItems;
  return notTrashedGames.length;
}

function renderTrashMenuContent() {
  let trashedGames = games.filter((game) => (game.isTrashed === true))
  let leftItems = trashedGames.map(game => createMenuSnippet(game)).join('');
  document.querySelector('.leftSidebar').innerHTML = leftItems;
  return trashedGames.length;
}

function renderGameToMenu(snippet, gameIndex) {
  let leftList = document.querySelector('#list');
  leftList.insertAdjacentHTML('afterbegin', snippet);
  let addedGame = document.querySelector('.email-item');
  addedGame.classList.add('email-item-unread');
  addedGame.addEventListener('click', () => {
    addedGame.classList.remove('email-item-unread');
    // pointers.current_selection = gameIndex;
    // toggleItemSelectedClass();
    toggleGameContent(gameIndex);
  });
}

function toggleGameContent(gameIndex) {
  removeElement('.email-content');
  renderGame(gameIndex);
}
/**
 * End of rendering content
 */

/**
 * Removing elements
 */
function removeElement(id) {
  let elem = document.querySelector(id);
  return elem.parentNode.removeChild(elem);
}
/**
 * End of removing elements
 */


/**
 * Adding object to array
 */
function addNewGameFromInputs() {
  let input = Array.from(document.querySelectorAll('input'));
  games.push({
    id: games.length,
    publisher: input[0].value,
    avatar: [1].value,
    title: input[2].value,
    desc: input[3].value,
    publishedDate: input[4].value,
    link: input[5].value,
    isTrashed: false
  });
}

/**
 * Updates game count in the inbox field
 */
function updateGameCount(howManyNotTrashedGames, howManyTrashedGames) {
  let label = document.querySelector('.email-count');
  label.textContent = (`(${howManyNotTrashedGames})`);
  label = document.querySelector('#trash-button .email-count');
  label.textContent = (`(${howManyTrashedGames})`);
}


/**
 * This function toggles the 'email-item-selected' class using 'pointers' I guess I could have used any global variables
 * 
 */
function toggleItemSelectedClass() {
  pointers.previous_selection = pointers.current_selection;
  let menuElements = Array.from(document.querySelectorAll('.email-item'));
  let desiredClass = 'email-item-selected';
  menuElements[pointers.previous_selection].classList.remove(desiredClass);
  menuElements[pointers.current_selection].classList.add(desiredClass);
}

/**
 * This function lets us fix the event listeners and sort of reset them
 */
function fixEventListeners() {
  let menuContent = Array.from(document.querySelectorAll('.email-item'));
  // console.log(menuContent);
  for (let i = 0; i < menuContent.length; i++) {
    menuContent[i].addEventListener('click', () => {
      toggleGameContent(i);
      pointers.current_selection = games[i].id;
      console.log(games[i].id);
      // toggleItemSelectedClass();
    })
  }
  document.querySelector('.email-item').classList.add('email-item-selected');
}

document.addEventListener('DOMContentLoaded', () => {
  let notTrashedGames = renderInboxMenuContent();
  // We land on the first game in the array
  renderGame(0);
  let trashedGames = games.filter((game) => (game.isTrashed === true));
  updateGameCount(notTrashedGames, trashedGames.length);
  // This calls renderGameContent(index);
  // console.log(leftElements);
  fixEventListeners();

  let inboxButton = document.getElementById('inbox-button');
  inboxButton.addEventListener('click', () => {
    renderInboxMenuContent();
    fixEventListeners();
  });

  let trashButton = document.getElementById('trash-button');
  trashButton.addEventListener('click', () => {
    renderTrashMenuContent();
    fixEventListeners();
  });

  let addNewItemButton = document.querySelector('#addNewItem');
  addNewItemButton.addEventListener('click', () => {
    removeElement('.email-content');
    document.querySelector('.rightSidebar').insertAdjacentHTML('beforeend', form);
    let submitButton = document.querySelector('#submit-button');
    submitButton.addEventListener('click', (e) => {
      e.preventDefault();
      addNewGameFromInputs();
      let currentGameIndex = games.length - 1; //Array starts from 0... Sometimes this makes no God damn sense
      let snippet = createMenuSnippet(games[currentGameIndex]);
      let snippetContent = createContentSnippet(games[currentGameIndex]);
      renderGameToMenu(snippet, currentGameIndex);
      updateGameCount();

      let notTrashedGames = games.filter((game) => (game.isTrashed === false))
      let trashedGames = games.filter((game) => (game.isTrashed === true));
      updateGameCount(notTrashedGames.length, trashedGames.length);
    })
  })
});