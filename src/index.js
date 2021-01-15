let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  fetchAllToys();
  addToyEvent();
});

function fetchAllToys() {
  const toyDiv = document.getElementById("toy-collection");
  fetch("http://localhost:3000/toys")
    .then((resp) => resp.json())
    .then((object) =>
      object.forEach((toy) => {
        const toyCard = document.createElement("div");
        toyCard.className = "card";
        const toyHeader = document.createElement("h2");
        toyHeader.innerText = toy.name;
        toyCard.appendChild(toyHeader);
        const toyImage = document.createElement("img");
        toyImage.src = toy.image;
        toyImage.className = "toy-avatar";
        toyCard.appendChild(toyImage);
        const toyPar = document.createElement("p");
        toyPar.innerText = `${toy.likes} likes`;
        toyCard.appendChild(toyPar);
        const toyBtn = document.createElement("button");
        toyBtn.className = "like-btn";
        toyBtn.innerText = "Like <3";
        toyBtn.id = toy.id;
        toyBtn.addEventListener("click", addLike);
        toyCard.appendChild(toyBtn);
        toyDiv.appendChild(toyCard);
      })
    );
}

function postNewToy(newToy) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: newToy.target.name.value,
      image: newToy.target.image.value,
      likes: 0,
    }),
  });
}
function addToyEvent() {
  const newToyForm = document.getElementsByClassName("add-toy-form");
  newToyForm[0].addEventListener("submit", postNewToy);
}

function addLike(event) {
  fetch(`http://localhost:3000/toys/${event.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      likes:
        parseInt(
          event.target.parentElement.querySelector("p").innerText.split(" ")[0]
        ) + 1,
    }),
  });
  let plusLike =
    parseInt(
      event.target.parentElement.querySelector("p").innerText.split(" ")[0]
    ) + 1;
  event.target.parentElement.querySelector("p").innerText = `${plusLike} likes`;
}
