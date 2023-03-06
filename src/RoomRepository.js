class RoomRepository {
    constructor(allRoomsArray) {
        this.allRooms = allRoomsArray;
    }

    calculateTotalSpent(bookings) {
        let totalSpent = 0;
        bookings.forEach(booking => {
          const bookedRoom = this.allRooms.find(room => room.number === booking.roomNumber)
          totalSpent += bookedRoom.costPerNight;
        });
        return totalSpent;
    }

    getAvailableRooms() {
        this.allRooms.filter(room => isRoomAvailable(room.number, selectedDate) && (selectedRoomType === room.roomType || selectedRoomType === "all room types"));
    }
}
export default RoomRepository;