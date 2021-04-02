# Wildflower

## Table of contents
* [General info](#general-info)
* [Intro Animation](#intro-animation)
* [Intro Video](#intro-video)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Status](#status)
* [Inspiration](#inspiration)
* [Contact](#contact)
* [License](#license)

## General info
Wildflower is an identifier app for Colorado wildflowers. Users can sort through flowers using a filter. 

## Intro Animation
![GIF](wildflower.gif)

## Intro Video
[Wildflower on YouTube](https://youtu.be/0ivMO83wqtE)

## Technologies
* JavaScript
* HTML
* CSS

## Setup
To run this project, install it locally by cloning the GitHub repository and typing: 
``` 
json-server --watch db.json
open index.html
```
## Code Example
```
let filteredFlowerArray1 = []
  if (colorQuery !== "no-filter") {
    allFlowersArray.forEach(flower => { 
      if (flower.color == colorQuery) { 
        filteredFlowerArray1.push(flower)
      }
    })
  } else {
    filteredFlowerArray1 = allFlowersArray
  }
  ```

  ```
  function colorDropdownPopulate(flowers) {
  const flowerColorArray = []
  allFlowersArray.forEach(flower => { 
    if (flowerColorArray.includes(flower.color)) {
    }
    else {
      flowerColorArray.push(flower.color)
    }
  })
  flowerColorArray.sort()

  flowerColorArray.forEach(color => {
    const dropdownOption = document.createElement("option")
    dropdownOption.textContent = color 
    colorInput.append(dropdownOption)
  })
}
```

## Features
* Displays all wildflowers in the database
* Sort flowers by color, petal count, and/or height
* Users can display details about a flower in a pop-up 
* Lets the user know if there are no flowers that match the filter criteria

### To-do list:
* Add a button for filter reset
* Add a flower to the database
* Refactor
* Sort displayed flowers alphabetically

## Status
Project is: finished with option to expand functionality and DRY out code.

## Inspiration
It's Spring!

## Contact
Created by [Jesse Houser](https://www.linkedin.com/in/jesseahouser/) and [Meagan Ritchie](https://www.linkedin.com/in/meagan-ritchie-164921204/)

## License 
[Click to view](https://www.gnu.org/licenses/gpl-3.0.en.html)