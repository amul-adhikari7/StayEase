import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div id="footer" className="w-100" style={{ backgroundColor: "#13361C" }}>
        <div className="container text-light pb-0">
          <div className="upper-footer row">
            <div className="need-help col-12 col-md-8 col-lg-4 mb-4">
              {" "}
              {/* Reduced margin-bottom */}
              <div className="help-box p-3">
                {" "}
                {/* Reduced padding */}
                <h5>Need Help?</h5>
                <div
                  className="underline"
                  style={{
                    height: "2px",
                    width: "30px",
                    backgroundColor: "#D29062",
                  }}
                ></div>
                <div className="details mt-4 d-flex align-items-center gap-4">
                  {" "}
                  {/* Reduced margin-top */}
                  <div className="text m-0 p-0">
                    <p className="text-light">Got Questions? Call us 24/7!</p>
                    <span className=" fw-bold" style={{ color: "#D29062" }}>
                      Call Us:{" "}
                    </span>
                    <span className="fw-bold "> (+977) 9860708090</span>
                  </div>
                </div>
              </div>
              <div className="contact-info mt-4">
                {" "}
                {/* Reduced margin-top */}
                <h5>Contact Info</h5>
                <div
                  className="underline"
                  style={{
                    height: "2px",
                    width: "30px",
                    backgroundColor: "#D29062",
                  }}
                ></div>
                <p className="mt-3 text-light">Email: stayease@gmail.com</p>{" "}
                {/* Reduced margin-top */}
                <p className="text-light">Location: Kathmandu, Nepal</p>
              </div>
              <div className="social-links d-flex gap-3">
                <a
                  href={"/"}
                  target="_blank"
                  className="link-box d-flex justify-content-center align-items-center p-1 rounded text-light"
                  style={{ width: "30px" }}
                >
                  <FaFacebook size={20} />
                </a>
                <a
                  href={"/"}
                  target="_blank"
                  className="link-box d-flex justify-content-center align-items-center p-1 rounded text-light"
                  style={{ width: "30px" }}
                >
                  <FaInstagram size={20} />
                </a>
                <a
                  href={"/"}
                  target="_blank"
                  className="link-box d-flex justify-content-center align-items-center p-1 rounded text-light"
                  style={{ width: "30px" }}
                >
                  <FaTwitter size={20} />
                </a>
              </div>
            </div>
            <div className="company-info col-12 col-md-6 col-lg-2">
              <div className="p-3">
                {" "}
                {/* Reduced padding */}
                <h5>Company</h5>
                <div
                  className="underline"
                  style={{
                    height: "2px",
                    width: "30px",
                    backgroundColor: "#D29062",
                  }}
                ></div>
                <ul
                  className="mt-4 d-flex flex-column gap-4 ps-0"
                  style={{ listStyle: "none" }}
                >
                  <li>
                    <a
                      className="text-light"
                      style={{ textDecoration: "none" }}
                    >
                      Careers
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-light"
                      style={{ textDecoration: "none" }}
                    >
                      Terms Of Use
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-light"
                      style={{ textDecoration: "none" }}
                    >
                      Privacy Statement
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-light"
                      style={{ textDecoration: "none" }}
                    >
                      Feedbacks
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="support-info col-12 col-md-6 col-lg-2">
              <div className="p-3">
                {" "}
                {/* Reduced padding */}
                <h5>Support</h5>
                <div
                  className="underline"
                  style={{
                    height: "2px",
                    width: "30px",
                    backgroundColor: "#D29062",
                  }}
                ></div>
                <ul
                  className="mt-4 d-flex flex-column gap-4 ps-0"
                  style={{ listStyle: "none" }}
                >
                  <li>
                    <a
                      className="text-light"
                      style={{ textDecoration: "none" }}
                    >
                      Account
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-light"
                      style={{ textDecoration: "none" }}
                    >
                      Legal
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-light"
                      style={{ textDecoration: "none" }}
                    >
                      Affiliate Program
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-light"
                      style={{ textDecoration: "none" }}
                    >
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="subscription-info col-12 col-md-8 col-lg-4">
              <div className="p-3">
                {" "}
                {/* Reduced padding */}
                <h5>About Us</h5>
                <div
                  className="underline"
                  style={{
                    height: "2px",
                    width: "30px",
                    backgroundColor: "#D29062",
                  }}
                ></div>
                <p className="text-white">
                  StayEase is a hotel reservation application
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-100">
          <div className="copyright-info text-light container d-flex flex-column gap-4 align-items-center flex-lg-row justify-content-between pt-0 w-100 text-center">
            <span className="text-center text-light w-100">
              {new Date().toISOString().split("-")[0]} StayEase &copy; All
              rights reserved.
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
