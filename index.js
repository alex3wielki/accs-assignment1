console.log('works');
let games = [
  {
    'publisher': 'Namco',
    'avatar': 'https://archive.org/services/img/msdos_Pac-Man_1983',
    'title': 'Pac-Man',
    'desc': 'Pac-Man stars a little, yellow dot-muncher who works his way around to clear a maze of the dots.',
    'publishedDate': '1983',
    'link': 'https://archive.org/embed/msdos_Pac-Man_1983'
  },
  {
    'publisher': 'Broderbund',
    'avatar': 'https://archive.org/services/img/msdos_Where_in_the_World_is_Carmen_Sandiego_1985',
    'title': 'Where in the World is Carmen Sandiego',
    'desc': 'Capture the thief that stole the artifact using clues dealing with your knowledge of geography.',
    'publishedDate': '1985',
    'link': 'https://archive.org/embed/msdos_Where_in_the_World_is_Carmen_Sandiego_1985'
  },
  {
    'publisher': 'Ingenuity',
    'avatar': 'https://archive.org/services/img/msdos_Crosscountry_Canada_1991',
    'title': 'Crosscountry Canada',
    'desc': 'Drive an 18-wheel truck picking up and delivering a variety of commodities with typed-in commands.',
    'publishedDate': '1991',
    'link': 'https://archive.org/embed/msdos_Crosscountry_Canada_1991'
  }
]

function renderLeftElement(game) {
  let snippet = `
  <div class="email-item pure-g">
    <div class="pure-u">
      <img alt="${game.title == '' || game.title == undefined || game.title == null ? '' : game.title + "'s avatar"}"
        class="email-avatar" src="${game.avatar == '' || game.avatar == undefined || game.avatar == null ? '' : game.avatar}"
        width="64" height="64">
    </div>
    <div class="pure-u-3-4">
      <h5 class="email-name">
        ${game.publisher == '' || game.publisher == undefined || game.publisher == null ? '' : game.publisher} 
        ${game.publishedDate == '' || game.publishedDate == undefined || game.publishedDate == null ? '' : game.publishedDate}
      </h5>
      <h4 class="email-subject">${game.title == '' || game.title == undefined || game.title == null ? '' : game.title}</h4>
      <p class="email-desc">${game.desc == '' || game.desc == undefined || game.desc == null ? '' : game.desc}</p>
    </div>
  </div>`
  return snippet;
}

function renderContentSnippet(game) {
  let snippet = `
  <div class="email-content">
    <div class="email-content-header pure-g">
      <div class="pure-u-1-2">
        <h1 class="email-content-title">${game.title == '' || game.title == undefined || game.title == null ? '' : game.title}</h1>
        <p class="email-content-subtitle">
            ${game.publisher == '' || game.publisher == undefined || game.publisher == null ? '' : 'Published by:' + game.publisher} 
            ${game.publishedDate == '' || game.publishedDate == undefined || game.publishedDate == null ? '' : game.publishedDate}
        </p>
      </div>

      <div class="email-content-controls pure-u-1-2">
        <button class="secondary-button pure-button">Delete</button>
        <button class="secondary-button pure-button">Archive</button>
        <button class="secondary-button pure-button">Unread</button>
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
  </div>`
  return snippet;
}

function remove(id) {
  let elem = document.querySelector(id);
  return elem.parentNode.removeChild(elem);
}

function renderRightContent(snippet) {
  document.querySelector('.rightSidebar').insertAdjacentHTML('beforeend', snippet);
}

let elementSelected = { id: 0 };

function removeClass(leftElems, prevElem) {
  leftElems[prevElem].classList.remove('email-item-selected');
}

function setClass(leftElems, currElem) {
  leftElems[currElem].classList.add('email-item-selected');
  return currElem;
}

function resetEventListeners(leftElements,rightContent){
  for (let i = 0; i < leftElements.length; i++) {
    leftElements[i].addEventListener('click', () => {
      remove('.email-content');
      renderRightContent(rightContent[i]);
      removeClass(leftElements, elementSelected.id);
      elementSelected.id = setClass(leftElements, i);
      // Can't believe this actually works... Recurrsion is beautiful
    })
  }
}

function renderLeftContent() {
  let leftItems = games.map(game => (renderLeftElement(game))).join('');
  document.querySelector('.leftSidebar').insertAdjacentHTML('beforeend', leftItems);
}

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


document.addEventListener('DOMContentLoaded', () => {
  renderLeftContent();
  let rightContent = Array.from(games.map(game => renderContentSnippet(game)));
  renderRightContent(rightContent[0]);
  // We land on the first game in the array
  let leftElements = Array.from(document.querySelectorAll('.email-item'));
  // console.log(leftElements);
  elementSelected.id = setClass(leftElements, 0);
  resetEventListeners(leftElements,rightContent);
});

let addNewItemButton = document.querySelector('#addNewItem');
addNewItemButton.addEventListener('click', () => {
  remove('.email-content');
  document.querySelector('.rightSidebar').insertAdjacentHTML('beforeend', form);
  let submitButton = document.querySelector('#submit-button');
  submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    let input = Array.from(document.querySelectorAll('input'));
    games.unshift(
      {
        publisher: input[0],
        avatar: [1],
        title: input[2],
        desc: input[3],
        publishedDate: input[4],
        link: input[5]
      });
    let leftElements = Array.from(document.querySelectorAll('.email-item'));
    for (let i = 0; i < leftElements.length; i++) {
      remove('.email-item');
    }
    renderLeftContent();
    resetEventListeners(leftElements);
  })
})


/*
for (let i = 0; i < leftElements.length; i++) {
  leftElements[i].addEventListener('click', () => {
    //Uncheck the last one, check the new one.
    for (let j = 0; j < leftElements.length; j++) {
      leftElements[j].classList.remove('email-item-selected');
    }
    leftElements[i].classList.add('email-item-selected');
  })
}
*/