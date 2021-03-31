const flowerUrl = "http://localhost:3000/flowers" // URL for our backend database
const petalInput = document.getElementById("number-petals") // text input for number of petals
const searchButton = document.getElementById("search-button") // search button
const flowerCardCollection = document.getElementById("flower-card-collection") // // collection (div) of all of the flower cards displayed
let allFlowersArray = [] // empty array that will be filled with all of the flower objects in our backend database

// GET the flower data
fetch(flowerUrl)
  .then(response => response.json())
  .then(flowers => {
    allFlowersArray = flowers
    flowerIterator(flowers)
  })

// Renders all flowers in the database
function flowerIterator(flowers) {
  flowers.forEach(flower => { // iterates through each flower
    renderFlower(flower) // render the flower and its information
  })
}

searchButton.addEventListener("click", searchButtonClick) // listens for click on search button and runs a function

// Search function invoked when search button is clicked
function searchButtonClick() {
  const petalQuery = petalInput.value // set search query to the text value of the petal input
  flowerCardCollection.innerHTML = "" // resets the collection of flower cards
  allFlowersArray.forEach(flower => { // iterates through the list of flowers
    if (flower.petals == petalQuery) { // checks to see if the number of petals for each flower matches the search query
      renderFlower(flower) // if the search query matches, render the flower card
    }
  })
}

// Renders the flower card on the page
function renderFlower(flower) {
  createFlowerCard(flower)
  flowerNameDisplay(flower)
  flowerImageDisplay(flower)
  flowerDetailsDisplay(flower)
}

// Create a flower card
function createFlowerCard(flower) {
  const flowerCard = document.createElement("div") // create a div for the card
  const flowerCardCollection = document.getElementById("flower-card-collection") // grab the parent div
  flowerCard.id = flower.name // set the id of the flower card div to its name
  flowerCard.className = "flower-card"
  flowerCardCollection.appendChild(flowerCard) // append the flower card to the collection
}

// Display flower name in the card
function flowerNameDisplay(flower) {
  const flowerName = document.createElement("h1") // create an h1
  flowerName.className = "flower-name" // set the class name
  flowerName.textContent = flower.name // set the text content to the name of the flower from the database
  document.getElementById(flower.name).appendChild(flowerName) // append the name to the flower card
}

// Display flower image inside of the card
function flowerImageDisplay(flower) {
  const flowerImage = document.createElement("img") // create an image element
  flowerImage.src = flower.photo // set the image source to the url from the backend database
  document.getElementById(flower.name).appendChild(flowerImage) // append the image to the flower card
}

// Display flower details in the card
function flowerDetailsDisplay(flower) {
  const flowerList = document.createElement("ul") // create an unordered list
  const flowerPetals = document.createElement("li") // create a list item for petals
  const flowerColor = document.createElement("li") // create a list item for color
  flowerPetals.textContent = `Number of petals: ${flower.petals}` // set the text of the petals list item to the number from the database
  flowerColor.textContent = `Color: ${flower.color}` // set the text of the color list item to the color from the database
  document.getElementById(flower.name).appendChild(flowerList) // append the unordered list to the flower card
  flowerList.append(flowerPetals, flowerColor) // append the list items to the unordered list
}
