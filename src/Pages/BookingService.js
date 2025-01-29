import axios from "axios";

const BOOKING_REST_API_URL = "http://localhost:8900/bookings";

class BookingService {
  getAllBookings() {
    return axios.get(BOOKING_REST_API_URL);
  }

  addBooking(booking) {
    return axios.post(BOOKING_REST_API_URL, booking);
  }

  getBookingById(bookingId) {
    return axios.get(`${BOOKING_REST_API_URL}/${bookingId}`);
  }

  getBookingsByUserId(userId) {
    return axios.get(`${BOOKING_REST_API_URL}/user/${userId}`);
  }

  getBookingsByFlightId(flightId) {
    return axios.get(`${BOOKING_REST_API_URL}/flight/${flightId}`);
  }

  cancelBooking(bookingId) {
    return axios.delete(`${BOOKING_REST_API_URL}/${bookingId}`);
  }
}

export default new BookingService();
