const flowerUrl = "http://localhost:3000/flowers"
const petalInput = document.getElementById("number-petals")
const searchButton = document.getElementById("search-button")

searchButton.addEventListener("click", searchButtonClick)


// Listen for search button click
function searchButtonClick () {
  console.log(petalInput.value)
}

// GET the flower data
fetch (flowerUrl)
  .then (response => response.json())
  .then (flowers => {
    createFlowerCard(flowers) // creates a flower card
    flowerNameDisplay(flowers)
    flowerImageDisplay(flowers) // display flower image
    flowerDetailsDisplay(flowers)
  })

// Create a flower card
function createFlowerCard(flowers) {
  const flowerCard = document.createElement("div")
  flowerCard.id = flowers[0].name
  document.body.appendChild(flowerCard)
}

// Display flower name in the card
function flowerNameDisplay(flowers) {
  const flowerName = document.createElement("h1")
  flowerName.textContent = flowers[0].name
  document.getElementById(flowers[0].name).appendChild(flowerName)
}

// Display flower image inside of the card
function flowerImageDisplay(flowers) {
  const flowerImage = document.createElement("img")
  flowerImage.src = flowers[0].photo
  document.getElementById(flowers[0].name).appendChild(flowerImage)
}

// Display flower details in the card
function flowerDetailsDisplay(flowers) {
  const flowerList = document.createElement("ul") // create an unordered list
  const flowerDetails = document.createElement("li") // create a list item
  flowerDetails.textContent = `Number of petals: ${flowers[0].petals}` // set the text of the list item
  document.getElementById(flowers[0].name).appendChild(flowerList) // append the unordered list to the flower card
  flowerList.appendChild(flowerDetails)
  
}
