import {expect} from "chai";
import RoomRepository from "../src/RoomRepository";
import roomData from '../data/roomData'
import Room from "../src/Room";
import bookingData from "../data/bookingData";



describe('Room Repository', () => {
    let roomRepo;


  beforeEach( 'instantiate RoomRepository', () => {
    const roomArray = roomData.map(room => new Room(room));
    roomRepo = new RoomRepository(roomArray);
  });

  it('should be an instance of room Repository', () => {
    expect(roomRepo).to.be.an.instanceOf(RoomRepository);
  });

  it('should calculate total spent on bookings', () => {
    const customerBooking = bookingData[0]
    expect(roomRepo.calculateTotalSpent([customerBooking])).to.equal(429.44)
  })

})