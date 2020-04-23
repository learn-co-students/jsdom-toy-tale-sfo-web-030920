let addToy = false;
const baseUrl = `http://localhost:3000/toys`
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
  
  fetchToys();
  // postToy();
  listenToFormSubmit();
  listenToLikeButton();
});

function fetchToys() {
  fetch(baseUrl)
    .then(resp => resp.json())
    .then(toys => renderToys(toys))
}

function renderToys(json) {
  json.forEach(toy => {
    const toyCollection = document.getElementById('toy-collection');
    const toyDiv = document.createElement('div');
    toyDiv.className = 'card';
    toyDiv.id = toy.id;
    toyDiv.innerHTML = `<h2>${toy.name}</h2><img src="${toy.image}" class="toy-avatar"><p>Likes: ${toy.likes}</p><button class="like-btn">Like <3</button`
    toyCollection.append(toyDiv)
  })
}

function renderToy(json) {
  const toyCollection = document.getElementById('toy-collection');
    const toyDiv = document.createElement('div');
    toyDiv.className = 'card';
    toyDiv.id = toy.id;
    toyDiv.innerHTML = `<h2>${toy.name}</h2><img src="${toy.image}" class="toy-avatar"><p>Likes: ${toy.likes}</p><button class="like-btn">Like <3</button`
    toyCollection.append(toyDiv)
}

function postToy() {
  const toyName = document.getElementsByName('name')[0]
  const toyImage = document.getElementsByName('image')[0]

  const postObj = {
    method: "POST",
    body: JSON.stringify({
      name: toyName.value,
      image: toyImage.value,
      likes: '0'
    }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  }

  fetch(baseUrl, postObj)
    .then(resp => resp.json())
    .then(toy => renderToy(toy))
}

function listenToFormSubmit() {
  const toyForm = document.querySelector('form');
  toyForm.addEventListener('submit', function(event) {
    event.preventDefault();
    postToy();
    // fetchToys();   (Another way to render toys on page)
  })
}

function listenToLikeButton() {
  const toyCollection = document.getElementById('toy-collection');
  toyCollection.addEventListener('click', function(event) {
    if (event.target.tagName === 'BUTTON') {
      // debugger;
      // Find toy by id and increase its likes by 1
      const toyID = event.target.parentElement.id
      const newLikes = parseInt(event.target.parentElement.getElementsByTagName('p')[0].innerText.split(" ")[1]) + 1
      const patchObj = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          likes: newLikes
        })
      }
      fetch(`${baseUrl}/${toyID}`, patchObj)
      
      // Render newLikes on the website
      const toyDivById = document.getElementById(toyID)
      toyDivById.getElementsByTagName('p')[0].innerText = `Likes: ${newLikes}`
    }
  })
}