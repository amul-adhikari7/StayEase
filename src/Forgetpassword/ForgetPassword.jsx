import React, { useState } from "react";
import { toast } from "react-toastify";
import { forgotPasswordApi, resetPasswordApi } from "../apis/api";

const ForgetPassword = ({ onClose = () => { } }) => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [step, setStep] = useState(1);
    const [serverOtp, setServerOtp] = useState(""); // Store the OTP sent from the server

    const handleSendOtp = async () => {
        if (!email.includes("@") || email.trim() === "") {
            toast.error("Please enter a valid email address");
            return;
        }
        try {
            const response = await forgotPasswordApi({ email });
            if (response.status === 200) {
                toast.success("OTP sent to your email!");
                setServerOtp(response.data.otp); // Store OTP from server (for demo purposes)
                setStep(2);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send OTP. Please try again.");
        }
    };

    const handleVerifyOtp = async () => {
        if (!otp) {
            toast.error("Please enter the OTP");
            return;
        }

        if (otp !== String(serverOtp)) { // Validate OTP
            toast.error("Invalid OTP. Please try again.");
            return;
        }

        toast.success("OTP verified successfully!");
        setStep(3);
    };

    const handleResetPassword = async () => {
        if (!newPassword || !confirmPassword) {
            toast.error("Please fill in both password fields");
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        try {
            const response = await resetPasswordApi({ email, otp, newPassword });
            if (response.status === 200) {
                toast.success("Password reset successfully!🥳🥂 ");
                onClose();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to reset password. Please try again.");
        }
    };

    return (
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
                    backgroundColor: "#13361C",
                    color: "#FFFFFF",
                    padding: "40px",
                    borderRadius: "12px",
                    width: "400px",
                    textAlign: "center",
                }}
            >
                <img
                    src="/assets/icons/luxe.png"
                    alt="Luxestay Logo"
                    style={{ width: "80px", marginBottom: "20px" }}
                />

                {step === 1 && (
                    <>
                        <h2>Forget Password?</h2>
                        <p>No worries, we'll send you a reset OTP</p>
                        <input
                            type="email"
                            placeholder="Enter your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                marginBottom: "20px",
                                border: "1px solid #ccc",
                            }}
                        />
                        <button
                            onClick={handleSendOtp}
                            style={{
                                backgroundColor: "#CC9A48",
                                color: "white",
                                padding: "10px 20px",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                width: "100%",
                                fontWeight: "bold",
                            }}
                        >
                            Send OTP
                        </button>

                        <div className="mt-3">
                            <a
                                href="/login"
                                style={{ marginTop: "20px", cursor: "pointer", color: "#CC9A48" }}
                            >
                                Back to Login
                            </a>
                        </div>
                    </>
                )}

                {step === 2 && (
                    <>
                        <h2>Verify OTP</h2>
                        <p>A verification code has been sent to your email</p>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                marginBottom: "15px",
                                border: "1px solid #ccc",
                            }}
                        />
                        <button
                            onClick={handleVerifyOtp}
                            style={{
                                backgroundColor: "#CC9A48",
                                color: "white",
                                padding: "10px 20px",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                width: "100%",
                                fontWeight: "bold",
                            }}
                        >
                            Verify OTP
                        </button>
                    </>
                )}

                {step === 3 && (
                    <>
                        <h2>Reset Password</h2>
                        <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                marginBottom: "15px",
                                border: "1px solid #ccc",
                            }}
                        />
                        <input
                            type="password"
                            placeholder="Confirm New Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                marginBottom: "15px",
                                border: "1px solid #ccc",
                            }}
                        />
                        <button
                            onClick={handleResetPassword}
                            style={{
                                backgroundColor: "#CC9A48",
                                color: "white",
                                padding: "10px 20px",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                width: "100%",
                                fontWeight: "bold",
                            }}
                        >
                            Reset Password
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ForgetPassword;
