import React, { useState, useEffect } from "react";
import FlightService from "./FlightService";
import "./AllFlights.css";
import img from './../flight.jpg';
import { useNavigate } from "react-router-dom"; // Import to navigate
import { ImGithub } from "react-icons/im";
import flightlogo from './flightlogo.jpg';

const AllFlights = () => {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [search, setSearch] = useState({ from: "", to: "" });
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    FlightService.getAllFlights()
      .then((response) => {
        setFlights(response.data);
        setFilteredFlights(response.data);
      })
      .catch((error) => console.error("Error fetching flights:", error));
  }, []);

  // Handle Search Filter
  const handleSearch = () => {
    const filtered = flights.filter(
      (flight) =>
        flight.departure.toLowerCase().includes(search.from.toLowerCase()) &&
        flight.destination.toLowerCase().includes(search.to.toLowerCase())
    );
    setFilteredFlights(filtered);
  };

  // Handle "Book Now" button click
  const handleBookNow = (flightId) => {
    navigate(`/booking/${flightId}`); // Navigate to the booking page with flightId
  };

  return (
    <div className="all-flights-container">
      {/* Hero Section */}
      <div className="hero-section">
        <img src='https://media.nomadicmatt.com/2024/flighttips1.jpeg' alt="Flight" className="hero-image" />
        <div className="search-bar">
          <input
            type="text"
            placeholder="From"
            value={search.from}
            onChange={(e) => setSearch({ ...search, from: e.target.value })}
          />
          <input
            type="text"
            placeholder="To"
            value={search.to}
            onChange={(e) => setSearch({ ...search, to: e.target.value })}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>

      {/* Flights List Section */}
      <div className="flights-list">
        {filteredFlights.length > 0 ? (
          filteredFlights.map((flight) => (
            <div key={flight.id} className="flight-card">
              <img src='https://blog.air.irctc.co.in/wp-content/uploads/2023/12/flight-hero.jpg' alt={flight.flightName} />
              <div className="flight-details">
                <h3>{flight.flightName}</h3>
                <p><strong>From:</strong> {flight.departure}</p>
                <p><strong>To:</strong> {flight.destination}</p>
                <p><strong>Departure:</strong> {flight.departureTime}</p>
                <p><strong>Arrival:</strong> {flight.arrivalTime}</p>
                <p><strong>Seats:</strong> {flight.availableSeats}</p>
                <p><strong>Price:</strong> ${flight.price}</p>
                <button className="book-btn" onClick={() => handleBookNow(flight.id)}>Book Now</button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No flights found</p>
        )}
      </div>
    </div>
  );
};

export default AllFlights;
