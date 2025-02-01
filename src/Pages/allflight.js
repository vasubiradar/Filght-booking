import React, { useEffect, useState } from "react";
import FlightService from "./FlightService";
import "./allflight.css";

const FlightList = () => {
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all flights on component mount
    FlightService.getAllFlights()
      .then((response) => {
        setFlights(response.data);
      })
      .catch((error) => {
        console.error("Error fetching flight data:", error);
        setError("Failed to load flight data. Please try again later.");
      });
  }, []);

  return (
    <div className="flight-list-container">
      <h1>Available Flights</h1>
      {error && <p className="error-message">{error}</p>}
      {flights.length > 0 ? (
        <div className="flights-grid">
          {flights.map((flight) => (
            <div className="flight-card" key={flight.id}>
              <h2>{flight.flightName || "Flight Name Not Available"}</h2>
              <p><strong>Source:</strong> {flight.source}</p>
              <p><strong>Destination:</strong> {flight.destination}</p>
              <p><strong>Flight Duration:</strong> {flight.duration} hrs</p>
              <p><strong>Seat Availability:</strong> {flight.availableSeats}</p>
              <p><strong>Price:</strong> ₹{flight.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No flights available at the moment.</p>
      )}
    </div>
  );
};

export default FlightList;
