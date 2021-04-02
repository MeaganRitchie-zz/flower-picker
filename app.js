const flowerUrl = "http://localhost:3000/flowers" // URL for our backend database
const petalInput = document.getElementById("number-petals") // text input for number of petals
const filterButton = document.getElementById("filter-button") // filter button
const flowerCardCollection = document.getElementById("flower-card-collection") // collection (div) of all of the flower cards displayed
const colorInput = document.getElementById("flower-color") // filter select color
const heightInput = document.getElementById("flower-height") // filter select height
const modalContainer = document.getElementById("modal-container") // pop-up window
const closeButton = document.getElementById("close-button") // pop-up close button
let allFlowersArray = [] // empty array that will be filled with all of the flower objects in our backend database
filterButton.addEventListener("click", filterButtonClick) // listens for click on filter button and runs a function


//////////////////////////////
// DATA FETCH AND RENDERING //
//////////////////////////////

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

// Renders the flower card on the page
function renderFlower(flower) {
  createFlowerCard(flower)
  flowerImageDisplay(flower)
  flowerNameDisplay(flower)
  flowerDetailsDisplay(flower)
  detailOpenButtonDisplay(flower)
}

////////////////////////
// BUILD FLOWER CARDS //
////////////////////////

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
  flowerPetals.innerHTML = `Petals:  ${flower.petals}` // set the text of the petals list item to the number from the database
  flowerColor.textContent = `Color:  ${flower.color}` // set the text of the color list item to the color from the database
  flowerHeight.textContent = `Height:  ${flower.height} inches`
  document.getElementById(flower.name).appendChild(flowerList) // append the unordered list to the flower card
  flowerList.append(flowerPetals, flowerColor, flowerHeight) // append the list items to the unordered list
}

// Create a detail open button
function detailOpenButtonDisplay(flower) {
  const detailOpenButtonContainer = document.createElement("div") // create a container for the button
  detailOpenButtonContainer.id = `${flower}-detail-button-container` // give the container an id
  detailOpenButtonContainer.className = "center"
  document.getElementById(flower.name).append(detailOpenButtonContainer) // append the button container to the flower card

  const detailOpenButton = document.createElement("button") // create button
  detailOpenButton.id = `${flower}-detail-button` // set button id
  detailOpenButton.className = "open-button" // set class name
  detailOpenButton.innerHTML = "Details" // set button text
  detailOpenButtonContainer.append(detailOpenButton) // append button to button container
  detailOpenButton.addEventListener("click", () => {
    detailButtonClick(flower)
  })
}


//////////////////////////
// FLOWER DETAIL POP-UP //
//////////////////////////

// Show the modal container with the details button is clicked
function detailButtonClick(flower) {
  modalContainer.classList.add("show")
  document.getElementById("flower-name").innerHTML = flower.name
  document.getElementById("flower-details").innerHTML = flower.details
}

// Hide the modal container when the close button is clicked
closeButton.addEventListener("click", () => {
  modalContainer.classList.remove("show")
})


///////////////////////
// DROP-DOWN FILTERS //
///////////////////////

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
  petalNumberArray.sort(function (a, b) {
    return a - b;
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
  flowerColorArray.sort()

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
  flowerHeightArray.sort(function (a, b) {
    return a - b;
  })
  flowerHeightArray.forEach(height => {
    const dropdownOption = document.createElement("option") // create an option element
    dropdownOption.textContent = height // sets the text content to a number of petals
    heightInput.append(dropdownOption)
  })
}


////////////////////////
// FILTER THE FLOWERS //
////////////////////////

// filter function invoked when filter button is clicked
function filterButtonClick() {
  const colorQuery = colorInput.value // set color query to the text value of the color input
  const petalQuery = petalInput.value // set petal query to the text value of the petal input
  const heightQuery = heightInput.value

  let filteredFlowerArray1 = []
  if (colorQuery !== "no-filter") { // check to see if a color filter is selected
    allFlowersArray.forEach(flower => { // iterates through the list of flowers
      if (flower.color == colorQuery) { // checks to see if the number of petals for each flower matches the filter query
        filteredFlowerArray1.push(flower) // adds matching flowers to the array
      }
    })
  } else {
    filteredFlowerArray1 = allFlowersArray //
  }

  let filteredFlowerArray2 = []
  if (petalQuery !== "no-filter") { // check to see if a petal filter is selected
    filteredFlowerArray1.forEach(flower => { // iterates through the list of flowers from the filtered array (color)
      if (flower.petals == petalQuery) { // checks to see if the number of petals for each flower matches the filter query
        filteredFlowerArray2.push(flower) // adds matching flowers to the array
      }
    })
  } else {
    filteredFlowerArray2 = filteredFlowerArray1
  }

  let filteredFlowerArray3 = []
  if (heightQuery !== "no-filter") {
    filteredFlowerArray2.forEach(flower => { // iterates through the list of flowers from the filtered array (color + petals)
      if (flower.height == heightQuery) { // checks to see if the number of petals for each flower matches the filter query
        filteredFlowerArray3.push(flower) // adds matching flowers to the array
      }
    })
  } else {
    filteredFlowerArray3 = filteredFlowerArray2
  }

  if (filteredFlowerArray3.length === 0) { // check to see if any flowers match the filter
    const noFlowers = document.createElement('p')
    noFlowers.textContent = "No flowers match the filter criteria"
    flowerCardCollection.innerHTML = "" // if no flowers match, remove all of the cards...
    flowerCardCollection.append(noFlowers) // and display the message
  } else {
    flowerIterator(filteredFlowerArray3) // pass the list of filtered flower to the flower iterator
  }
}