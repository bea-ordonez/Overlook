
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import api from './apiCalls.js'
import Booking from './Booking.js'
import Customer from './Customer.js'
import Room from './Room.js'
import bookingData from '../data/bookingData.js'
import cutomerData from '../data/customerData.js'
import roomData from '../data/roomData.js'


//let allRooms = []
//api.getAllRooms().then(rooms => allRooms = rooms) //returns an array of rooms

//api.getCustomerById(1).then(customer => console.log(customer)) //returns an obj of customer
//api.getAllCustomers().then(customers => console.log(customers)) //returns array of customers
//console.log("next line")



// DOM Variables
const customerName = document.querySelector('#customerName');
const totalSpending = document.querySelector('#totalSpending');
const customerBookingsSection = document.querySelector('#customerBookings');
const searchBtn = document.querySelector('#searchButton');
const reservation = document.querySelector('#reservation')


// GLOBAL Variables
let currentCustomer;
let allRooms = [];
let allBookings = [];
let allCustomers = [];


// Event Listeners


window.addEventListener('load', () => {
  updateGlobalData()
  .then(pickRandomCustomer)
  .then(displayDashboard);
});
searchBtn.addEventListener('click', showAvailableRooms);

// Functions 

//returns a promise, so need to use then when in use
function updateGlobalData() {
  return api.getAllRooms().then(rooms => {
    allRooms = rooms
    return api.getAllBookings().then(bookings => {
      allBookings = bookings
      return api.getAllCustomers().then(customers => {
        allCustomers = customers
      })
    })
  })
}

function pickRandomCustomer() {
  let randomIndex = Math.floor(Math.random() * allCustomers.length);
  currentCustomer = allCustomers[randomIndex];
}

function displayDashboard() {
  displayCustomerName();
  customerBookingsSection.innerHTML = '';
  // draw dashboard cards for current user's bookings
  const customerBookings = allBookings.filter(booking => booking.userID === currentCustomer.id);
  let totalSpent = 0;
  customerBookings.forEach(booking => {
    const bookedRoom = allRooms.find(room => room.number === booking.roomNumber)
    totalSpent += bookedRoom.costPerNight;
    displayBooking(booking, bookedRoom);
  });
  displayCustomerSpending(totalSpent);
}

function displayBooking(booking, room) {
  customerBookingsSection.innerHTML += `
    <div class="past-booking-info">
      <p>Booking Info</p>
      <p>Room Number: ${booking.roomNumber}</p>
      <p>Room Type: ${room.roomType}</p>
      <p>Total Cost: ${room.costPerNight}</p>
      <p>Date: ${booking.date}</p>
   </div>`
}

function showAvailableRooms() {
  const selectedDate = reservation.value.replace(/-/g,'/')
  //regular expression, looking for a certain pattern (/-/g) replacing - with / 
  const availableRooms = allRooms.filter(room => isRoomAvailable(room.number, selectedDate));
}
//itrate thru bookings array and filter matching date and room number 

function isRoomAvailable(roomNum, date) {
  const bookingResult = allBookings.find(booking => booking.roomNumber === roomNum && booking.date === date)
  return !bookingResult
}
//if booking result meets criteria return false otherwise return true

function displayCustomerName() {
  customerName.innerHTML = `${currentCustomer.name}`;
}

function displayCustomerSpending(amount) {
  totalSpending.innerHTML = `$${amount}`;
}

