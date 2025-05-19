import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./EditBookingPage.css";

const EditBookingPage = () => {
    const { id } = useParams(); // Booking ID from URL
    const [formData, setFormData] = useState({
        checkInDate: "",
        duration: "",
        guests: "",
        status: "",
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:5000/api/booking/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const booking = response.data.booking;
                setFormData({
                    checkInDate: booking.checkInDate.split("T")[0],
                    duration: booking.duration,
                    guests: booking.guests,
                    status: booking.status,
                });
                setLoading(false);
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to fetch booking details");
                setLoading(false);
            }
        };

        fetchBookingDetails();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.put(`http://localhost:5000/api/booking/update/${id}`, formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Booking updated successfully");
            navigate("/admin/bookings");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update booking");
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="edit-booking-page-container">
            <h1>Edit Booking</h1>
            <form onSubmit={handleUpdate}>
                <div className="form-group">
                    <label>Check-In Date</label>
                    <input
                        type="date"
                        name="checkInDate"
                        value={formData.checkInDate}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Duration (days)</label>
                    <input
                        type="number"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        min="1"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Guests</label>
                    <input
                        type="number"
                        name="guests"
                        value={formData.guests}
                        onChange={handleInputChange}
                        min="1"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
                <button type="submit" className="btn-save">Save Changes</button>
                <button
                    type="button"
                    className="btn-cancel"
                    onClick={() => navigate("/admin/bookings")}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default EditBookingPage;
