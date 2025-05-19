import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Footer from "../components/Footer";

const Bookingdetail = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showCancelOverlay, setShowCancelOverlay] = useState(false);
    const [bookingToCancel, setBookingToCancel] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:5000/api/booking/user", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBookings(response.data.bookings);
                setLoading(false);
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to fetch booking details");
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const handleCloseModal = () => {
        setSelectedBooking(null);
    };

    const handleCancelBooking = async () => {
        if (!bookingToCancel) return;

        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(
                `http://localhost:5000/api/booking/${bookingToCancel}/status`,
                { status: "cancelled" },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.status === 200) {
                toast.success("Booking cancelled successfully!");
                setBookings((prevBookings) =>
                    prevBookings.map((booking) =>
                        booking._id === bookingToCancel
                            ? { ...booking, status: "cancelled" }
                            : booking
                    )
                );
                setShowCancelOverlay(false);
                setBookingToCancel(null);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to cancel booking");
            setShowCancelOverlay(false);
            setBookingToCancel(null);
        }
    };


    if (loading) return <div>Loading...</div>;

    return (
        <>
            <div
                style={{
                    padding: "20px",
                    minHeight: "80vh",
                    fontFamily: "'Roboto Slab', serif",
                }}
            >
                <h1 style={{ marginBottom: "20px", fontWeight: "bold", textAlign: "center" }}>
                    My Bookings
                </h1>
                <hr style={{ marginBottom: "20px" }} />
                {bookings.length > 0 ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                        {bookings.map((booking) => (
                            <div
                                key={booking._id}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    backgroundColor: "#FFF9F5",
                                    padding: "15px",
                                    borderRadius: "12px",
                                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "15px",
                                    }}
                                >
                                    <img
                                        src={`http://localhost:5000/rooms/${booking.room.image}`}
                                        alt={booking.room.roomName}
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                            borderRadius: "12px",
                                            objectFit: "cover",
                                        }}
                                    />
                                    <div>
                                        <h2
                                            style={{
                                                fontSize: "18px",
                                                fontWeight: "bold",
                                                marginBottom: "5px",
                                            }}
                                        >
                                            {booking.room.hotelName}
                                        </h2>
                                        <p
                                            style={{
                                                fontSize: "14px",
                                                color: "#555",
                                                margin: "0 0 5px",
                                            }}
                                        >
                                            Room Type: {booking.room.roomName}
                                        </p>
                                        <p
                                            style={{
                                                fontSize: "14px",
                                                color:
                                                    booking.status === "cancelled"
                                                        ? "red"
                                                        : "#555",
                                                margin: "0 0 5px",
                                            }}
                                        >
                                            Status: {booking.status.toUpperCase()}
                                        </p>
                                        <button
                                            style={{
                                                background: "none",
                                                border: "none",
                                                color: "#CC9A48",
                                                textDecoration: "underline",
                                                fontWeight: "bold",
                                                fontSize: "14px",
                                                cursor: "pointer",
                                                padding: 0,
                                            }}
                                            onClick={() => setSelectedBooking(booking)}
                                        >
                                            Booking Details
                                        </button>
                                    </div>
                                </div>
                                {booking.status === "pending" && (
                                    <button
                                        style={{
                                            backgroundColor: "red",
                                            color: "#FFFFFF",
                                            padding: "10px 20px",
                                            borderRadius: "5px",
                                            border: "none",
                                            cursor: "pointer",
                                            fontWeight: "bold",
                                        }}
                                        onClick={() => {
                                            setShowCancelOverlay(true);
                                            setBookingToCancel(booking._id);
                                        }}
                                    >
                                        Cancel Booking
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p style={{ textAlign: "center", fontSize: "16px" }}>No bookings found.</p>
                )}

                {/* Popup Modal */}
                {selectedBooking && (
                    <div
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 1000,
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: "#FFFFFF",
                                padding: "20px",
                                borderRadius: "12px",
                                width: "400px",
                                textAlign: "center",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            <button
                                onClick={handleCloseModal}
                                style={{
                                    background: "none",
                                    border: "none",
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    color: "red",
                                    float: "right",
                                    cursor: "pointer",
                                }}
                            >
                                ×
                            </button>
                            <h2 style={{ marginBottom: "20px", fontWeight: "bold" }}>
                                Booking Details
                            </h2>
                            <table
                                style={{
                                    width: "100%",
                                    borderCollapse: "collapse",
                                    marginBottom: "20px",
                                }}
                            >
                                <tbody>
                                    <tr>
                                        <td style={{ fontWeight: "bold", padding: "5px" }}>
                                            Booking ID:
                                        </td>
                                        <td>{selectedBooking._id}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: "bold", padding: "5px" }}>
                                            Full Name:
                                        </td>
                                        <td>{selectedBooking.user.name}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: "bold", padding: "5px" }}>
                                            Phone:
                                        </td>
                                        <td>{selectedBooking.user.phone}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: "bold", padding: "5px" }}>
                                            Check-In:
                                        </td>
                                        <td>
                                            {new Date(selectedBooking.checkInDate).toLocaleDateString()}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: "bold", padding: "5px" }}>
                                            Duration:
                                        </td>
                                        <td>{selectedBooking.duration} Day(s)</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: "bold", padding: "5px" }}>
                                            Guests:
                                        </td>
                                        <td>{selectedBooking.guests}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: "bold", padding: "5px" }}>
                                            Payment Method:
                                        </td>
                                        <td>{selectedBooking.paymentType}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: "bold", padding: "5px" }}>
                                            Total Price:
                                        </td>
                                        <td>NPR {selectedBooking.totalPrice}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div>
                                <button
                                    style={{
                                        backgroundColor: "#CC9A48",
                                        color: "#FFFFFF",
                                        padding: "10px 20px",
                                        borderRadius: "5px",
                                        border: "none",
                                        cursor: "pointer",
                                        fontWeight: "bold",
                                        marginRight: "10px",
                                    }}
                                >
                                    Print Invoice
                                </button>
                                <button
                                    style={{
                                        backgroundColor: "green",
                                        color: "#FFFFFF",
                                        padding: "10px 20px",
                                        borderRadius: "5px",
                                        border: "none",
                                        cursor: "pointer",
                                        fontWeight: "bold",
                                    }}
                                    onClick={handleCloseModal}
                                >
                                    Done
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {/* Cancel Booking Overlay */}
                {showCancelOverlay && (
                    <div
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 1000,
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: "#FFFFFF",
                                padding: "20px",
                                borderRadius: "12px",
                                textAlign: "center",
                                width: "400px",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            <h2 style={{ marginBottom: "10px", fontWeight: "bold" }}>
                                Cancel Booking?
                            </h2>
                            <p style={{ marginBottom: "20px" }}>
                                Are you sure you want to cancel this reservation?
                            </p>
                            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                                <button
                                    style={{
                                        backgroundColor: "green",
                                        color: "#FFFFFF",
                                        border: "none",
                                        padding: "10px 20px",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => {
                                        setShowCancelOverlay(false);
                                        setBookingToCancel(null);
                                    }}
                                >
                                    No
                                </button>
                                <button
                                    style={{
                                        backgroundColor: "red",
                                        color: "#FFFFFF",
                                        border: "none",
                                        padding: "10px 20px",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                    }}
                                    onClick={handleCancelBooking}
                                >
                                    Yes
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </>
    );
};

export default Bookingdetail;