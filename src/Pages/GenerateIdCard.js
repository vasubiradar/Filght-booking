import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IdCardService from "./IdCardService";
import "./GenerateIDCard.css"; // Styling
import logo from "./logo.jpg";
import profile from './profile.png';
import htmlToImage from 'html-to-image';
import { toPng } from 'html-to-image';


const GenerateIDCard = () => {
  const navigate = useNavigate();
  const studentId = localStorage.getItem("userId"); // Get user ID from localStorage

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    bloodGroup: "",
    address: "",
    year: "",
    mobileNo: "",
    studentClass: "",
    studentId: studentId, // Auto-fill Student ID
    status: "Pending", // Default status
  });

  const [idCardData, setIdCardData] = useState(null); // Store fetched ID card details
  const [loading, setLoading] = useState(true);
  const [viewIdCard, setViewIdCard] = useState(false);

  // Fetch ID card details for the logged-in user
  useEffect(() => {
    if (studentId) {
      IdCardService.findIdCardByStudentId(studentId)
        .then((response) => {
          setIdCardData(response.data);
        })
        .catch(() => {
          setIdCardData(null); // No record found, show form
        })
        .finally(() => setLoading(false));
    }
  }, [studentId]);

  // Download ID Card as Image
const downloadIdCard = () => {
  const node = document.getElementById('id-card-container');
  
  toPng(node)
    .then(function (dataUrl) {
      const link = document.createElement('a');
      link.download = 'id_card.png';
      link.href = dataUrl;
      link.click();
    })
    .catch(function (error) {
      console.error("Error downloading the ID card:", error);
    });
};


  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    IdCardService.addIdCard(formData)
      .then(() => {
        alert("ID Card application submitted successfully!");
        window.location.reload(); // Refresh page to update UI
      })
      .catch((error) => {
        console.error("Error submitting ID Card application:", error);
      });
  };

  // Cancel ID Card Request
  const handleCancelRequest = () => {
    const confirmCancel = window.confirm("Are you sure you want to cancel the request?");
    if (confirmCancel) {
      IdCardService.deleteIdCardByStudentId(studentId)
        .then(() => {
          alert("Your ID Card request has been canceled.");
          window.location.reload(); // Refresh page to show form again
        })
        .catch((error) => {
          console.error("Error canceling request:", error);
        });
    }
  };

  const handleViewIdCard = () => {
    setViewIdCard(!viewIdCard);
  };

  // Download ID Card as Image
  

  if (loading) return <p>Loading...</p>;

  return (
    <div className="id-card-form-container">
      {idCardData ? (
        <div>
          <h2>ID Card Request Status</h2>
          <p><strong>Name:</strong> {idCardData.name}</p>
          <p><strong>Email:</strong> {idCardData.email}</p>
          <p><strong>Student ID:</strong> {idCardData.studentId}</p>
          <p><strong>Status:</strong> {idCardData.status}</p>
          {idCardData.status === "Pending" && (
            <button className="cancel-btn" onClick={handleCancelRequest}>
              Cancel Approval Request
            </button>
          )}
        { idCardData.status === "Approved" && (
  <>
    <button className="view-id-btn" onClick={handleViewIdCard}>
      {viewIdCard ? "Hide ID Card" : "View ID Card"}
    </button>

    {viewIdCard && (
      <div className="id-card-display">
        <div className="id-card-container" id="id-card-container">
          <div className="id-card-header">
            <img src={logo} alt="Logo" className="id-card-logo" />
            <h3 className="head">College of Computer Science and Information Technology</h3>
            <p className="head">NAAC Reaccredited Grade</p>
            <p className="head">Ambajogai Road, Latur - 413 531</p>
            <p className="head">Founded: 1982</p>
          </div>
          <div className="id-card-body">
            <img src={profile} alt="Profile" className="profile-img" />
            <div className="id-card-details">
              <p><strong>Name:</strong> {idCardData.name}</p>
              <p><strong>Student ID:</strong> {idCardData.studentId}</p>
              <p><strong>Email:</strong> {idCardData.email}</p>
              <p><strong>Mobile:</strong> {idCardData.mobileNo}</p>
              <p><strong>Class:</strong> {idCardData.studentClass}</p>
              <p><strong>Blood Group:</strong> {idCardData.bloodGroup}</p>
              <p><strong>Address:</strong> {idCardData.address}</p>
              <p><strong>Academic Year:</strong> {idCardData.year}</p>
            </div>
          </div>
        </div>
      </div>
    )}

    <button className="download-btn" onClick={downloadIdCard}>
      Download ID Card
    </button>
  </>
)}

        </div>
        
      ) : (
        <div>
          <h2>Apply for ID Card</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input type="date" name="dob" placeholder="Birth Date" value={formData.dob} onChange={handleChange} required />
            <input type="text" name="bloodGroup" placeholder="Blood Group" value={formData.bloodGroup} onChange={handleChange} required />
            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
            <input type="text" name="year" placeholder="Academic Year" value={formData.year} onChange={handleChange} required />
            <input type="text" name="mobileNo" placeholder="Mobile No." value={formData.mobileNo} onChange={handleChange} required />
            <input type="text" name="studentClass" placeholder="Class Name" value={formData.studentClass} onChange={handleChange} required />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default GenerateIDCard;
