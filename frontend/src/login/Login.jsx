import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer";
import ForgetPassword from "../Forgetpassword/ForgetPassword";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validate = () => {
    let isValid = true;

    if (email.trim() === "" || !email.includes("@")) {
      setEmailError("Email is required and must be valid");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (password.trim() === "") {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const data = { email, password };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        data
      );
      if (response.status === 200) {
        // Toast message for successful login
        toast.success("Logged in successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Store data in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "userData",
          JSON.stringify(response.data.userData)
        );

        // Redirect to the appropriate page based on user role
        setTimeout(() => {
          if (response.data.userData.isAdmin) {
            // Redirect to admin home page if user is admin
            window.location.href = "/rooms";
          } else {
            // Redirect to the home page for normal users
            window.location.href = "/";
          }
        }, 1500);
      }
    } catch (error) {
      // Toast message for invalid login credentials
      toast.error(
        error.response?.data?.message || "Invalid email or password!",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    }
  };

  const [showOverlay, setShowOverlay] = useState(false);

  const handleOverlayClose = () => {
    setShowOverlay(false);
  };

  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "88vh",
            backgroundColor: "#FFFFFFFF",
            padding: "5% 0", // Reduce top and bottom margins
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
            {/* Left Image Section */}
            <div
              style={{
                flex: "1",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px", // Add padding
              }}
            >
              <img
                src="/assets/images/image1.avif"
                alt="Login"
                style={{
                  width: "100%",
                  height: "500",
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
                  alt="StayEase Logo"
                  style={{ width: "100px", marginRight: "10px" }}
                />

                <h1
                  style={{
                    fontSize: "40px",
                    fontWeight: "bold",
                    fontFamily: "Roberto slab",
                    color: "#CC9A48",
                  }}
                >
                  StayEase
                </h1>
              </div>
              <p style={{ marginTop: "10px", fontSize: "18px" }}>
                Nice to see you again!
              </p>

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "20px" }}>
                  <label
                    htmlFor="email"
                    style={{
                      display: "block",
                      marginBottom: "5px",
                      color: "#FFFFFFFF",
                    }}
                  >
                    Login
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email or username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                  />
                  {emailError && (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {emailError}
                    </p>
                  )}
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label
                    htmlFor="password"
                    style={{
                      display: "block",
                      marginBottom: "5px",
                      color: "#FFFFFFFF",
                    }}
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                  />
                  {passwordError && (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {passwordError}
                    </p>
                  )}
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                      type="checkbox"
                      id="remember"
                      style={{ marginRight: "5px" }}
                    />
                    <label
                      htmlFor="remember"
                      style={{ fontSize: "14px", color: "#FFFFFFFF" }}
                    >
                      Remember me
                    </label>
                  </div>
                  <a
                    // href="/forgetpassword"
                    onClick={() => setShowOverlay(true)}
                    style={{
                      fontSize: "14px",
                      color: "#CC9A48",
                      textDecoration: "none",
                    }}
                  >
                    Forgot password?
                  </a>
                  {showOverlay && (
                    <ForgetPassword onClose={handleOverlayClose} />
                  )}
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
                  Login
                </button>
              </form>

              <p style={{ marginTop: "20px", fontSize: "14px" }}>
                Don't have an account?{" "}
                <a
                  href="/register"
                  style={{
                    color: "#CC9A48",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Login;
