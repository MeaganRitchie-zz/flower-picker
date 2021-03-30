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
    flowerImageDisplay(flowers) // display flower image
  })

// Display flower image
function flowerImageDisplay(flowers) {
  const flowerImage = document.createElement("img")
  flowerImage.src = flowers[0].photo
  document.body.appendChild(flowerImage)
}