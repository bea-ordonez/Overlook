import BookingRepository from "./BookingRepository";

class RoomRepository {
    constructor(allRoomsArray, bookingRepo) {
        this.allRooms = allRoomsArray;
        this.bookingRepo = bookingRepo;
    }

    calculateTotalSpent(bookings) {
        let totalSpent = 0;
        bookings.forEach(booking => {
          const bookedRoom = this.allRooms.find(room => room.number === booking.roomNumber)
          totalSpent += bookedRoom.costPerNight;
        });
        return totalSpent;
    }

    getAvailableRooms(date, roomType) {
        return this.allRooms.filter(room => this.bookingRepo.isRoomAvailable(room.number, date) && (roomType === room.roomType || roomType === "all room types"));
    }
}
export default RoomRepository;