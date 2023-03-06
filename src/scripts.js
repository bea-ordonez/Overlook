
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
const loginBtn = document.querySelector('#loginButton');
const userNameBox = document.querySelector('#userName')
const passWordBox = document.querySelector('#passWord')
const dateSelector = document.querySelector('#selectDate');
const roomTypeSelector = document.querySelector('#roomType');
const loggedOutView = document.querySelector('#loggedOutView');
const loggedInView = document.querySelector('#loggedInView');

// GLOBAL Variables
let currentCustomer, selectedDate, roomRepo, bookingRepo;
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
loginBtn.addEventListener('click', logIn);

// Functions 
//returns a promise, so need to use then when in use
function updateGlobalData() {
  return api.getAllRooms().then(rooms => {
    allRooms = rooms.allRooms;
    roomRepo = rooms.allRoomsRepo;
    return api.getAllBookings().then(bookings => {
      allBookings = bookings.allBookings;
      bookingRepo = bookings.allBookingsRepo;
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
  const customerBookings = bookingRepo.getCustomerBookingsById(currentCustomer.id);
  const totalSpent = roomRepo.calculateTotalSpent(customerBookings)
  displayCustomerSpending(totalSpent);
  displayBooking(customerBookings);
}

function displayBooking(bookings) {
  customerBookingsSection.innerHTML = '';
  bookings.forEach(booking => {
    customerBookingsSection.innerHTML += `
      <div class="card" tabindex="0">
        <p>Booking Info</p>
        <p>Room Number: ${booking.roomNumber}</p>
        <p>Date: ${booking.date}</p>
     </div>`
  })
}

function displayAvailableRooms(rooms) {
  availableRoomsSection.innerHTML = '';
  rooms.forEach(room => {
    availableRoomsSection.innerHTML += `
      <div class="card" tabindex="0">
        <p>Room Info:</p>
        <p>Room Number: ${room.number}</p>
        <p>Room Type: ${room.roomType}</p>
        <p>Bidet: ${room.bidet}</p>
        <p>Bed Size: ${room.bedSize}</p>
        <p>Number of Beds: ${room.numBeds}</p>
        <p>Total Cost: ${room.costPerNight}</p>
        <button id="book-${room.number}">Book</button>
      </div>`
  })
}

function logIn() {
  const username = userNameBox.value;
  const password = passWordBox.value;
  if (username === 'customer50' && password === 'overlook2021') {
    currentCustomer = allCustomers.find(customer => customer.id === 50);
  }
  displayDashboard();
  hide(loggedOutView);
  show(loggedInView);
}

function displayNoAvailableRoom() {
  availableRoomsSection.innerHTML += `
    <div class="card">
      <p>Sorry! There are no available rooms.</p>
    </div>`
}

function showAvailableRooms() {
  selectedDate = dateSelector.value.replaceAll('-', '/');
  const selectedRoomType = roomTypeSelector.value;
  const availableRooms = allRooms.filter(room => (bookingRepo.isRoomAvailable(room.number, selectedDate)) && (selectedRoomType === room.roomType || selectedRoomType === "all room types"));
  if (availableRooms.length === 0) {
    displayNoAvailableRoom();
  } else {
    displayAvailableRooms(availableRooms);
  }
}

function makeNewBooking(event) {
  const targetId = event.target.id;
  const isValidClick = targetId && targetId.includes('book');
  if (isValidClick) {
      const roomNum = targetId.substring(5);
      const newBooking = {
        userID: currentCustomer.id,
        date: selectedDate,
        roomNumber: parseInt(roomNum)
      };
      api.addNewBooking(newBooking).then(updateGlobalData).then(showAvailableRooms).then(displayDashboard);
    };
  }

function displayCustomerName() {
  customerName.innerHTML = `${currentCustomer.name}`;
}

function displayCustomerSpending(amount) {
  totalSpending.innerHTML = `$${amount}`;
}

function show(element) {
  element.classList.remove('hidden');
}

function hide(element) {
  element.classList.add('hidden');
}

