const flowerUrl = "http://localhost:3000/flowers" // URL for our backend database
const flowerCardCollection = document.getElementById("flower-card-collection") // collection of all of the flower cards displayed
const petalInput = document.getElementById("number-petals") // filter select number of petals
const colorInput = document.getElementById("flower-color") // filter select color
const heightInput = document.getElementById("flower-height") // filter select height
const filterButton = document.getElementById("filter-button") // filter button
const modalContainer = document.getElementById("modal-container") // pop-up window
const closeButton = document.getElementById("close-button") // pop-up close button
let allFlowersArray = [] // list to be filled with all of the flowers in our database


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

// Render all flowers in the database
function flowerIterator(flowers) {
  flowerCardCollection.innerHTML = ""
  flowers.forEach(flower => { // iterates through each flower
    renderFlower(flower) // render the flower and its information
  })
}

// Render the flower card on the page
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
  detailOpenButton.addEventListener("click", () => { // listen for details button click
    detailButtonClick(flower)
  })
}


//////////////////////////
// FLOWER DETAIL POP-UP //
//////////////////////////

// Show and populate the modal container when the details button is clicked
function detailButtonClick(flower) {
  modalContainer.classList.add("show") // show the pop-up
  document.getElementById("flower-name").innerHTML = flower.name // display the flower name
  document.getElementById("flower-details").innerHTML = flower.details // display the flower details
}

// Hide the modal container when the close button is clicked
closeButton.addEventListener("click", () => {
  modalContainer.classList.remove("show") // hide the pop-up
})


///////////////////////
// DROP-DOWN FILTERS //
///////////////////////

// Populate the petal dropdown
function petalDropdownPopulate(flowers) {
  const petalNumberArray = []
  allFlowersArray.forEach(flower => { // make an array with all of the unique numbers of petals
    if (petalNumberArray.includes(flower.petals)) { // check to see if array already includes the number
    }
    else {
      petalNumberArray.push(flower.petals) // if it does not, add that number to the array
    }
  })
  petalNumberArray.sort(function (a, b) { // sort the array in ascending numerical order
    return a - b;
  })
  petalNumberArray.forEach(number => {
    const dropdownOption = document.createElement("option") // create an option element
    dropdownOption.textContent = number // set the text content to a number of petals
    petalInput.append(dropdownOption) // append the option element
  })
}

// Populate the color dropdown
function colorDropdownPopulate(flowers) {
  const flowerColorArray = []
  allFlowersArray.forEach(flower => { // make an array with all of the unique numbers of petals
    if (flowerColorArray.includes(flower.color)) { // check to see if array already includes the number
    }
    else {
      flowerColorArray.push(flower.color) // if it does not, add that number to the array
    }
  })
  flowerColorArray.sort() // sort the array in ascending alphabetical order

  flowerColorArray.forEach(color => {
    const dropdownOption = document.createElement("option") // create an option element
    dropdownOption.textContent = color // set the text content to a number of petals
    colorInput.append(dropdownOption) // append the option element
  })
}

//Populate the height dropdown
function heightDropdownPopulate(flowers) {
  const flowerHeightArray = []
  allFlowersArray.forEach(flower => { // make an array with all of the unique numbers of petals
    if (flowerHeightArray.includes(flower.height)) { // check to see if array already includes the number
    }
    else {
      flowerHeightArray.push(flower.height) // if it does not, add that number to the array
    }
  })
  flowerHeightArray.sort(function (a, b) { // sort the array in ascending numerical order
    return a - b;
  })
  flowerHeightArray.forEach(height => {
    const dropdownOption = document.createElement("option") // create an option element
    dropdownOption.textContent = height // set the text content to a number of petals
    heightInput.append(dropdownOption) // append the option element
  })
}


////////////////////////
// FILTER THE FLOWERS //
////////////////////////

filterButton.addEventListener("click", filterButtonClick) // listen for click on filter button and runs a function

// filter function invoked when filter button is clicked
function filterButtonClick() {
  const colorQuery = colorInput.value // set color query to the text value of the color input
  const petalQuery = petalInput.value // set petal query to the text value of the petal input
  const heightQuery = heightInput.value // set height query to the text value of the heigh input

  let filteredFlowerArray1 = []
  if (colorQuery !== "no-filter") { // check to see if a color filter is selected
    allFlowersArray.forEach(flower => { // iterate through the list of flowers
      if (flower.color == colorQuery) { // check to see if the number of petals for each flower matches the filter query
        filteredFlowerArray1.push(flower) // add matching flowers to the first filter array
      }
    })
  } else { // if no color filter is selected
    filteredFlowerArray1 = allFlowersArray // set the first filter array equal to the entire flower collection
  }

  let filteredFlowerArray2 = []
  if (petalQuery !== "no-filter") { // check to see if a petal filter is selected
    filteredFlowerArray1.forEach(flower => { // iterate through the list of flowers from the first filtered array (color)
      if (flower.petals == petalQuery) { // check to see if the number of petals for each flower matches the filter query
        filteredFlowerArray2.push(flower) // add matching flowers to the second filter array
      }
    })
  } else { // if no petal filter is selected
    filteredFlowerArray2 = filteredFlowerArray1 // set the second filter array equal to the first filter array
  }

  let filteredFlowerArray3 = []
  if (heightQuery !== "no-filter") {
    filteredFlowerArray2.forEach(flower => { // iterate through the list of flowers from the second filtered array (color + petals)
      if (flower.height == heightQuery) { // check to see if the number of petals for each flower matches the filter query
        filteredFlowerArray3.push(flower) // add matching flowers to the third filter array
      }
    })
  } else { // if no height filter is selected
    filteredFlowerArray3 = filteredFlowerArray2 // set the third filter array equal to the second filter array
  }

  if (filteredFlowerArray3.length === 0) { // check to see if no flowers in the database match the filter selections
    const noFlowers = document.createElement('p') // create a paragraph element
    noFlowers.textContent = "No flowers match the filter criteria" // set the text content of the message
    flowerCardCollection.innerHTML = "" // remove all of the flower cards
    flowerCardCollection.append(noFlowers) // and display the message
  } else { // if there are flowers in the database that match the filter
    flowerIterator(filteredFlowerArray3) // pass the array of filtered flowers to the flower iterator
  }
}