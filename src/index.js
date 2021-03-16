let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const newToyForm = document.querySelector('.add-toy-form')
  const toyCollectionWrapper = document.querySelector('#toy-collection')
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toys => {toyCollectionWrapper.innerHTML += toys.map(toy => {
      return (
        `<div class="card">
          <h2>${toy.name}</h2>
          <img src=${toy.image} class="toy-avatar" />
          <p>${toy.likes} Likes </p>
          <button class="like-btn">Like <3</button>
        </div>`
      )
    }).join('')
  })

  

  newToyForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const newToyInfo = Object.fromEntries(new FormData(e.target).entries());
    const url = 'http://localhost:3000/toys'
    const config = {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({...newToyInfo, likes: 0}) 
    }
    fetch(url, config)  
  })


});
