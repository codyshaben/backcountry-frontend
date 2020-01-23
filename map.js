const trailsURL = "http://localhost:5000/api/trails"
const mapPage = document.createElement('main')
const trailInfoCard = document.getElementById('info-card')
const name = document.createElement('h1')
const nearestTown = document.createElement('p')
const stars = document.createElement('p')
const reviews = document.createElement('p')
const image_four = document.createElement('img')
const ascent = document.createElement('p')
const descent = document.createElement('p')
const high = document.createElement('p')
const low = document.createElement('p')
const lng = document.createElement('p')
const lat = document.createElement('p')

image_four.id = "map-card-image"
name.id = "map-card-header"
ascent.className = "map-trail-card"
descent.className = "map-trail-card"
high.className = "map-trail-card"
low.className = "map-trail-card"
lng.className = "map-trail-card"
lat.className = "map-trail-card"
nearestTown.className = "map-trail-card"
stars.className = "map-trail-card"
reviews.className = "map-trail-card"
trailInfoCard.className = "trail-info"

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('googleMap'),{
    center: {lat: 39.766636, lng: -105.980210}, // lat/long of center of map
    zoom: 8, // 8 or 9 is typical zoom 
    scrollwheel:  false, // prevent mouse scroll from zooming map. 
    mapTypeControl: true, //default
    mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.BOTTOM_CENTER
    },
    zoomControl: true, //default
    zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_CENTER
    },
    streetViewControl: true, //default
    streetViewControlOptions: {
        position: google.maps.ControlPosition.LEFT_TOP
    }, 
    fullscreenControl: true  
  })
  allTrailMarkers() 
}

function allTrailMarkers() {
  fetch(trailsURL)
  .then(response => response.json())
  .then(trails => {
    const allTrails = trails
    allTrails.forEach(trail => {
      createMarker(trail)
  })
})

function hideTrailInfoCard(){
  trailInfoCard.style.display = "none"
}

function createMarker(trail){ 
  var latLng = {lat: trail.latitude, lng: trail.longitude}
    var existingMarker = new google.maps.Marker({
      position: latLng,
      map: map,
    })
    existingMarker.addListener('click', event => {
      console.log(event)
          var pos = map.getZoom()
          map.setZoom(15)
          map.setTilt(60)
          map.setCenter(existingMarker.getPosition());
          map.setMapTypeId('terrain')
          window.setTimeout(function() {map.setZoom(pos);map.setMapTypeId('roadmap');},5000)
          createTrailInfo(trail)
    })
}

  function createTrailInfo(trail){
    image_four.src = trail.imgMedium
    name.innerText = trail.name
    nearestTown.innerText = trail.location
    stars.innerText = "Stars: " + trail.stars
    reviews.innerText = "Number of Reviews: " + trail.starVotes
    ascent.innerText = "Ascent: " + trail.ascent
    descent.innerText = "Descent: " + trail.descent
    high.innerText = "High Altitude: " + trail.high
    low.innerText = "Low Altitude: " + trail.low
    lat.innerText = "Latitude: " + trail.latitude
    lng.innerText = "Longitude: " + trail.longitude

    trailInfoCard.append(image_four, name, nearestTown, stars, reviews, ascent, descent, high, low, lng, lat)
  }
}