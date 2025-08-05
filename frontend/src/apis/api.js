import axios from "axios";

// Backend configuration
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Update this if your backend runs on a different URL
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Authorization configuration
const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

// User APIs
export const loginUserApi = (data) => api.post("/users/login", data);
export const registerUserApi = (data) => api.post("/users/register", data);
export const fetchUserProfileApi = () => api.get("/users/profile", config);
export const updateUserProfileApi = (data) =>
  api.put("/users/profile", data, config);
export const verifyAccountApi = (data) =>
  api.post("/users/verify", data, config);
export const forgotPasswordApi = (data) =>
  api.post("/users/forgot-password", data);
export const resetPasswordApi = (data) =>
  api.post("/users/reset-password", data);

// Booking APIs
export const createBookingApi = (data) =>
  api.post("/bookings/create", data, config);
let hasLoggedBookings404 = false;
export const fetchUserBookingsApi = async () => {
  try {
    // Updated to match backend route
    const response = await api.get("/bookings/users", config);
    return response;
  } catch (error) {
    // Handle various error cases gracefully
    if (error.response) {
      // Server responded with error
      if (error.response.status === 404 || error.response.status === 401) {
        if (!hasLoggedBookings404) {
          console.info(
            "User not logged in or has no bookings. Returning empty array."
          );
          hasLoggedBookings404 = true;
        }
        return { data: [] };
      }
    } else if (error.request) {
      // Request made but no response
      console.warn("No response from booking service. Please try again later.");
      return { data: [] };
    }
    // Only throw for unexpected errors
    throw error;
  }
};
export const fetchBookingByIdApi = (id) => api.get(`/bookings/${id}`, config);
export const fetchAllBookingsApi = () => api.get("/bookings/all", config);
export const updateBookingStatusApi = (id, data) =>
  api.put(`/bookings/update/${id}`, data, config);

// Hotel and Room APIs
export const fetchHotelsApi = () => api.get("/hotels");
export const fetchHotelByIdApi = (id) => api.get(`/hotels/${id}`);
export const createHotelApi = (data) => api.post("/hotels", data, config);
export const updateHotelApi = (id, data) =>
  api.put(`/hotels/${id}`, data, config);
export const deleteHotelApi = (id) => api.delete(`/hotels/${id}`, config);
export const addRoomToHotelApi = (hotelId, data) =>
  api.post(`/hotels/${hotelId}/rooms`, data, config);
export const updateRoomApi = (id, data) =>
  api.put(`/rooms/${id}`, data, config);
export const deleteRoomApi = (id) => api.delete(`/rooms/${id}`, config);
export const searchRoomsByNameApi = (name) =>
  api.get(`/room/search?name=${name}`);

// Payment APIs
export const processPaymentApi = (data) => api.post("/payments", data, config);

// Review APIs
export const addReviewApi = (data) => api.post("/reviews", data, config);
export const fetchReviewsForHotelApi = (hotelId) =>
  api.get(`/reviews/hotels/${hotelId}`);
export const deleteReviewApi = (id) => api.delete(`/reviews/${id}`, config);

export default api;
