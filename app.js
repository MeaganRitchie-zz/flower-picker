const flowerUrl = "http://localhost:3000/flowers" // URL for our backend database
const petalInput = document.getElementById("number-petals") // text input for number of petals
const searchButton = document.getElementById("search-button") // search button
const flowerCardCollection = document.getElementById("flower-card-collection") // // collection (div) of all of the flower cards displayed
const colorInput = document.getElementById("flower-color")
const heightInput = document.getElementById("flower-height")
let allFlowersArray = [] // empty array that will be filled with all of the flower objects in our backend database


// we need a function that takes an empty array and looks for unique values for a particular key in the flowers database. Then, put those unique values into the empty array

// Populate the petal dropdown
function petalDropdownPopulate(flowers) {
  const petalNumberArray = []
  allFlowersArray.forEach(flower => { // make an array with all of the unique numbers of petals
    if (petalNumberArray.includes(flower.petals)) {
    }
    else {
      petalNumberArray.push(flower.petals)
    }
  })
  petalNumberArray.forEach(number => {
    const dropdownOption = document.createElement("option") // create an option element
    dropdownOption.textContent = number // sets the text content to a number of petals
    petalInput.append(dropdownOption)
  })
}

// Populate the color dropdown
function colorDropdownPopulate(flowers) {
  const flowerColorArray = []
  allFlowersArray.forEach(flower => { // make an array with all of the unique numbers of petals
    if (flowerColorArray.includes(flower.color)) {
    }
    else {
      flowerColorArray.push(flower.color)
    }
  })
  flowerColorArray.forEach(color => {
    const dropdownOption = document.createElement("option") // create an option element
    dropdownOption.textContent = color // sets the text content to a number of petals
    colorInput.append(dropdownOption)
  })
}
//Populate the height dropdown
function heightDropdownPopulate(flowers) {
  const flowerHeightArray = []
  allFlowersArray.forEach(flower => { // make an array with all of the unique numbers of petals
    if (flowerHeightArray.includes(flower.height)) {
    }
    else {
      flowerHeightArray.push(flower.height)
    }
  })
  flowerHeightArray.forEach(height => {
    const dropdownOption = document.createElement("option") // create an option element
    dropdownOption.textContent = height // sets the text content to a number of petals
    heightInput.append(dropdownOption)
  })
}

// GET the flower data
fetch(flowerUrl)
  .then(response => response.json())
  .then(flowers => {
    allFlowersArray = flowers
    flowerIterator(flowers)
    petalDropdownPopulate(flowers)
    colorDropdownPopulate(flowers)
    heightDropdownPopulate(flowers)
  })

// Renders all flowers in the database
function flowerIterator(flowers) {
  flowerCardCollection.innerHTML = ""
  flowers.forEach(flower => { // iterates through each flower
    renderFlower(flower) // render the flower and its information
  })
}

searchButton.addEventListener("click", searchButtonClick) // listens for click on search button and runs a function

// Search function invoked when search button is clicked
function searchButtonClick() {
  const colorQuery = colorInput.value // set color query to the text value of the color input
  const petalQuery = petalInput.value // set petal query to the text value of the petal input
  const heightQuery = heightInput.value

  let filteredFlowerArray1 = []
  if (colorQuery !== "no-filter") {
    allFlowersArray.forEach(flower => { // iterates through the list of flowers
      if (flower.color == colorQuery) { // checks to see if the number of petals for each flower matches the search query
        filteredFlowerArray1.push(flower)
      }
    })
  } else {
    filteredFlowerArray1 = allFlowersArray
  }

  let filteredFlowerArray2 = []
  if (petalQuery !== "no-filter") {
    filteredFlowerArray1.forEach(flower => { // iterates through the list of flowers
      if (flower.petals == petalQuery) { // checks to see if the number of petals for each flower matches the search query
        filteredFlowerArray2.push(flower)
      }
    })
  } else {
    filteredFlowerArray2 = filteredFlowerArray1
  }

  let filteredFlowerArray3 = []
  if (heightQuery !== "no-filter") {
    filteredFlowerArray2.forEach(flower => { // iterates through the list of flowers
      if (flower.height == heightQuery) { // checks to see if the number of petals for each flower matches the search query
        filteredFlowerArray3.push(flower)
      }
    })
  } else {
    filteredFlowerArray3 = filteredFlowerArray2
  }

  flowerIterator(filteredFlowerArray3)

  // flowerCardCollection.innerHTML = "" // resets the collection of flower cards
  // allFlowersArray.forEach(flower => { // iterates through the list of flowers
  //   if (flower.petals == petalQuery) { // checks to see if the number of petals for each flower matches the search query
  //     renderFlower(flower) // if the search query matches, render the flower card
  //   }
  // })
}

// Renders the flower card on the page
function renderFlower(flower) {
  createFlowerCard(flower)
  flowerImageDisplay(flower)
  flowerNameDisplay(flower)
  flowerDetailsDisplay(flower)
  detailOpenButtonDisplay(flower)
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
  const flowerHeight = document.createElement("li")
  flowerPetals.textContent = `Number of petals: ${flower.petals}` // set the text of the petals list item to the number from the database
  flowerColor.textContent = `Color: ${flower.color}` // set the text of the color list item to the color from the database
  flowerHeight.textContent = `Average height: ${flower.height} inches`
  document.getElementById(flower.name).appendChild(flowerList) // append the unordered list to the flower card
  flowerList.append(flowerPetals, flowerColor, flowerHeight) // append the list items to the unordered list
}

// Create a detail open button
function detailOpenButtonDisplay(flower) {
  const detailOpenButton = document.createElement("button") // create button
  detailOpenButton.id = `${flower}-detail-button` // set button id
  detailOpenButton.className = "open-button" // set class name
  detailOpenButton.innerHTML = "details" // set button text
  document.getElementById(flower.name).appendChild(detailOpenButton) // append button to flower card
  detailOpenButton.addEventListener("click", detailButtonClick)
}

const modalContainer = document.getElementById("modal-container")
const closeButton = document.getElementById("close-button")

function detailButtonClick(flower) {
  modalContainer.classList.add("show")

}


// Hide the modal container when the close button is clicked
closeButton.addEventListener("click", () => {
  modalContainer.classList.remove("show")
})