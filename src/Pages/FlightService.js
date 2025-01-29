import axios from "axios";

const FLIGHT_REST_API_URL = "http://localhost:8900/flights";

class FlightService {
  getAllFlights() {
    return axios.get(FLIGHT_REST_API_URL);
  }

  addFlight(flight) {
    return axios.post(FLIGHT_REST_API_URL, flight);
  }

  getFlightById(flightId) {
    return axios.get(`${FLIGHT_REST_API_URL}/${flightId}`);
  }

  updateFlight(flightId, updatedFlight) {
    return axios.put(`${FLIGHT_REST_API_URL}/${flightId}`, updatedFlight);
  }

  deleteFlight(flightId) {
    return axios.delete(`${FLIGHT_REST_API_URL}/${flightId}`);
  }
}

export default new FlightService();
