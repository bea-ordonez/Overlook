
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
const customerName = document.querySelector('#customerName')
const totalSpending = document.querySelector('#totalSpending')
const customerBookingsSection = document.querySelector('#customerBookings')

//Promise



// GLOBAL Variables
let currentCustomer;

// Event Listeners


window.addEventListener('load', displayDashboard)

// Functions 

// function show() {

// };

function clearBookingDisplay() {
  customerBookingsSection.innerHTML = '';
}

function showBooking(booking, room) {
  customerBookingsSection.innerHTML += `
    <div class="past-booking-info">
      <p>Booking Info</p>
      <p>Room Number: ${booking.roomNumber}</p>
      <p>Room Type: ${room.roomType}</p>
      <p>Total Cost: ${room.costPerNight}</p>
      <p>Date: ${booking.date}</p>
   </div>`
}

function updateCustomerSpending(amount) {
  totalSpending.innerHTML = `$${amount}`;
}

function generateRandomCustomer(customerArray) {
  let randomIndex = Math.floor(Math.random() * customerArray.length);
  return customerArray[randomIndex];
}



function displayDashboard() {
  let totalSpent = 0
  api.getAllRooms().then(rooms => {
    api.getAllCustomers().then(customers => {
      const customer = generateRandomCustomer(customers);
      customerName.innerHTML = `${customer.name}`;
      api.getAllBookings().then(bookings => {
        const customerBookings = bookings.filter(booking => {
          return booking.userID === customer.id
        });
        clearBookingDisplay();
        customerBookings.forEach(booking => {
          const bookedRoom = rooms.find(room => room.number === booking.roomNumber)
          totalSpent += bookedRoom.costPerNight;
          showBooking(booking, bookedRoom)
        })
        updateCustomerSpending(totalSpent);
      }) 
    })
  })
}



