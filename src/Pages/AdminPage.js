import React, { useState, useEffect } from "react";
import IdCardService from "./IdCardService";
import './AdminPage.css';

const AdminDashboard = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [selectedIdCard, setSelectedIdCard] = useState(null);

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = () => {
    IdCardService.getPendingIdCards()
      .then((response) => {
        setPendingRequests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching pending requests:", error);
      });
  };

  const handleVerifyClick = (idCard) => {
    setSelectedIdCard(idCard);
  };

  const handleApprove = (id) => {
    const confirmApprove = window.confirm("Are you sure you want to approve this request?");
    if (confirmApprove) {
      IdCardService.updateStatus(id, "Approved")
        .then(() => {
          alert("ID Card Approved Successfully!");
          setSelectedIdCard(null);
          fetchPendingRequests(); // Refresh pending requests list
        })
        .catch((error) => {
          console.error("Error approving ID card:", error);
        });
    }
  };

  return (
    <div className="admindiv" style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Admin Dashboard</h2>

      {/* Pending Requests List */}
      {selectedIdCard === null ? (
  <div className="table-container">
    <h3 className="table-title">Pending Requests</h3>
    {pendingRequests.length > 0 ? (
      <table className="pending-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Student ID</th>
            <th>Email</th>
            <th>Year</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pendingRequests.map((idCard) => (
            <tr key={idCard.id}>
              <td>{idCard.name}</td>
              <td>{idCard.studentId}</td>
              <td>{idCard.email}</td>
              <td>{idCard.year}</td>
              <td>
                <button className="verify-btn" onClick={() => handleVerifyClick(idCard)}>
                  Verify
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>No pending requests</p>
    )}
  </div>
) : (
  <div className="verify-container">
  <div className="verify-box">
    <h3>Verify Student Details</h3>
    
    <div className="verify-details">
      <p><strong>Name:</strong> {selectedIdCard.name}</p>
      <p><strong>Email:</strong> {selectedIdCard.email}</p>
      <p><strong>Student ID:</strong> {selectedIdCard.studentId}</p>
      <p><strong>Year:</strong> {selectedIdCard.year}</p>
      <p><strong>Mobile:</strong> {selectedIdCard.mobileNo}</p>
      <p><strong>Class:</strong> {selectedIdCard.studentClass}</p>
      <p><strong>Blood Group:</strong> {selectedIdCard.bloodGroup}</p>
      <p><strong>Address:</strong> {selectedIdCard.address}</p>
      <p><strong>Status:</strong> {selectedIdCard.status}</p>
    </div>

    <div className="verify-btns">
      <button className="approve-btn" onClick={() => handleApprove(selectedIdCard.id)}>Approve</button>
      <button className="back-btn" onClick={() => setSelectedIdCard(null)}>Back</button>
    </div>
  </div>
</div>

)}

    </div>
  );
};

export default AdminDashboard;
