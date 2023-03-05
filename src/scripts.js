
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
const customerBookingsSection = document.querySelector('#bookingCards');
const availableRoomsSection = document.querySelector('#availableRooms');
const searchBtn = document.querySelector('#searchButton');
const dateSelector = document.querySelector('#selectDate')
const roomTypeSelector = document.querySelector('#roomType')


// GLOBAL Variables
let currentCustomer;
let selectedDate;
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

availableRoomsSection.addEventListener('click', makeNewBooking);

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
    <div class="card">
      <p>Booking Info</p>
      <p>Room Number: ${booking.roomNumber}</p>
      <p>Room Type: ${room.roomType}</p>
      <p>Total Cost: ${room.costPerNight}</p>
      <p>Date: ${booking.date}</p>
   </div>`
}

function displayAvailableRoom(room) {
  availableRoomsSection.innerHTML += `
    <div class="card">
      <p>Room Info:</p>
      <p>Room Number: ${room.number}</p>
      <p>Room Type: ${room.roomType}</p>
      <p>Bidet: ${room.bidet}</p>
      <p>Bed Size: ${room.bedSize}</p>
      <p>Number of Beds: ${room.numBeds}</p>
      <p>Total Cost: ${room.costPerNight}</p>
      <button id="book-${room.number}">Book</button>
    </div>`

  
}

function displayNoAvailableRoom() {
  availableRoomsSection.innerHTML += `
    <div class="card">
      <p>Sorry! There are no available rooms.</p>
    </div>`
}

function showAvailableRooms() {
  selectedDate = dateSelector.value.replace(/-/g,'/')
  const selectedRoomType = roomTypeSelector.value;
  //regular expression, looking for a certain pattern (/-/g) replacing - with / 
  const availableRooms = allRooms.filter(room => isRoomAvailable(room.number, selectedDate) && (selectedRoomType === room.roomType || selectedRoomType === "all room types") );
  availableRoomsSection.innerHTML = '';
  if (availableRooms.length === 0) {
    displayNoAvailableRoom();
  }
  availableRooms.forEach( room => {
    displayAvailableRoom(room);
  })
}
//itrate thru bookings array and filter matching date and room number 

function makeNewBooking(event) {
  if (event.target.id) { //if id is truthy
    if (event.target.id.substring(0,5) == "book-") { //if left part of id is 'book-'
      const roomNum = event.target.id.substring(5) //extract room number
      
      const newBooking = {
        userID: currentCustomer.id,
        date: selectedDate,
        roomNumber: parseInt(roomNum)
      };

      api.addNewBooking(newBooking).then(updateGlobalData).then(showAvailableRooms).then(displayDashboard);
    }
  }
}

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

