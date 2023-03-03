import {expect} from "chai";
import Room from "../src/Room";
import roomData from "../data/roomData";

describe('Room', function() {
  let room;

  beforeEach(() => {
    room = new Room(roomData[0]);
  });

  it('should be an instance of room', () => {
    expect(room).to.be.an.instanceOf(Room);
  });

  it('should have a number', () => {
    expect(room.number).to.equal(1);
  });

  it('should have a room type', () => {
    expect(room.roomType).to.equal('residential suite');
  });

  it('should determine whether it has a bidet or not', () => {
    expect(room.bidet).to.equal(true);
  });

  it('should have a bed size', () => {
    expect(room.bedSize).to.equal('queen');
  })

  it('should have number of beds', () => {
    expect(room.numBeds).to.equal(1);
  });

  it('should have a cost for the night', () => {
    expect(room.costPerNight).to.equal(358.4);
  });
});

