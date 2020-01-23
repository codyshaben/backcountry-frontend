const signupForm = document.getElementById('signup_form')
const signinForm = document.getElementById('signin_form')
const usernameSignup = document.getElementById('username-signup')
const passwordSignup = document.getElementById('password-signup')
const usernameSignin = document.getElementById('username-input')
const passwordSignin = document.getElementById('password-input')
const main = document.getElementsByTagName('main')
const signupURL = "http://localhost:5000/signup"
const signinURL = "http://localhost:5000/signin"
 
const userTrailContainer = document.getElementById('user-trails')
const trailCardContainer = document.createElement('div')
const trailCardMiddle = document.createElement('div')
const homePage = document.createElement('div')
const userTitle = document.createElement('h2')

trailCardContainer.id = "trail-card-container"
document.body.appendChild(trailCardMiddle)
trailCardMiddle.appendChild(userTitle)
trailCardMiddle.id = "card-middle"

userTitle.innerText = "Favorite trails"

function fetchToUserId(){
    id = localStorage.getItem('userId')
    const homePageURL = `http://localhost:5000/api/users/${id}`
    fetch(homePageURL)
        .then(response => response.json())
        .then(result => {
            const allTrails = result.trails
            console.log(allTrails)
            allTrails.forEach(trail => {
                console.log(trail)
                showUserCards(trail)
            })
        })
}

function showUserCards(trail){
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
    imageOne.src = trail.image_one

    filterList.append(reviewListItem, difficultyListItem, lengthListItem)
    trailCard.prepend(imageOne)
    trailCard.append(name, location, filterList, linkToDirections)
    trailCardContainer.append(trailCard)   
    
    trailCardMiddle.appendChild(trailCardContainer)
}

fetchToUserId()