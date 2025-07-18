import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer";

const Register = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/api/users/register", formData);
            if (response.status === 201) {
                // Show toast notification for success
                toast.success("Account created successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                setTimeout(() => {
                    navigate("/login");
                }, 1500); // Navigate after 1.5 seconds
            }
        } catch (error) {
            // Show toast notification for error
            toast.error(error.response?.data?.message || "Something went wrong", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    return (
        <>
            <div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "90vh",
                        backgroundColor: "#FFFFFFFF",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            width: "80%",
                            maxWidth: "900px",
                            backgroundColor: "#13361C",
                            borderRadius: "12px",
                            overflow: "hidden",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        {/* Left Section */}
                        <div
                            style={{
                                flex: "1",
                                overflow: "hidden",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "25px",
                            }}
                        >
                            <img
                                src="/assets/images/image1.avif"
                                alt="Register"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                }}
                            />
                        </div>

                        {/* Right Form Section */}
                        <div
                            style={{
                                flex: "1",
                                backgroundColor: "#13361C",
                                color: "#FFFFFF",
                                padding: "40px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginBottom: "20px",
                                }}
                            >
                                <img
                                    src="/assets/icons/luxe.png"
                                    alt="Luxestay Logo"
                                    style={{ width: "60px", marginRight: "10px" }}
                                />
                                <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#CC9A48" }}>
                                    LuxeStay
                                </h1>
                            </div>
                            <p style={{ fontSize: "18px", marginBottom: "20px" }}>
                                Book Your Stay, Your Way - Sign Up Today!
                            </p>

                            <form onSubmit={handleSubmit}>
                                <div style={{ marginBottom: "2px" }}>
                                    <label
                                        htmlFor="name"
                                        style={{ display: "block", marginBottom: "2px" }}
                                    >
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter your Fullname"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            width: "100%",
                                            padding: "10px",
                                            borderRadius: "5px",
                                            border: "1px solid #ccc",
                                        }}
                                    />
                                </div>

                                <div style={{ marginBottom: "2px" }}>
                                    <label
                                        htmlFor="email"
                                        style={{ display: "block", marginBottom: "2px" }}
                                    >
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            width: "100%",
                                            padding: "10px",
                                            borderRadius: "5px",
                                            border: "1px solid #ccc",
                                        }}
                                    />
                                </div>

                                <div style={{ marginBottom: "2px" }}>
                                    <label
                                        htmlFor="phone"
                                        style={{ display: "block", marginBottom: "2px" }}
                                    >
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        name="phone"
                                        placeholder="Enter your Phone number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            width: "100%",
                                            padding: "10px",
                                            borderRadius: "5px",
                                            border: "1px solid #ccc",
                                        }}
                                    />
                                </div>

                                <div style={{ marginBottom: "8px" }}>
                                    <label
                                        htmlFor="password"
                                        style={{ display: "block", marginBottom: "2px" }}
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            width: "100%",
                                            padding: "10px",
                                            borderRadius: "5px",
                                            border: "1px solid #ccc",
                                        }}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    style={{
                                        backgroundColor: "#CC9A48",
                                        color: "white",
                                        padding: "10px 20px",
                                        border: "none",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                        width: "100%",
                                        fontWeight: "bold",
                                        fontSize: "16px",
                                    }}
                                >
                                    Create Account
                                </button>
                            </form>

                            <p style={{ marginTop: "20px", fontSize: "14px" }}>
                                Already have an account?{" "}
                                <span
                                    style={{
                                        color: "#CC9A48",
                                        cursor: "pointer",
                                        textDecoration: "underline",
                                    }}
                                    onClick={() => navigate("/login")}
                                >
                                    Login
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Register;
