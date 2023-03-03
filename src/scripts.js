
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import fetchData from './apiCalls.js'
import Booking from './Booking.js'
import Customer from './Customer.js'
import Room from './Room.js'
import bookingData from '../data/bookingData.js'
import cutomerData from '../data/customerData.js'
import roomData from '../data/roomData.js'

// DOM Variables
const homeBtn = document.querySelector('.home-btn');
const searchBtn = document.querySelector('.search-btn');
const bookingsBtn = document.querySelector('.bookings-btn')
const dashboardView = document.querySelector('.dashboard-view')

//Promise



// GLOBAL Variables
const booking = new Booking(bookingData[0])
const room = new Room(roomData[0])

// Event Listeners
showPastBookings()

// Functions 

// function show() {

// };

function showPastBookings() {
  dashboardView.innerHTML += `
    <div class="past-booking-info">
      <p>Booking Info</p>
      <p>Room Number: ${booking.roomNumber}</p>
      <p>Room Type: ${room.roomType}</p>
      <p>Total Cost: ${room.costPerNight}</p>
      <p>Date: ${booking.date}</p>
   </div>`
}

