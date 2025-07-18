import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("userData"));
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    // Clear localStorage and sessionStorage completely
    localStorage.clear();
    sessionStorage.clear();

    // Optionally clear cookies (if tokens are stored as cookies)
    document.cookie.split(";").forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
    });

    // Redirect to the login page
    window.location.href = "/login";
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <>
      <div>
        <div
          style={{
            backgroundColor: "#13361C",
            padding: "0px 30px",
            position: "relative",
            zIndex: 1000,
            borderRadius: "12px",
            margin: "10px 30px",
          }}
        >
          <nav
            className="navbar navbar-expand-lg"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Logo and Brand */}
            <Link
              className="navbar-brand d-flex align-items-center"
              to="/"
              style={{ textDecoration: "none" }}
            >
              <img
                src="/assets/icons/luxe.png"
                alt="Logo"
                width="50"
                height="50"
                style={{ borderRadius: "50%" }}
              />
              <span
                style={{
                  color: "#CC9A48",
                  marginLeft: "10px",
                  fontSize: "33px",
                  fontFamily: "roboto slab",
                }}
              >
                StayEase
              </span>
            </Link>

            {/* User Section */}
            <div style={{ display: "flex", alignItems: "center" }}>
              {user ? (
                <>
                  {/* Welcome Name */}
                  <span
                    style={{
                      color: "#FFFFFF",
                      fontSize: "16px",
                      marginRight: "15px",
                      fontFamily: "roboto slab",
                    }}
                  >
                    Welcome, {user.name}
                  </span>

                  {/* User Avatar */}
                  <img
                    src="/assets/icons/user-avatar.png"
                    alt="User Avatar"
                    width="50"
                    height="50"
                    style={{
                      borderRadius: "50%",
                      cursor: "pointer",
                      marginRight: "8px",
                    }}
                    onClick={() => (window.location.href = "/profile")}
                  />

                  {/* Dropdown Button */}
                  <button
                    onClick={toggleDropdown}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#FFFFFF",
                      fontSize: "17px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    ▼
                  </button>

                  {/* Dropdown Menu */}
                  {showDropdown && (
                    <div
                      style={{
                        position: "absolute",
                        top: "80px",
                        background: "#13361C",
                        color: "#FFFFFF",
                        padding: "10px",
                        borderRadius: "15px",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                        textAlign: "center",
                        minWidth: "230px",
                      }}
                    >
                      <div
                        style={{
                          padding: "1px",
                          borderBottom: "3px solid #CC9A48",
                        }}
                      >
                        <strong>{user.name}</strong>
                        <br />
                        <span
                          style={{
                            fontSize: "14px",
                            color: "#CC9A48",
                            fontFamily: "roboto slab",
                          }}
                        >
                          {user.email}
                        </span>
                      </div>
                      <Link
                        to="/bookings"
                        style={{
                          display: "block",
                          padding: "5px",
                          textDecoration: "none",
                          fontFamily: "roboto slab",
                          color: "#FFFFFF",
                        }}
                      >
                        My Bookings
                      </Link>
                      <Link
                        to="/aboutus"
                        style={{
                          display: "block",
                          padding: "5px",
                          textDecoration: "none",
                          color: "#FFFFFF",
                        }}
                      >
                        About Us
                      </Link>
                      <Link
                        to="/help"
                        style={{
                          display: "block",
                          padding: "5px",
                          textDecoration: "none",
                          color: "#FFFFFF",
                        }}
                      >
                        Help Center
                      </Link>
                      <Link
                        to="/privacypolicy"
                        style={{
                          display: "block",
                          padding: "5px",
                          textDecoration: "none",
                          color: "#FFFFFF",
                        }}
                      >
                        Privacy Policy
                      </Link>
                      <hr
                        style={{
                          background: "#CC9A48",
                          height: "1px",
                          border: "none",
                          margin: "10px 0",
                        }}
                      />
                      <button
                        onClick={() => setShowLogoutModal(true)}
                        style={{
                          display: "block",
                          padding: "10px",
                          width: "100%",
                          background: "none",
                          border: "none",
                          color: "red",
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                      >
                        Log Out
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to="/login"
                  style={{
                    backgroundColor: "#CC9A48",
                    color: "#FFFFFF",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    textDecoration: "none",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Login
                </Link>
              )}
            </div>
          </nav>

          {/* Logout Confirmation Modal */}
          {showLogoutModal && (
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
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "10px",
                  width: "400px",
                  textAlign: "center",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                <h2 style={{ margin: "0 0 10px", fontSize: "24px" }}>
                  Log Out
                </h2>
                <hr />
                <p style={{ fontSize: "16px", margin: "10px 0 20px" }}>
                  Are you sure you want to log out? <br />
                  You'll need to log in again to access your account.
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    gap: "20px",
                  }}
                >
                  <button
                    onClick={handleLogout}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Log Out
                  </button>
                  <button
                    onClick={() => setShowLogoutModal(false)}
                    style={{
                      backgroundColor: "green",
                      color: "white",
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
        </div>
      </div>
    </>
  );
};

export default Navbar;
