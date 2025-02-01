import React, { useState, useEffect } from "react";
import FlightService from "./FlightService";
import UserService from "./UserService";
import "./AdminPage.css";
import flightlogo from './flightlogo.jpg';

const AdminDashboard = () => {
  const [selectedOption, setSelectedOption] = useState("showFlights");
  const [flights, setFlights] = useState([]);
  const [flight, setFlight] = useState({
    flightName: "",
    departure: "",
    destination: "",
    departureTime: "",
    arrivalTime: "",
    price: "",
    totalSeats: "",
    availableSeats: 0, // Default to 0 to avoid null values
    airlineCode: "",
  });
  const [admin, setAdmin] = useState({ email: "", password: "", role: "admin" });

  useEffect(() => {
    if (selectedOption === "showFlights") {
      FlightService.getAllFlights()
        .then((response) => setFlights(response.data))
        .catch((error) => console.error("Error fetching flights:", error));
    }
  }, [selectedOption]);

  const handleFlightChange = (e) => {
    setFlight({ ...flight, [e.target.name]: e.target.value });
  };

  const handleFlightSubmit = (e) => {
    e.preventDefault();
  
    // Format departureTime and arrivalTime to the desired format 'yyyy-MM-dd HH:mm'
    const formatDate = (date) => {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = ("0" + (d.getMonth() + 1)).slice(-2); // Ensure month is 2 digits
      const day = ("0" + d.getDate()).slice(-2); // Ensure day is 2 digits
      const hours = ("0" + d.getHours()).slice(-2); // Ensure hours are 2 digits
      const minutes = ("0" + d.getMinutes()).slice(-2); // Ensure minutes are 2 digits
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    };
  
    const formattedFlight = {
      ...flight,
      departureTime: formatDate(flight.departureTime), // Format the date to match backend format
      arrivalTime: formatDate(flight.arrivalTime),     // Format the date to match backend format
      availableSeats: flight.totalSeats, // Assign availableSeats from totalSeats
    };
  
    FlightService.addFlight(formattedFlight)
      .then(() => {
        alert("Flight Added Successfully!");
        setSelectedOption("showFlights");
      })
      .catch((error) => console.error("Error adding flight:", error));
  };
  

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    UserService.addUser(admin)
      .then(() => {
        alert("Admin Added Successfully!");
        setAdmin({ email: "", password: "", role: "admin" });
      })
      .catch((error) => console.error("Error adding admin:", error));
  };

  const handleDelete = (flightId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this flight?");
    if (confirmDelete) {
      FlightService.deleteFlight(flightId)
        .then(() => {
          alert("Flight deleted successfully!");
          setFlights(flights.filter((flight) => flight.id !== flightId));
        })
        .catch((error) => console.error("Error deleting flight:", error));
    }
  };
  

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <button onClick={() => setSelectedOption("showFlights")}>Show Flights</button>
        <button onClick={() => setSelectedOption("addFlight")}>Add Flight</button>
        <button onClick={() => setSelectedOption("addAdmin")}>Add Admin</button>
      </div>

      {/* Main Content */}
      <div className="content">
      {selectedOption === "showFlights" && (
  <div className="table-container">
    <h2>All Flights</h2>
    <table className="flight-table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Flight Name</th>
          <th>Departure</th>
          <th>Destination</th>
          <th>Departure Time</th>
          <th>Arrival Time</th>
          <th>Total Seats</th>
          <th>Available Seats</th>
          <th>Price</th>
          <th>Airline Code</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {flights.map((flight) => (
          <tr key={flight.id}>
            <td>
              <img src={flightlogo} alt={flight.flightName} />
            </td>
            <td>{flight.flightName}</td>
            <td>{flight.departure}</td>
            <td>{flight.destination}</td>
            <td>{flight.departureTime}</td>
            <td>{flight.arrivalTime}</td>
            <td>{flight.totalSeats}</td>
            <td>{flight.availableSeats}</td>
            <td>${flight.price}</td>
            <td>{flight.airlineCode}</td>
            <td>
              <button 
                className="delete-btn"
                onClick={() => handleDelete(flight.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}




        {selectedOption === "addFlight" && (
          <div>
            <h2>Add Flight</h2>
            <form onSubmit={handleFlightSubmit}>
              <input type="text" name="flightName" placeholder="Flight Name" onChange={handleFlightChange} required />
              <input type="text" name="departure" placeholder="Departure" onChange={handleFlightChange} required />
              <input type="text" name="destination" placeholder="Destination" onChange={handleFlightChange} required />
              <input type="datetime-local" name="departureTime" onChange={handleFlightChange} required />
              <input type="datetime-local" name="arrivalTime" onChange={handleFlightChange} required />
              <input type="number" name="price" placeholder="Price" onChange={handleFlightChange} required />
              <input type="number" name="totalSeats" placeholder="Total Seats" onChange={handleFlightChange} required />
              <input type="text" name="airlineCode" placeholder="Airline Code" onChange={handleFlightChange} required />
              <button type="submit">Add Flight</button>
            </form>
          </div>
        )}

        {selectedOption === "addAdmin" && (
          <div>
            <h2>Add Admin</h2>
            <form onSubmit={handleAdminSubmit}>
              <input type="email" placeholder="Admin Email" onChange={(e) => setAdmin({ ...admin, email: e.target.value })} required />
              <input type="password" placeholder="Password" onChange={(e) => setAdmin({ ...admin, password: e.target.value })} required />
              <button type="submit">Add Admin</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
