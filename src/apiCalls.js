import Booking from "./Booking"

const getCustomerById = (id) => {
    return fetch(`http://localhost:3001/api/v1/customers/${id}`)
    .then(response => response.json());
};

const getAllCustomers = () => {
    return fetch(`http://localhost:3001/api/v1/customers`)
    .then(response => response.json());
};

const getAllRooms = () => {
    return fetch(`http://localhost:3001/api/v1/rooms`)
    .then(response => response.json())
};

const getAllBookings = () => {
    return fetch(`http://localhost:3001/api/v1/bookings`)
    .then(response => response.json())
    .catch(error => { alert(`Oops! No Fetch: ${error}`)});
};

const addNewBooking = (booking) => {
    return fetch('http://localhost:3001/api/v1/bookings', {
        method:'POST',
        body: JSON.stringify(booking),
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(json => new Booking(json.newBooking))
};

export default { 
    getCustomerById, 
    getAllCustomers,
    getAllRooms,
    getAllBookings,
    addNewBooking
};
