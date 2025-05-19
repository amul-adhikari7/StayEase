import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/Footer";

const AdminBookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/booking/all",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBookings(response.data.bookings || []); // Ensure bookings is an array
        setLoading(false);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch bookings"
        );
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const styles = {
    container: {
      display: "flex",
      minHeight: "100vh",
      backgroundColor: "#FFF2E5",
    },
    sidebar: {
      width: "250px",
      backgroundColor: "#13361C",
      color: "#FFFFFF",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    sidebarLink: {
      textDecoration: "none",
      color: "#FFFFFF",
      margin: "10px 0",
      padding: "10px 20px",
      borderRadius: "5px",
      textAlign: "center",
      width: "100%",
      backgroundColor: "#CC9A48",
      fontWeight: "bold",
      cursor: "pointer",
    },
    sidebarLinkActive: {
      backgroundColor: "#FFFFFF",
      color: "#13361C",
    },
    mainContent: {
      flex: 1,
      padding: "20px",
    },
    heading: {
      textAlign: "center",
      fontSize: "24px",
      fontWeight: "bold",
      color: "#13361C",
      marginBottom: "20px",
    },
    bookingList: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "20px",
    },
    bookingCard: {
      backgroundColor: "#FFFFFF",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      padding: "20px",
      textAlign: "left",
    },
    bookingInfo: {
      marginBottom: "10px",
      fontSize: "14px",
      color: "#555",
    },
    editButton: {
      display: "block",
      width: "100%",
      backgroundColor: "#4caf50",
      color: "#FFFFFF",
      border: "none",
      padding: "10px",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "bold",
    },
    noBookings: {
      textAlign: "center",
      fontSize: "18px",
      color: "#555",
    },
  };

  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>Loading...</div>
    );

  return (
    <>
      <div style={styles.container}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <h2>Admin Dashboard</h2>
          <div
            style={{
              width: "100%",
              textAlign: "center",
              borderBottom: "1px solid #FFFFFF",
              marginBottom: "20px",
              paddingBottom: "10px",
            }}
          />
          <button style={styles.sidebarLink} onClick={() => navigate("/hotel")}>
            Add Room
          </button>
          <button
            style={{ ...styles.sidebarLink, ...styles.sidebarLinkActive }}
          >
            View Bookings
          </button>
          <button style={styles.sidebarLink} onClick={() => navigate("/rooms")}>
            Manage Rooms
          </button>
        </div>

        {/* Main Content */}
        <div style={styles.mainContent}>
          <h1 style={styles.heading}>Admin Booking Management</h1>
          {bookings.length > 0 ? (
            <div style={styles.bookingList}>
              {bookings.map((booking) => (
                <div key={booking._id} style={styles.bookingCard}>
                  <h3 style={{ marginBottom: "10px" }}>
                    {booking.room?.roomName || "Room Name Unavailable"}
                  </h3>
                  <p style={styles.bookingInfo}>
                    <strong>Booking ID:</strong> {booking._id}
                  </p>
                  <p style={styles.bookingInfo}>
                    <strong>User:</strong>{" "}
                    {booking.user
                      ? `${booking.user.name} (${booking.user.email})`
                      : "User Info Unavailable"}
                  </p>
                  <p style={styles.bookingInfo}>
                    <strong>Hotel:</strong>{" "}
                    {booking.room?.hotelName || "Hotel Name Unavailable"}
                  </p>
                  <p style={styles.bookingInfo}>
                    <strong>Check-In Date:</strong>{" "}
                    {booking.checkInDate
                      ? new Date(booking.checkInDate).toLocaleDateString()
                      : "Check-In Date Unavailable"}
                  </p>
                  <p style={styles.bookingInfo}>
                    <strong>Status:</strong>{" "}
                    {booking.status || "Status Unavailable"}
                  </p>
                  <button
                    style={styles.editButton}
                    onClick={() =>
                      navigate(`/admin/booking/edit/${booking._id}`)
                    }
                  >
                    Edit Booking
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p style={styles.noBookings}>No bookings found.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminBookingList;
