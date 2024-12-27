import axios from "axios";

const API_URL = "https://goal-setter-backend-69u8.onrender.com/api/users/";

// Register
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("userToken", JSON.stringify(response.data));
  }

  return response.data;
};

// Login
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("userToken", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout
const logout = () => {
  localStorage.removeItem("userToken");
};

const authService = { register, login, logout };

export default authService;
