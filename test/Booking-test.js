import {expect} from "chai";
import Booking from "../src/Booking";
import bookingData from "../data/bookingData";

describe('Booking', () => {
  let booking;
  
  beforeEach( () => {
    booking = new Booking(bookingData[0]);
  });

  it('should be an instance of Booking', () => {
    expect(booking).to.be.an.instanceOf(Booking);
  });

  it('should have an id', () => {
    expect(booking.id).to.equal('5fwrgu4i7k55hl6sz');
  });

  it('should have a user id', () => {
    expect(booking.userID).to.equal(9);
  });

  it('should have a date', () => {
    expect(booking.date).to.equal("2022/04/22");
  });

  it('should have a room number', () => {
    expect(booking.roomNumber).to.equal(15);
  });
});