import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // To get the flightId from URL
import BookingService from "./BookingService"; // Import the BookingService
import "./bookingform.css"; // Add your CSS

const FlightBookingForm = () => {
  const { flightId } = useParams(); // Get the flightId from URL
  const [userId, setUserId] = useState(null);
  const [passengerName, setPassengerName] = useState("");
  const [email, setEmail] = useState("");
  const [seatCount, setSeatCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [flight, setFlight] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("userId"); // Retrieve user ID from localStorage
    setUserId(user); 

    // Fetch flight details based on flightId
    fetch(`http://localhost:8900/flights/${flightId}`)
      .then((response) => response.json())
      .then((data) => setFlight(data))
      .catch((error) => console.error("Error fetching flight details:", error));
  }, [flightId]);

  useEffect(() => {
    if (flight) {
      setTotalPrice(flight.price * seatCount); // Calculate total price based on selected seats
    }
  }, [flight, seatCount]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const booking = {
      userId: userId,
      flightId: flightId,
      passengerName: passengerName,
      email: email,
      seatCount: seatCount,
      totalPrice: totalPrice,
      status: "CONFIRMED",
    };

    BookingService.addBooking(booking)
      .then((response) => {
        alert("Booking confirmed!");
        // Redirect to a success page or reset form here
      })
      .catch((error) => console.error("Error booking the flight:", error));
  };

  return (
    <div className="booking-form-container">
      {flight ? (
        <form onSubmit={handleSubmit} className="booking-form">
          <h2>Booking Form</h2>
          <label>
            Passenger Name:
            <input
              type="text"
              value={passengerName}
              onChange={(e) => setPassengerName(e.target.value)}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Seats:
            <input
              type="number"
              value={seatCount}
              onChange={(e) => setSeatCount(e.target.value)}
              min="1"
              required
            />
          </label>
          <p><strong>Total Price: </strong>${totalPrice}</p>
          <button type="submit" className="submit-btn">Confirm Booking</button>
        </form>
      ) : (
        <p>Loading flight details...</p>
      )}
    </div>
  );
};

export default FlightBookingForm;
