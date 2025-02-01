import React, { useState } from "react";
import "./FlightBookingForm.css";

const FlightBookingForm = () => {
  const [bookingData, setBookingData] = useState({
    userId: "",
    flightId: "",
    passengerName: "",
    email: "",
    seatCount: 1,
    totalPrice: "",
    status: "CONFIRMED", // Default status
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Details Submitted:", bookingData);
    alert("Booking submitted successfully!");

    // Clear the form
    setBookingData({
      userId: "",
      flightId: "",
      passengerName: "",
      email: "",
      seatCount: 1,
      totalPrice: "",
      status: "CONFIRMED",
    });
  };

  return (
    <div className="booking-form-container">
      <h2>Flight Booking Form</h2>
      <form onSubmit={handleSubmit} className="booking-form">
        <label>User ID:</label>
        <input
          type="number"
          name="userId"
          value={bookingData.userId}
          onChange={handleChange}
          required
        />

        <label>Flight ID:</label>
        <input
          type="number"
          name="flightId"
          value={bookingData.flightId}
          onChange={handleChange}
          required
        />

        <label>Passenger Name:</label>
        <input
          type="text"
          name="passengerName"
          value={bookingData.passengerName}
          onChange={handleChange}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={bookingData.email}
          onChange={handleChange}
          required
        />

        <label>Seat Count:</label>
        <input
          type="number"
          name="seatCount"
          value={bookingData.seatCount}
          onChange={handleChange}
          min="1"
          required
        />

        <label>Total Price:</label>
        <input
          type="number"
          name="totalPrice"
          value={bookingData.totalPrice}
          onChange={handleChange}
          step="0.01"
          required
        />

        <label>Status:</label>
        <select
          name="status"
          value={bookingData.status}
          onChange={handleChange}
        >
          <option value="CONFIRMED">CONFIRMED</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>

        <button type="submit">Book Flight</button>
      </form>
    </div>
  );
};

export default FlightBookingForm;
