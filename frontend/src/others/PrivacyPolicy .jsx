import React from "react";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  return (
    <div
      style={{
        backgroundColor: "#FFF9F5",
        minHeight: "100vh",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "30px",
          backgroundColor: "#FFFFFF",
          borderRadius: "12px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Header */}
        <h1
          style={{
            textAlign: "center",
            fontSize: "32px",
            fontWeight: "bold",
            color: "#13361C",
          }}
        >
          Privacy & Policy
        </h1>
        <p
          style={{
            textAlign: "center",
            fontSize: "16px",
            color: "#777",
            marginBottom: "20px",
          }}
        >
          Last Updated: January 2024
        </p>

        {/* Sections */}
        <div style={{ lineHeight: "1.8", fontSize: "16px", color: "#555" }}>
          {/* Data Collection Section */}
          <h2
            style={{ fontSize: "22px", fontWeight: "bold", color: "#13361C" }}
          >
            1. Information We Collect
          </h2>
          <p>
            We collect personal information that you provide when booking a
            room, creating an account, or contacting customer support. This may
            include your name, email, phone number, payment details, and booking
            history.
          </p>

          {/* Usage of Information */}
          <h2
            style={{
              fontSize: "22px",
              fontWeight: "bold",
              color: "#13361C",
              marginTop: "20px",
            }}
          >
            2. How We Use Your Information
          </h2>
          <ul style={{ paddingLeft: "20px" }}>
            <li>To process and confirm hotel bookings</li>
            <li>To send notifications regarding bookings and updates</li>
            <li>To improve our services and enhance user experience</li>
            <li>For security, fraud prevention, and legal compliance</li>
          </ul>

          {/* Data Protection */}
          <h2
            style={{
              fontSize: "22px",
              fontWeight: "bold",
              color: "#13361C",
              marginTop: "20px",
            }}
          >
            3. How We Protect Your Information
          </h2>
          <p>
            We implement strong security measures to protect your data from
            unauthorized access, alteration, or disclosure. Our system uses
            encryption, firewalls, and secure servers to ensure data privacy.
          </p>

          {/* Sharing Policy */}
          <h2
            style={{
              fontSize: "22px",
              fontWeight: "bold",
              color: "#13361C",
              marginTop: "20px",
            }}
          >
            4. Sharing Your Information
          </h2>
          <p>
            We do not sell or rent your personal data. However, we may share it
            with trusted third-party service providers (such as payment gateways
            and hotel partners) to complete transactions and enhance our
            services.
          </p>

          {/* Cookies & Tracking */}
          <h2
            style={{
              fontSize: "22px",
              fontWeight: "bold",
              color: "#13361C",
              marginTop: "20px",
            }}
          >
            5. Cookies & Tracking Technologies
          </h2>
          <p>
            Our website uses cookies to enhance your browsing experience. You
            can manage cookie preferences in your browser settings.
          </p>

          {/* User Rights */}
          <h2
            style={{
              fontSize: "22px",
              fontWeight: "bold",
              color: "#13361C",
              marginTop: "20px",
            }}
          >
            6. Your Rights & Choices
          </h2>
          <p>
            You have the right to access, update, or delete your personal data.
            If you have any concerns regarding your privacy, please contact our
            support team.
          </p>

          {/* Contact Info */}
          <h2
            style={{
              fontSize: "22px",
              fontWeight: "bold",
              color: "#13361C",
              marginTop: "20px",
            }}
          >
            7. Contact Us
          </h2>
          <p>
            If you have any questions regarding this Privacy Policy, you can
            reach us at:
            <strong> support@StayEase.com</strong>
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
