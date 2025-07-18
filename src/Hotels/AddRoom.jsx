import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/Footer";

const AddRoom = () => {
    const [formData, setFormData] = useState({
        roomName: "",
        hotelName: "",
        price: "",
        location: "",
        description: "",
        noOfBeds: "",
    });

    const [image, setImage] = useState(null); // Image file
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleReset = () => {
        setFormData({
            roomName: "",
            hotelName: "",
            price: "",
            location: "",
            description: "",
            noOfBeds: "",
        });
        setImage(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!image) {
            toast.error("Please upload an image");
            setLoading(false);
            return;
        }

        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => formDataToSend.append(key, formData[key]));
        formDataToSend.append("image", image);

        try {
            const response = await axios.post("http://localhost:5000/api/room/create", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 201) {
                toast.success("Room created successfully!");
                handleReset();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create room");
        } finally {
            setLoading(false);
        }
    };

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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        formContainer: {
            width: "100%",
            maxWidth: "500px",
            backgroundColor: "#FFFFFF",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
        heading: {
            marginBottom: "20px",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#13361C",
            textAlign: "center",
        },
        input: {
            width: "100%",
            padding: "10px",
            margin: "10px 0",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "16px",
        },
        textarea: {
            width: "100%",
            padding: "10px",
            margin: "10px 0",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "16px",
            resize: "none",
        },
        buttonContainer: {
            display: "flex",
            justifyContent: "space-between",
        },
        button: {
            flex: 1,
            padding: "10px",
            fontSize: "16px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            margin: "5px",
        },
        addButton: {
            backgroundColor: "#4CAF50",
            color: "#fff",
        },
        resetButton: {
            backgroundColor: "#f44336",
            color: "#fff",
        },
        tooltip: {
            fontSize: "12px",
            color: "#555",
            textAlign: "left",
        },
    };

    return (
        <>
            <div style={styles.container}>
                {/* Sidebar */}
                <div style={styles.sidebar}>
                    <h2>Admin Dashboard</h2>
                    <Link to="/hotel" style={{ ...styles.sidebarLink, ...styles.sidebarLinkActive }}>
                        Add Room
                    </Link>
                    <Link to="/admin/bookings" style={styles.sidebarLink}>
                        View Bookings
                    </Link>
                    <Link to="/rooms" style={styles.sidebarLink}>
                        Manage Rooms
                    </Link>
                </div>

                {/* Main Content */}
                <div style={styles.mainContent}>
                    <div style={styles.formContainer}>
                        <h1 style={styles.heading}>Add Room</h1>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="roomName"
                                placeholder="Room Type (e.g., Deluxe, Suite)"
                                value={formData.roomName}
                                onChange={handleChange}
                                required
                                style={styles.input}
                            />
                            <input
                                type="text"
                                name="hotelName"
                                placeholder="Hotel Name"
                                value={formData.hotelName}
                                onChange={handleChange}
                                required
                                style={styles.input}
                            />
                            <input
                                type="number"
                                name="price"
                                placeholder="Price (in USD)"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                style={styles.input}
                            />
                            <input
                                type="text"
                                name="location"
                                placeholder="Location (e.g., Kathmandu, Nepal)"
                                value={formData.location}
                                onChange={handleChange}
                                required
                                style={styles.input}
                            />
                            <textarea
                                name="description"
                                placeholder="Room Description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                style={styles.textarea}
                            />
                            <input
                                type="number"
                                name="noOfBeds"
                                placeholder="Number of Beds"
                                value={formData.noOfBeds}
                                onChange={handleChange}
                                required
                                style={styles.input}
                            />
                            <input
                                type="file"
                                name="image"
                                onChange={handleImageChange}
                                accept="image/*"
                                required
                                style={styles.input}
                            />
                            <span style={styles.tooltip}>Accepted formats: .jpg, .png, .jpeg</span>
                            <div style={styles.buttonContainer}>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    style={{ ...styles.button, ...styles.addButton }}
                                >
                                    {loading ? "Adding Room..." : "Add Room"}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    style={{ ...styles.button, ...styles.resetButton }}
                                >
                                    Reset Form
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AddRoom;
