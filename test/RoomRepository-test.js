import {expect} from "chai";
import BookingRepository from "../src/BookingRepository";
import RoomRepository from "../src/RoomRepository";
import roomData from '../data/roomData'
import Room from "../src/Room";
import Booking from "../src/Booking";
import bookingData from "../data/bookingData";



describe('Room Repository', () => {
    let bookingRepo;
    let roomRepo;

  beforeEach( () => {
    const bookingArray = bookingData.map(booking => new Booking(booking));
    bookingRepo = new BookingRepository(bookingArray);

    const roomArray = roomData.map(room => new Room(room));
    roomRepo = new RoomRepository(roomArray, bookingRepo);
  });

  it('should be an instance of room Repository', () => {
    expect(roomRepo).to.be.an.instanceOf(RoomRepository);
  });

  it('should calculate total spent on bookings', () => {
    const customerBooking = bookingData[0]
    expect(roomRepo.calculateTotalSpent([customerBooking, customerBooking])).to.equal(858.88);
  })

  it('should get available rooms on a day with no bookings', () => {
    const availableRooms = roomRepo.getAvailableRooms("2022/07/25", "all room types");
    expect(availableRooms.length).to.equal(bookingData.length);
  })
  
  it('should get available rooms based on date and room type', () => {
    const availableRooms = roomRepo.getAvailableRooms("2022/04/22", "single room");
    expect(availableRooms.length).to.equal(1);
  })

})