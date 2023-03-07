import {expect} from "chai";
import BookingRepository from "../src/BookingRepository";
import bookingData from "../data/bookingData";
import Booking from "../src/Booking";


describe('Booking Repository', () => {
    let bookingRepo;


  beforeEach( 'instantiate BookingRepository', () => {
    const bookingArray = bookingData.map(booking => new Booking(booking)); 
    bookingRepo = new BookingRepository(bookingArray);
  });

  it('should be an instance of Booking Repository', () => {
    expect(bookingRepo).to.be.an.instanceOf(BookingRepository);
    expect(bookingRepo.allBookings[0]).to.be.an.instanceOf(Booking);
  });

  it('should get a customer by id', () => {
    const customerBookings = bookingRepo.getCustomerBookingsById(9);
    expect(customerBookings).to.deep.equal([bookingData[0]]);
  });

  it('should determine if room is available', () => {
    const bookingResult = bookingRepo.isRoomAvailable(15, "2022/04/22");
    expect(bookingResult).to.equal(false);
  });
})