const trailsURL = "http://localhost:5000/api/trails"
const usertrailsURL = "http://localhost:5000/api/usertrails"
const trailCardContainer = document.createElement('div')
const reviewsButton = document.getElementById('review-dropbtn')
const reviewButtonContainer = document.createElement('div')
const filterContainer = document.getElementById('filter-container')
const trailCardMiddle = document.createElement('div')
const trailCard = document.getElementById('trail-card')
const difficultyButton = document.getElementById('difficulty-dropbtn')

trailCardContainer.id = "trail-card-container"
document.body.appendChild(trailCardMiddle)
trailCardMiddle.id = "card-middle"

fetch(trailsURL)
    .then(response => response.json())
    .then(trails => {
        const allTrails = trails
        allTrails.forEach(trail => {
            createCard(trail)
        });      
    })

difficultyButton.addEventListener('click', event => {
    const difficultyOptions = document.createElement('div')
    const dblack = document.createElement('button')
    const black = document.createElement('button')
    const blueBlack = document.createElement('button')
    const blue = document.createElement('button')

    difficultyOptions.id = "review-options"

    dblack.innerText = "Double Black"
    black.innerText = "Black"
    blueBlack.innerText = "Blue Black"
    blue.innerText = "Blue"

    difficultyOptions.append(dblack, black, blueBlack, blue)
    filterContainer.append(difficultyOptions)
})

reviewsButton.addEventListener('click', event => {
    const reviewsOptions = document.createElement('div')
    const fiveStars = document.createElement('button')
    const fourStars = document.createElement('button')
    const threeStars = document.createElement('button')

    fiveStars.addEventListener('click', event => {
        showFiveStars()
    })

    fourStars.addEventListener('click', event => {
        showFourStars()
    })

    threeStars.addEventListener('click', event => {
        showThreeStars()
    })

    fiveStars.className = "star-class"
    fourStars.className = "star-class"
    threeStars.className = "star-class"
    reviewsOptions.id = "review-options"

    fiveStars.innerText = "Five Stars"
    fourStars.innerText = "Four Stars"
    threeStars.innerText = "Three Stars"

    reviewsOptions.append(fiveStars, fourStars, threeStars)
    filterContainer.append(reviewsOptions)
})

function logOut(){
    logOut = document.getElementById('home')
    logOut.addEventListener('click', event => {
        localStorage.removeItem('userId')
    })
}

function showFiveStars(){
    hideAll()
    fetch(trailsURL)
        .then(response => response.json())
        .then(trails => {
            trails.forEach(trail => {
                if (trail.stars === 5) {
                    createFilteredCards(trail)
                    // console.log(trail)
                }
            })
        })
}

function showFourStars(){
    hideAll()
    fetch(trailsURL)
        .then(response => response.json())
        .then(trails => {
            trails.forEach(trail => {
                if (trail.stars > 4 && trail.stars  < 5) {
                    createFilteredCards(trail)
                    console.log(trail)
                }
            })
        })
}

function showThreeStars(){
    hideAll()
    fetch(trailsURL)
        .then(response => response.json())
        .then(trails => {
            trails.forEach(trail => {
                if (trail.stars > 3 && trail.stars  < 4) {
                    createFilteredCards(trail)
                    console.log(trail)
                }
            })
        })
}

function hideAll() {
    trailCardContainer.innerHTML = " "
}

function saveTrailId(id){
    localStorage.setItem('trailId', id)
    console.log('trailId')
    addUserTrail()
}

function addTrailToDb(trail) {
    fetch(trailsURL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: trail.name,
            location: trail.location,
            summary: trail.summary,
            difficulty: trail.difficulty,
            stars: trail.stars,
            reviews: trail.starVotes,
            image_one: trail.imgMedium,
            length: trail.length,
            ascent: trail.ascent,
            high: trail.high,
            low: trail.low,
            lng: trail.longitude,
            lat: trail.latitude,
            condition_status: trail.conditionStatus,
            condition_details: trail.conditionDetails,
            condition_date: trail.conditionDate,
        })
    }).then(response => response.json())
    .then(result => saveTrailId(result.id))
}

