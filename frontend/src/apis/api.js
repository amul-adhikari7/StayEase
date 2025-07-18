import axios from 'axios'

// Backend configuration
const api = axios.create({
  baseURL: 'http://localhost:5000', // Update this if your backend runs on a different URL
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

// Authorization configuration
const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
}

// User APIs
export const loginUserApi = data => api.post('/api/users/login', data)
export const registerUserApi = data => api.post('/api/users/register', data)
export const fetchUserProfileApi = () => api.get('/api/users/profile', config)
export const updateUserProfileApi = data =>
  api.put('/api/users/profile', data, config)
export const verifyAccountApi = data =>
  api.post('/api/users/verify', data, config)
export const forgotPasswordApi = data =>
  api.post('/api/users/forgot-password', data)
export const resetPasswordApi = data =>
  api.post('/api/users/reset-password', data)

// Booking APIs
export const createBookingApi = data => api.post('/api/bookings', data, config)
export const fetchUserBookingsApi = () => api.get('/api/bookings/user', config)
export const fetchBookingByIdApi = id => api.get(`/api/bookings/${id}`, config)
export const fetchAllBookingsApi = () => api.get('/api/bookings', config)
export const updateBookingStatusApi = (id, data) =>
  api.put(`/api/bookings/${id}`, data, config)

// Hotel and Room APIs
export const fetchHotelsApi = () => api.get('/api/hotels')
export const fetchHotelByIdApi = id => api.get(`/api/hotels/${id}`)
export const createHotelApi = data => api.post('/api/hotels', data, config)
export const updateHotelApi = (id, data) =>
  api.put(`/api/hotels/${id}`, data, config)
export const deleteHotelApi = id => api.delete(`/api/hotels/${id}`, config)
export const addRoomToHotelApi = (hotelId, data) =>
  api.post(`/api/hotels/${hotelId}/rooms`, data, config)
export const updateRoomApi = (id, data) =>
  api.put(`/api/rooms/${id}`, data, config)
export const deleteRoomApi = id => api.delete(`/api/rooms/${id}`, config)
export const searchRoomsByNameApi = name =>
  api.get(`/api/room/search?name=${name}`)

// Payment APIs
export const processPaymentApi = data => api.post('/api/payments', data, config)

// Review APIs
export const addReviewApi = data => api.post('/api/reviews', data, config)
export const fetchReviewsForHotelApi = hotelId =>
  api.get(`/api/reviews/hotels/${hotelId}`)
export const deleteReviewApi = id => api.delete(`/api/reviews/${id}`, config)

export default api
