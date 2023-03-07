import Booking from "./Booking";

class BookingRepository {
    constructor(allBookingsArray) {
      this.allBookings = allBookingsArray;
    }

    getCustomerBookingsById(id) {  
      return this.allBookings.filter(booking => booking.userID === id);
    }


    isRoomAvailable(roomNum, date) {
        const matchedBooking = this.allBookings.find(booking => booking.roomNumber === roomNum && booking.date === date);
        return !matchedBooking;
    }
}
export default BookingRepository;