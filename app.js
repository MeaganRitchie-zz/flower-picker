const flowerUrl = "http://localhost:3000/flowers"
const petalInput = document.getElementById("number-petals")
const searchButton = document.getElementById("search-button")
const flowerCardCollection = document.getElementById("flower-card-collection")
let allFlowersArray = []
searchButton.addEventListener("click", searchButtonClick)


// Listen for search button click
function searchButtonClick() {
  const petalQuery = petalInput.value
  flowerCardCollection.innerHTML = ""
  allFlowersArray.forEach(flower => {
    console.log(flower.petals)
    if (flower.petals == petalQuery) {
      renderFlower(flower)
    }
  })
}

// GET the flower data
fetch(flowerUrl)
  .then(response => response.json())
  .then(flowers => {
    allFlowersArray = flowers
    // createFlowerCard(flowers) // creates a flower card
    // flowerNameDisplay(flowers)
    // flowerImageDisplay(flowers) // display flower image
    // flowerDetailsDisplay(flowers)
    flowerIterator(flowers)
  })
function renderFlower(flower) {
  createFlowerCard(flower)
  flowerNameDisplay(flower)
  flowerImageDisplay(flower)
  flowerDetailsDisplay(flower)
}

function flowerIterator(flowers) {
  flowers.forEach(flower => {
    renderFlower(flower)
  })
}
// Create a flower card
function createFlowerCard(flower) {
  const flowerCard = document.createElement("div")
  const flowerCardCollection = document.getElementById("flower-card-collection")
  flowerCard.id = flower.name
  flowerCardCollection.appendChild(flowerCard)
}

// Display flower name in the card
function flowerNameDisplay(flower) {
  const flowerName = document.createElement("h1")
  flowerName.textContent = flower.name
  document.getElementById(flower.name).appendChild(flowerName)
}

// Display flower image inside of the card
function flowerImageDisplay(flower) {
  const flowerImage = document.createElement("img")
  flowerImage.src = flower.photo
  document.getElementById(flower.name).appendChild(flowerImage)
}

// Display flower details in the card
function flowerDetailsDisplay(flower) {
  const flowerList = document.createElement("ul") // create an unordered list
  const flowerPetals = document.createElement("li") // create a list item
  const flowerColor = document.createElement("li")
  flowerPetals.textContent = `Number of petals: ${flower.petals}` // set the text of the list item
  flowerColor.textContent = `Color: ${flower.color}`
  document.getElementById(flower.name).appendChild(flowerList) // append the unordered list to the flower card
  flowerList.append(flowerPetals, flowerColor)
}
