import axios from "axios";

const BASE_URL = "http://localhost:8900/idcards"; // Base endpoint for ID cards

class IdCardService {
  // Fetch all ID cards
  getIdCards() {
    return axios.get(`${BASE_URL}`);
  }

  // Add a new ID card request
  addIdCard(idCard) {
    return axios.post(`${BASE_URL}`, idCard);
  }

  // Find ID card by email
  findIdCardByEmail(email) {
    return axios.get(`${BASE_URL}/email/${email}`);
  }

  // Find ID card by Student ID
  findIdCardByStudentId(studentId) {
    return axios.get(`${BASE_URL}/studentId/${studentId}`);
  }

  // Get all pending ID card requests
  getPendingIdCards() {
    return axios.get(`${BASE_URL}/pending`);
  }

  // Get all approved ID card requests (for Admin Dashboard)
  getApprovedIdCards() {
    return axios.get(`${BASE_URL}/approved`);
  }

  // Update ID card status (Approve/Reject)
  updateStatus(id, status) {
    return axios.put(`${BASE_URL}/${id}/status?status=${status}`);
  }

  // Delete ID card request by Student ID (Cancel Request)
  deleteIdCardByStudentId(studentId) {
    return axios.delete(`${BASE_URL}/studentId/${studentId}`);
  }
}

export default new IdCardService();
