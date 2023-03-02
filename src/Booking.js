class Booking {
  constructor(bookingData) {
    this.id = bookingData.id;
    this.userId = bookingData.userId;
    this.data = bookingData.date;
    this.roomnumber = bookingData.roomNumber;
  }
}
export default Booking;