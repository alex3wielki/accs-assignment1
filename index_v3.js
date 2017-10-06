console.log('testing v3');
let selectedGame = 0;

let trashLink = document.getElementById('trash-button')

let inboxLink = document.getElementById('inbox-button');

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

let games = [{
    'id': 0,
    'publisher': 'Namco',
    'avatar': 'https://archive.org/services/img/msdos_Pac-Man_1983',
    'title': 'Pac-Man',
    'desc': 'Pac-Man stars a little, yellow dot-muncher who works his way around to clear a maze of the dots.',
    'publishedDate': '1983',
    'link': 'https://archive.org/embed/msdos_Pac-Man_1983',
    'deleted': false
  },
  {
    'id': 1,
    'publisher': 'Broderbund',
    'avatar': 'https://archive.org/services/img/msdos_Where_in_the_World_is_Carmen_Sandiego_1985',
    'title': 'Where in the World is Carmen Sandiego',
    'desc': 'Capture the thief that stole the artifact using clues dealing with your knowledge of geography.',
    'publishedDate': '1985',
    'link': 'https://archive.org/embed/msdos_Where_in_the_World_is_Carmen_Sandiego_1985',
    'deleted': false
  },
  {
    'id': 2,
    'publisher': 'Ingenuity',
    'avatar': 'https://archive.org/services/img/msdos_Crosscountry_Canada_1991',
    'title': 'Crosscountry Canada',
    'desc': 'Drive an 18-wheel truck picking up and delivering a variety of commodities with typed-in commands.',
    'publishedDate': '1991',
    'link': 'https://archive.org/embed/msdos_Crosscountry_Canada_1991',
    'deleted': false
  }
]

function renderContentSnippet(index) {
  let contentSnippets = Array.from(games.map((game) => (`
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
          <button id="delete-button" class="secondary-button pure-button ${games[index].deleted ? 'deleted-pressed' : ''}
           "data-id='${index}'>${games[index].deleted ? 'Deleted' : 'Delete'}</button>
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
    </div>`)));

  let content = document.querySelector('.rightSidebar');
  content.innerHTML = contentSnippets[index];

  let deleteButton = document.getElementById('delete-button');
  deleteButton.addEventListener('click', function (e) {
    e.preventDefault();
    if (!games[this.dataset.id].deleted) {
      games[this.dataset.id].deleted = true;

      setLocalStorage();

      let inboxGames = games.filter(game => game.deleted != true);
      selectedGame = 0;
      renderMenu(inboxGames);
    } else {
      games[this.dataset.id].deleted = false;

      setLocalStorage();

      let deletedGames = games.filter(game => game.deleted === true);
      selectedGame = 0;
      renderMenu(deletedGames);
    }
  })
}

function setLocalStorage() {
  localStorage.setItem('games', JSON.stringify(games));
}

function renderMenu(games) {
  let menuSnippets = games.map((game, index) => (`
  <div class="email-item pure-g" data-id="${index}">
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
  </div>`)).join('');
  let menu = document.querySelector('.leftSidebar');
  menu.innerHTML = menuSnippets;
  initialize(games);
}

function initialize(games) {
  let menuItems = [...(document.querySelectorAll('[data-id]'))]; // [... ] = Array.from
  menuItems.map((item, index) => item.addEventListener('click', function (e) {
    // Turns out this does not work with ()=>{};
    menuItems[selectedGame].classList.remove('email-item-selected');
    this.classList.add('email-item-selected');
    selectedGame = index;
    renderContentSnippet(selectedGame);
  }));
  if (games.length) {
    menuItems[selectedGame].classList.add('email-item-selected');
    renderContentSnippet(selectedGame);
  } else {
    document.getElementById('main').innerHTML = `<h1 class ='email-content-title'> Sorry! No emails found! </h1>`
  }
}

document.addEventListener('DOMContentLoaded', function () {
  if (localStorage.getItem('games')) {
    games = JSON.parse(localStorage.getItem('games'));
  }
  let inboxGames = games.filter(game => game.deleted != true);
  renderMenu(inboxGames);

  inboxLink.addEventListener('click', function (e) {
    e.preventDefault();
    let inboxGames = games.filter(game => game.deleted != true);
    selectedGame = 0;
    renderMenu(inboxGames);
  })

  trashLink.addEventListener('click', function (e) {
    e.preventDefault();
    let filtered = games.filter(game => game.deleted === true)
    selectedGame = 0;
    renderMenu(filtered);
  })

  document.getElementById('addNewItem').addEventListener('click', function () {
    document.getElementById('main').innerHTML = form;
    document.getElementById('submit-button').addEventListener('click', function (e) {
      e.preventDefault()
      let input = Array.from(document.querySelectorAll('input'));
      console.log(input[0].value);
      games.unshift({
        publisher: input[0].value,
        avatar: [1].value,
        title: input[2].value,
        desc: input[3].value,
        publishedDate: input[4].value,
        link: input[5].value,
        deleted: false
      });
      setLocalStorage();
      inboxLink.click();
    })
  })
})