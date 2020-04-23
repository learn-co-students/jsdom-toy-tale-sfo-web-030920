let toysSection = document.querySelector("#toy-collection");
export function fetchToy() {
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
      <p>${likes} Likes </p>
      <button class="like-btn">Like <3</button>
    </div>`;
}

function collectionToys(arr) {
  arr.forEach((toy) => {
    toysSection.innerHTML += toyCard(toy);
  });
}

// module.exports = services;