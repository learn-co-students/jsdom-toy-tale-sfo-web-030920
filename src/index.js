let addToy = false;
const toysUrl = "http://localhost:3000/toys";
let toysSection = document.querySelector("#toy-collection");
const toyContainer = document.querySelector("#toy-collection");
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
  fetchToy();
  createToy();
});

function fetchToy() {
  fetch(toysUrl)
    .then((response) => response.json())
    .then((data) => collectionToys(data));
}

function toyCard(toy) {
  const { id, name, image, likes } = toy;
  return `
    <div class="card" id="${id}">
      <h2>${name}</h2>
      <img src=${image} class="toy-avatar" />
      <p>${likes > 0 ? likes : 0} Likes </p>
      <button class="like-btn">Like <3</button>
    </div>`;
}

function collectionToys(arr) {
  arr.forEach((toy) => {
    toysSection.innerHTML += toyCard(toy);
  });
}

function createToy() {
  const toyForm = document.querySelector(".add-toy-form");
  toyForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let image = document.getElementById("image").value;

    const toyInfo = {
      name,
      image,
      likes: 0,
    };

    const responseConf = {
      method: "POST",
      body: JSON.stringify(toyInfo),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    fetch(toysUrl, responseConf)
      .then((response) => response.json())
      .then((data) => (toysSection.innerHTML += toyCard(data)));
  });
}

function likeIncrement(toyId) {
  fetch(`${baseUrl}/${toyId}`, { method: "PATCH" });
}

toyContainer.addEventListener("click", (e) => {
  console.log(e.target.parentElement.id);
  let toyId = e.target.parentElement.id;
  let intNum = parseInt(toyId);
  let pTag = e.target.parentElement.getElementsByTagName("p");
  console.log(intNum);
  console.log(pTag[0].innerText.split("")[0]);
  previousCountLikes = pTag[0].innerText.split("")[0];
  console.log(previousCountLikes);
  likes = parseInt(previousCountLikes) + 1;
  console.log(likes);

  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      likes: likes,
    }),
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
});
