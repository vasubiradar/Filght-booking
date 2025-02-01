import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "./UserService";
import BookingService from "./BookingService";
import FlightService from "./FlightService"; // Import the flight service
import "./profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [userId] = useState(localStorage.getItem("userId"));
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [userProfile, setUserProfile] = useState(null);
  const [userBookings, setUserBookings] = useState([]);
  const [showTicket, setShowTicket] = useState(false);
  const [ticketDetails, setTicketDetails] = useState(null);

  useEffect(() => {
    if (userId) {
      // Fetch user profile details
      UserService.getUserById(userId)
        .then((response) => setUserProfile(response.data))
        .catch(() => setUserProfile(null));

      // Fetch bookings based on userId
      BookingService.getBookingsByUserId(userId)
        .then((response) => setUserBookings(response.data))
        .catch(() => setUserBookings([]));
    }
  }, [userId]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleGenerateTicket = (booking) => {
    // Fetch flight details for the current booking's flightId
    FlightService.getFlightById(booking.flightId)
      .then((response) => {
        const flight = response.data;
        const ticket = {
          flightNumber: booking.flightId,
          departure: flight.departure,
          arrival: flight.destination,  // assuming destination is the arrival city
          departureTime: flight.departureTime,
          arrivalTime: flight.arrivalTime,
          status: booking.status,
          passengerName: booking.passengerName,
          email: booking.email,
          seatCount: booking.seatCount,
          totalPrice: booking.totalPrice,
          bookingDate: booking.bookingDate,
        };
        setTicketDetails(ticket); // Set the ticket details to be displayed
        setShowTicket(true); // Show the ticket
      })
      .catch(() => {
        // Handle error if flight details are not found
        alert("Unable to fetch flight details.");
      });
  };

  return (
    <div className="profile-page-container">
      <div className="jumbotron">
        <h1 className="profile-heading">Welcome to Your Profile, {username}!</h1>
        <p className="profile-subtitle">
          Explore your personal details and view your flight booking information.
        </p>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <h2>Personal Details</h2>
          {userProfile ? (
            <>
              <p><strong>Email:</strong> {userProfile.email}</p>
              <p><strong>Phone:</strong> {userProfile.phone}</p>
              <p><strong>Address:</strong> {userProfile.address}</p>
            </>
          ) : (
            <p>Loading your details...</p>
          )}
        </div>

        <div className="flight-booking-info">
          <h2>Your Flight Bookings</h2>
          {userBookings.length > 0 ? (
            userBookings.map((booking) => (
              <div key={booking.id} className="flight-card">
                <p><strong>Flight Number:</strong> {booking.flightId}</p>
                <p><strong>Seats Booked:</strong> {booking.seatCount}</p>
                <p><strong>Total Price:</strong> ${booking.totalPrice}</p>
                <button
                  onClick={() => handleGenerateTicket(booking)}
                  className="generate-ticket-btn"
                >
                  Generate Ticket
                </button>
              </div>
            ))
          ) : (
            <p>No flight bookings found.</p>
          )}
        </div>
      </div>

      <button onClick={handleLogout} className="logout-btn">Logout</button>

      {showTicket && ticketDetails && (
        <div className="ticket-modal">
          <div className="ticket-container">
            <div className="ticket-header">
            <img
          src="https://media.istockphoto.com/id/1258141375/vector/plane-travel-icon-air-travel-around-the-world-flying-around-the-world-travel-agency-logo.jpg?s=612x612&w=0&k=20&c=QaZk5NDYsdfKd_7iUNAe3CImkcwlzyaibpMuYIteeWY="
          alt="Airplane Logo"
          className="airplane-logo"
        />
              <h2 className="company-name">Flight Booking Company</h2>
            </div>
            <div className="ticket-body">
              <h3>Your Ticket</h3>
              <p><strong>Passenger:</strong> {ticketDetails.passengerName}</p>
              <p><strong>Email:</strong> {ticketDetails.email}</p>
              <p><strong>Flight Number:</strong> {ticketDetails.flightNumber}</p>
              <p><strong>Departure:</strong> {ticketDetails.departure}</p>
              <p><strong>Arrival:</strong> {ticketDetails.arrival}</p>
              <p><strong>Departure Time:</strong> {ticketDetails.departureTime}</p>
              <p><strong>Arrival Time:</strong> {ticketDetails.arrivalTime}</p>
              <p><strong>Status:</strong> {ticketDetails.status}</p>
              <p><strong>Seats Booked:</strong> {ticketDetails.seatCount}</p>
              <p><strong>Total Price:</strong> ${ticketDetails.totalPrice}</p>
              <p><strong>Booking Date:</strong> {ticketDetails.bookingDate}</p>
            </div>
            <button onClick={() => setShowTicket(false)} className="close-ticket-btn">Close Ticket</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
