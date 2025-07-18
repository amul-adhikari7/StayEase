import React from "react";
import Footer from "../components/Footer";

const Aboutus = () => {
  // const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <div
        style={{
          backgroundImage: "url('/assets/images/about_bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#000000FF",
          textAlign: "center",
          padding: "80px 20px",
        }}
      >
        <h1 style={{ fontSize: "42px", fontWeight: "bold" }}>About StayEase</h1>
        <p style={{ fontSize: "18px", maxWidth: "600px", margin: "10px auto" }}>
          StayEase is your go-to platform for booking the perfect hotel rooms
          with a blend of luxury and comfort. Discover unparalleled experiences
          tailored to your needs with just a few clicks. Our curated collection
          ensures you find the perfect stay for every occasion. Whether you’re
          planning a family vacation, a romantic getaway, or a business trip, we
          have you covered. Book your next stay with StayEase and experience the
          best of hospitality.
        </p>
      </div>

      {/* Company Mission & Vision */}
      {/* Company Mission & Vision Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "40px",
          padding: "60px 20px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Mission Container */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#FFF9F5",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "#13361C",
              textAlign: "center",
            }}
          >
            Our Mission
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "#777",
              lineHeight: "1.6",
              textAlign: "center",
            }}
          >
            At StayEase, our mission is to redefine the way travelers find and
            experience luxury stays. We aim to provide a seamless, personalized
            booking experience that connects travelers with the finest hotels
            worldwide.
          </p>
        </div>

        {/* Vision Container */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#FFF2E5",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "#13361C",
              textAlign: "center",
            }}
          >
            Our Vision
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "#777",
              lineHeight: "1.6",
              textAlign: "center",
            }}
          >
            Our vision is to be the most trusted and user-friendly platform for
            luxury hotel bookings. We aspire to make high-end travel accessible,
            ensuring every traveler experiences top-notch hospitality
            effortlessly.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div
        style={{
          backgroundColor: "#13361C",
          padding: "60px 20px",
          textAlign: "center",
        }}
      >
        <h2
          style={{ fontSize: "32px", fontWeight: "bold", color: "#FFFFFFFF" }}
        >
          Why Choose StayEase?
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: "30px",
          }}
        >
          <div
            style={{
              width: "300px",
              padding: "20px",
              textAlign: "center",
              color: "#FFFFFFFF",
            }}
          >
            <img
              src="/assets/icons/hotel.png"
              alt="Luxury Hotels"
              style={{ width: "80px" }}
            />
            <h4 style={{ fontWeight: "bold", marginTop: "10px" }}>
              Handpicked Luxury Hotels
            </h4>
            <p style={{ color: "#777" }}>
              We offer the finest selection of premium hotels worldwide.
            </p>
          </div>
          <div
            style={{
              width: "300px",
              padding: "20px",
              textAlign: "center",
              color: "#FFFFFFFF",
            }}
          >
            <img
              src="/assets/icons/discount.png"
              alt="Best Deals"
              style={{ width: "80px" }}
            />
            <h4 style={{ fontWeight: "bold", marginTop: "10px" }}>
              Best Price <br /> Guarantee
            </h4>
            <p style={{ color: "#777" }}>
              Enjoy exclusive deals and unbeatable prices.
            </p>
          </div>
          <div
            style={{
              width: "300px",
              padding: "20px",
              textAlign: "center",
              color: "#FFFFFFFF",
            }}
          >
            <img
              src="/assets/icons/customer-service.png"
              alt="Customer Support"
              style={{ width: "80px" }}
            />
            <h4 style={{ fontWeight: "bold", marginTop: "10px" }}>
              24/7 Customer Support
            </h4>
            <p style={{ color: "#777" }}>
              We’re here to assist you anytime, anywhere.
            </p>
          </div>
        </div>
      </div>

      {/* Meet Our Team (Optional) */}
      <div
        style={{
          backgroundColor: "#FFF9F5",
          padding: "60px 20px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "32px", fontWeight: "bold", color: "#13361C" }}>
          Meet Our Team
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: "30px",
          }}
        >
          <div style={{ width: "250px", padding: "20px", textAlign: "center" }}>
            <img
              src="/assets/icons/user-avatar.png"
              alt="John Smith"
              style={{ width: "100px", borderRadius: "50%" }}
            />
            <h4 style={{ fontWeight: "bold", marginTop: "10px" }}>
              Rijan Maharjan
            </h4>
            <p style={{ color: "#777" }}>CEO & Founder</p>
          </div>
          <div style={{ width: "250px", padding: "20px", textAlign: "center" }}>
            <img
              src="/assets/icons/user-avatar.png"
              alt="Emily Davis"
              style={{ width: "100px", borderRadius: "50%" }}
            />
            <h4 style={{ fontWeight: "bold", marginTop: "10px" }}>
              Amul Adhikari
            </h4>
            <p style={{ color: "#777" }}>Chief Marketing Officer</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Aboutus;