function addUserTrail(){
    fetch(usertrailsURL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: localStorage.getItem('userId'),
            trail_id: localStorage.getItem('trailId')
        })
    }).then(response => response.json())
}
   
function createCard(trail) {
    const trailCard =  document.createElement('div')
    const name = document.createElement('h2')
    const location = document.createElement('h4')
    const imageOne = document.createElement('img')
    const filterList = document.createElement('ul')
    const lengthListItem = document.createElement('li')
    const reviewListItem = document.createElement('li')
    const difficultyListItem = document.createElement('li')
    const linkToDirections = document.createElement('a')
    const latLng = trail.latitude + "," + trail.longitude
    const addFavoritesButton = document.createElement('a')
    
    addFavoritesButton.addEventListener('click', event => {
        alert("Trail has been added to your favorites!")
        addTrailToDb(trail)
    })

    linkToDirections.addEventListener('click', event => {
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${latLng}`)
    } )

    addFavoritesButton.id = "directions-link"
    linkToDirections.id = "directions-link"
    // linkToDirections.href = `https://www.google.com/maps/dir/?api=1&destination=${latLng}`
    linkToDirections.innerText = "Directions"
    trailCard.id = "trail-card"
    filterList.id = "filter-list"
    difficultyListItem.className = "filter-list-item"
    reviewListItem.className = "filter-list-item"
    lengthListItem.className = "filter-list-item"

    addFavoritesButton.innerText = "Add to your favorites!"
    difficultyListItem.innerText = "Difficulty: " + trail.difficulty
    lengthListItem.innerText = "Length: " + trail.length + " miles"
    reviewListItem.innerText = trail.stars + " stars - " + trail.starVotes + " reviews"
    name.innerText = trail.name
    location.innerText = trail.location
    imageOne.src = trail.imgMedium

    filterList.append(reviewListItem, difficultyListItem, lengthListItem)
    trailCard.prepend(imageOne)
    trailCard.append(name, location, filterList, addFavoritesButton, linkToDirections)
    trailCardContainer.append(trailCard)   
    trailCardMiddle.appendChild(trailCardContainer)
}

function createFilteredCards(trail) {
    const trailCard =  document.createElement('div')
    const name = document.createElement('h2')
    const location = document.createElement('h4')
    const imageOne = document.createElement('img')
    const filterList = document.createElement('ul')
    const lengthListItem = document.createElement('li')
    const reviewListItem = document.createElement('li')
    const difficultyListItem = document.createElement('li')
    const linkToDirections = document.createElement('a')
    const latLng = trail.lat + "," + trail.lng
    const addFavoritesButton = document.createElement('a')
    
    addFavoritesButton.addEventListener('click', event => {
        alert('Trail has been added to your favorites!')
        addTrailToDb(trail)
    })

    linkToDirections.addEventListener('click', event => {
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${latLng}`)
    } )

    addFavoritesButton.id = "directions-link"
    linkToDirections.id = "directions-link"
    linkToDirections.innerText = "Directions"
    trailCard.id = "trail-card"
    filterList.id = "filter-list"
    difficultyListItem.className = "filter-list-item"
    reviewListItem.className = "filter-list-item"
    lengthListItem.className = "filter-list-item"

    addFavoritesButton.innerText = "Add to your favorites!"
    difficultyListItem.innerText = "Difficulty: " + trail.difficulty
    lengthListItem.innerText = "Length: " + trail.length + " miles"
    reviewListItem.innerText = trail.stars + " stars - " + trail.starVotes + " reviews"
    name.innerText = trail.name
    location.innerText = trail.location
    imageOne.src = trail.imgMedium

    filterList.append(reviewListItem, difficultyListItem, lengthListItem)
    trailCard.prepend(imageOne)
    trailCard.append(name, location, filterList, addFavoritesButton, linkToDirections)
    trailCardContainer.append(trailCard)   
    trailCardMiddle.appendChild(trailCardContainer)
}

logOut()