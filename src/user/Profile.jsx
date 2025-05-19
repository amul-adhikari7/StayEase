import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Footer from "../components/Footer";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [showLogoutOverlay, setShowLogoutOverlay] = useState(false);
    const [showDeleteOverlay, setShowDeleteOverlay] = useState(false);
    const [showEditOverlay, setShowEditOverlay] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:5000/api/users/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(response.data);
                setFormData({
                    name: response.data.name,
                    email: response.data.email,
                    phone: response.data.phone,
                });
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to fetch user profile");
            }
        };

        fetchUserProfile();
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        toast.success("Logged out successfully");
        window.location.href = "/login";
    };

    const handleDelete = async () => {
        if (deleteConfirmation.toLowerCase() !== "delete") {
            toast.error("Please type 'DELETE' to confirm");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            await axios.delete("http://localhost:5000/api/users/profile/delete", {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Account deleted successfully");
            localStorage.clear();
            window.location.href = "/register";
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete profile");
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(
                "http://localhost:5000/api/users/profile/edit",
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success(response.data.message);
            setUser(response.data.user);
            setShowEditOverlay(false);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update profile");
        }
    };

    if (!user) return <div>Loading...</div>;

    return (
        <>
            <div style={{ padding: "20px", minHeight: "0vh", display: "flex", justifyContent: "space-around" }}>
                <div
                    style={{
                        width: "25%",
                        backgroundColor: "#FAF4F2",
                        padding: "20px",
                        borderRadius: "12px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        textAlign: "center",
                    }}
                >
                    <img
                        src="/assets/icons/user-avatar.png"
                        alt="User Avatar"
                        width="90"
                        height="90"
                        style={{
                            borderRadius: "50%",
                            marginBottom: "10px",
                        }}
                    />
                    <p style={{ fontWeight: "bold", fontSize: "18px" }}>{user.name}</p>

                    <button
                        style={{
                            width: "100%",
                            padding: "12px",
                            marginBottom: "10px",
                            backgroundColor: "#CC9A48",
                            color: "#FFFFFF",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontWeight: "bold",
                            fontSize: "16px",
                        }}
                    >
                        Profile
                    </button>
                    <button
                        onClick={() => (window.location.href = "/bookings")}
                        style={{
                            width: "100%",
                            padding: "12px",
                            marginBottom: "10px",
                            backgroundColor: "#CC9A48",
                            color: "#FFFFFF",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontWeight: "bold",
                            fontSize: "16px",
                        }}
                    >
                        My Booking
                    </button>
                    <button
                        onClick={() => setShowLogoutOverlay(true)}
                        style={{
                            width: "100%",
                            padding: "12px",
                            backgroundColor: "red",
                            color: "#FFFFFF",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontWeight: "bold",
                            fontSize: "16px",
                        }}
                    >
                        Log Out
                    </button>
                </div>

                <div
                    style={{
                        width: "70%",
                        backgroundColor: "#FFF9F5",
                        padding: "30px",
                        borderRadius: "12px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        fontFamily: "'Roboto Slab', serif",
                    }}
                >
                    <h2 style={{ marginBottom: "20px", fontWeight: "bold" }}>Personal Details</h2>
                    <div
                        style={{
                            border: "1px solid #E5E5E5",
                            borderRadius: "12px",
                            padding: "20px",
                            backgroundColor: "#FFFFFF",
                        }}
                    >
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "150px 1fr",
                                gap: "10px",
                                alignItems: "center",
                                marginBottom: "10px",
                                borderBottom: "1px solid #E5E5E5",
                                paddingBottom: "10px",
                            }}
                        >
                            <strong>Full Name:</strong>
                            <span>{user.name}</span>
                        </div>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "150px 1fr",
                                gap: "10px",
                                alignItems: "center",
                                marginBottom: "10px",
                                borderBottom: "1px solid #E5E5E5",
                                paddingBottom: "10px",
                            }}
                        >
                            <strong>Email:</strong>
                            <span>{user.email}</span>
                        </div>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "150px 1fr",
                                gap: "10px",
                                alignItems: "center",
                                marginBottom: "10px",
                                borderBottom: "1px solid #E5E5E5",
                                paddingBottom: "10px",
                            }}
                        >
                            <strong>Phone Number:</strong>
                            <span>{user.phone}</span>
                        </div>
                    </div>
                    <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
                        <button
                            onClick={() => setShowDeleteOverlay(true)}
                            style={{
                                backgroundColor: "red",
                                color: "#FFFFFF",
                                border: "none",
                                padding: "10px 20px",
                                borderRadius: "5px",
                                cursor: "pointer",
                                fontWeight: "bold",
                                fontSize: "14px",
                            }}
                        >
                            Delete Account
                        </button>
                        <button
                            onClick={() => setShowEditOverlay(true)}
                            style={{
                                backgroundColor: "#CC9A48",
                                color: "#FFFFFF",
                                border: "none",
                                padding: "10px 20px",
                                borderRadius: "5px",
                                cursor: "pointer",
                                fontWeight: "bold",
                                fontSize: "14px",
                            }}
                        >
                            Edit
                        </button>
                    </div>
                </div>
            </div>

            <Footer />

            {/* Logout Overlay */}
            {showLogoutOverlay && (
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
                        }}
                    >
                        <h2>Log Out</h2>
                        <p>Are you sure you want to log out?</p>
                        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                            <button
                                onClick={handleLogout}
                                style={{
                                    backgroundColor: "red",
                                    color: "#FFFFFF",
                                    border: "none",
                                    padding: "10px 20px",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                            >
                                Log Out
                            </button>
                            <button
                                onClick={() => setShowLogoutOverlay(false)}
                                style={{
                                    backgroundColor: "green",
                                    color: "#FFFFFF",
                                    border: "none",
                                    padding: "10px 20px",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Overlay */}
            {showEditOverlay && (
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
                        }}
                    >
                        <h2>Edit Profile</h2>
                        <form onSubmit={handleEditSubmit}>
                            <div style={{ marginBottom: "10px" }}>
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    style={{
                                        width: "100%",
                                        padding: "10px",
                                        borderRadius: "5px",
                                        border: "1px solid #ccc",
                                    }}
                                />
                            </div>
                            <div style={{ marginBottom: "10px" }}>
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    style={{
                                        width: "100%",
                                        padding: "10px",
                                        borderRadius: "5px",
                                        border: "1px solid #ccc",
                                    }}
                                />
                            </div>
                            <div style={{ marginBottom: "10px" }}>
                                <label>Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    style={{
                                        width: "100%",
                                        padding: "10px",
                                        borderRadius: "5px",
                                        border: "1px solid #ccc",
                                    }}
                                />
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                                <button
                                    type="submit"
                                    style={{
                                        backgroundColor: "#CC9A48",
                                        color: "#FFFFFF",
                                        border: "none",
                                        padding: "10px 20px",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                    }}
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setShowEditOverlay(false)}
                                    type="button"
                                    style={{
                                        backgroundColor: "red",
                                        color: "#FFFFFF",
                                        border: "none",
                                        padding: "10px 20px",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Delete Overlay */}
            {showDeleteOverlay && (
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
                        }}
                    >
                        <h2>Delete Account</h2>
                        <p>Type "DELETE" to confirm.</p>
                        <input
                            type="text"
                            value={deleteConfirmation}
                            onChange={(e) => setDeleteConfirmation(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                marginBottom: "10px",
                            }}
                        />
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <button
                                onClick={handleDelete}
                                style={{
                                    backgroundColor: "red",
                                    color: "#FFFFFF",
                                    border: "none",
                                    padding: "10px 20px",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                            >
                                Confirm
                            </button>
                            <button
                                onClick={() => setShowDeleteOverlay(false)}
                                style={{
                                    backgroundColor: "gray",
                                    color: "#FFFFFF",
                                    border: "none",
                                    padding: "10px 20px",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Profile;
