import Booking from "./Booking"
import Customer from "./Customer"
import Room from "./Room"

const getCustomerById = (id) => {
    return fetch(`http://localhost:3001/api/v1/customers/${id}`)
    .then(response => response.json())
    .then(json => new Customer(json))
}

const getAllCustomers = () => {
    return fetch(`http://localhost:3001/api/v1/customers`)
    .then(response => response.json())
    .then(json => json.customers.map(customerJson => new Customer(customerJson)))
}

const getAllRooms = () => {
    return fetch(`http://localhost:3001/api/v1/rooms`)
    .then(response => response.json())
    .then(json => json.rooms.map(roomJson => new Room(roomJson)))
}

const getAllBookings = () => {
    return fetch(`http://localhost:3001/api/v1/bookings`)
    .then(response => response.json())
    .then(json => json.bookings.map(bookingJson => new Booking(bookingJson)))
}

const addNewBooking = (booking) => {
    return fetch('http://localhost:3001/api/v1/bookings', {
        method:'POST',
        body: JSON.stringify(booking),
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(json => new Booking(json.newBooking))
}

export default { 
    getCustomerById, 
    getAllCustomers,
    getAllRooms,
    getAllBookings,
    addNewBooking
};
