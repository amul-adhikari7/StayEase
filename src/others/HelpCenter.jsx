import React, { useState } from "react";
import Footer from "../components/Footer";

const HelpCenter = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [showSupportPopup, setShowSupportPopup] = useState(false);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I book a room?",
      answer:
        "To book a room, simply enter your check-in and check-out dates, select the number of guests, and choose your preferred room. Complete the booking process by making a payment.",
    },
    {
      question: "Can I cancel my booking?",
      answer:
        "Yes, you can cancel your booking before the check-in date. However, cancellation policies vary depending on the hotel. Please check the terms before booking.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept major payment methods including credit/debit cards, e-wallets like Khalti, Esewa, and cash payments upon arrival.",
    },
    {
      question: "How can I modify my booking?",
      answer:
        "If you need to modify your booking, please visit your ‘My Bookings’ section or contact customer support for assistance.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Yes, we prioritize user data security by using encryption, firewalls, and strict access controls to protect your personal information.",
    },
  ];

  return (
    <>
      <div>
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
            {/* Help Center Header */}
            <h1
              style={{
                textAlign: "center",
                fontSize: "32px",
                fontWeight: "bold",
                color: "#13361C",
              }}
            >
              Help Center
            </h1>
            <p
              style={{
                textAlign: "center",
                fontSize: "16px",
                color: "#777",
                marginBottom: "20px",
              }}
            >
              Need assistance? Find answers to commonly asked questions below.
            </p>

            {/* FAQ Section */}
            <div style={{ lineHeight: "1.8", fontSize: "16px", color: "#555" }}>
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#13361C",
                  marginBottom: "15px",
                }}
              >
                Frequently Asked Questions
              </h2>

              {/* FAQ List */}
              <div>
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    style={{
                      marginBottom: "15px",
                      padding: "15px",
                      borderRadius: "8px",
                      backgroundColor:
                        openFAQ === index ? "#FFF2E5" : "#F9F9F9",
                      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                      cursor: "pointer",
                      transition: "0.3s",
                    }}
                    onClick={() => toggleFAQ(index)}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h3
                        style={{
                          margin: "0",
                          fontSize: "18px",
                          color: "#13361C",
                        }}
                      >
                        {faq.question}
                      </h3>
                      <span
                        style={{
                          fontSize: "20px",
                          fontWeight: "bold",
                          color: "#CC9A48",
                        }}
                      >
                        {openFAQ === index ? "−" : "+"}
                      </span>
                    </div>
                    {openFAQ === index && (
                      <p
                        style={{
                          marginTop: "10px",
                          fontSize: "16px",
                          color: "#555",
                        }}
                      >
                        {faq.answer}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Support Section */}
            <div
              style={{
                marginTop: "30px",
                padding: "20px",
                backgroundColor: "#FFF2E5",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <h2
                style={{
                  fontSize: "22px",
                  fontWeight: "bold",
                  color: "#13361C",
                }}
              >
                Still Need Help?
              </h2>
              <p style={{ fontSize: "16px", color: "#555" }}>
                If you have additional questions, feel free to contact our
                support team.
              </p>
              <button
                onClick={() => setShowSupportPopup(true)}
                style={{
                  display: "inline-block",
                  padding: "10px 20px",
                  backgroundColor: "#CC9A48",
                  color: "#FFFFFF",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "bold",
                  fontSize: "16px",
                  marginTop: "10px",
                  cursor: "pointer",
                }}
              >
                Contact Support
              </button>
            </div>
          </div>

          {/* Contact Support Popup Overlay */}
          {showSupportPopup && (
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
                  width: "350px",
                  textAlign: "center",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h2
                  style={{
                    marginBottom: "10px",
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#13361C",
                  }}
                >
                  Contact Support
                </h2>
                <p style={{ fontSize: "16px", color: "#555" }}>
                  📞 Phone: <strong>+977 9812345678</strong>
                </p>
                <p style={{ fontSize: "16px", color: "#555" }}>
                  ✉️ Email: <strong>support@StayEase.com</strong>
                </p>
                <button
                  onClick={() => setShowSupportPopup(false)}
                  style={{
                    marginTop: "15px",
                    padding: "10px 20px",
                    backgroundColor: "#CC9A48",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default HelpCenter;
