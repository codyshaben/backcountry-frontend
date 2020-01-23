const signinForm = document.getElementById('signin_form')
const usernameSignin = document.getElementById('username-input')
const passwordSignin = document.getElementById('password-input')
const signupURL = "http://localhost:5000/signup"
const signinURL = "http://localhost:5000/signin"
const userTrailContainer = document.getElementById('user-trails')
const trailCardContainer = document.createElement('div')
const trailCardMiddle = document.createElement('div')
const homePage = document.createElement('div')
const showSignupButton = document.getElementById('show-signup')
const usernameSignup = document.createElement('input')
const passwordSignup = document.createElement('input')
const signupButton = document.createElement('button')  

trailCardContainer.id = "trail-card-container"
document.body.appendChild(trailCardMiddle)
trailCardMiddle.id = "card-middle"

showSignupButton.addEventListener('click', event => {
    hideSignin()
    signupForm()
})

signinForm.addEventListener('submit', event => {
    event.preventDefault()
    console.log(event)
    signInFetch()
})

function hideSignin(){
    signinForm.style.display = "none"
}

function signupForm(){
    const main = document.getElementById('main')
    const signupForm = document.createElement('form')
    signupForm.id = "signup_form"
    usernameSignup.id = 'username-signup'
    usernameSignup.type = 'text'
    usernameSignup.name = 'username'
    usernameSignup.placeholder = 'Username' 
    
    passwordSignup.id = 'password-signup'
    passwordSignup.type = 'password'
    passwordSignup.name = 'password'
    passwordSignup.placeholder = 'Password'
    console.log(passwordSignin.innerText)
   
    signupButton.type = 'submit'
    signupButton.innerText = 'Sign Up'
    signupForm.append(usernameSignup, passwordSignup, signupButton) 
    signupForm.addEventListener('submit', event => {
        event.preventDefault()
        console.log(event)
        signUpFetch()
    })
    main.appendChild(signupForm)

}

function saveUserId(id){
    localStorage.setItem('userId', id)
    console.log(localStorage.getItem('userId'))
    hideSignin()
    window.location.href = "http://localhost:3001/userhome.html"
}
 
function signUpFetch(){
    const username = usernameSignup.value
    const password = passwordSignup.value
    fetch(signupURL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(result => saveUserId(result.user.id)) 
}

function getUserTrails(id){
    fetch(homePageURL)
        .then(response => response.json())
        .then(result => console.log(result))
}

function signInFetch(){
    const usernames = usernameSignin.value
    const passwords = passwordSignin.value
    fetch(signinURL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: usernames,
            password: passwords
        })
    }).then(response => response.json())
    .then(result => saveUserId(result.id))
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
    const latLng = trail.latitude + "," + trail.longitude
    const addFavoritesButton = document.createElement('a')
    
    addFavoritesButton.addEventListener('click', event => {
        addTrailToDb(trail)
    })
    addFavoritesButton.id = "directions-link"
    linkToDirections.id = "directions-link"
    linkToDirections.href = `https://www.google.com/maps/dir/?api=1&destination=${latLng}`
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
    trailCard.append(name, location, filterList, addFavoritesButton, linkToDirections)
    trailCardContainer.append(trailCard)   
    trailCardMiddle.appendChild(trailCardContainer)
}
