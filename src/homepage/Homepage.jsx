import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import RoomCard from "../components/RoomCard";
import { searchRoomsByNameApi } from "../apis/api";

const Homepage = () => {
  const [adults, setAdults] = useState(1);
  // const [children, setChildren] = useState(0);

  const [formData, setFormData] = useState({
    checkin: "",
    checkout: "",
    duration: 1,
  });
  const today = new Date().toISOString().split("T")[0];

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const incrementAdults = () => setAdults(adults + 1);
  const decrementAdults = () => setAdults(adults > 1 ? adults - 1 : 1);

  // const incrementChildren = () => setChildren(children + 1);
  // const decrementChildren = () => setChildren(children > 0 ? children - 1 : 0);

  const [rooms, setRooms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("none");
  const [filterBeds, setFilterBeds] = useState("all");

  const fetchRooms = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/room/get_all_rooms"
      );
      setRooms(response.data.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const handleSort = (order) => {
    setSortOrder(order);
    const sortedRooms = [...rooms].sort((a, b) => {
      if (order === "low-to-high") {
        return a.price - b.price;
      } else if (order === "high-to-low") {
        return b.price - a.price;
      }
      return 0;
    });
    setRooms(sortedRooms);
  };

  const handleFilterByBeds = (beds) => {
    setFilterBeds(beds);
    if (beds === "all") {
      // Fetch all rooms again if no filter is applied
      fetchRooms();
    } else {
      const filteredRooms = rooms.filter(
        (room) => room.noOfBeds === parseInt(beds)
      );
      setRooms(filteredRooms);
    }
  };

  const handleSearchByName = async () => {
    try {
      const response = await searchRoomsByNameApi(searchQuery);
      setRooms(response.data.data);
    } catch (error) {
      console.error("Error searching rooms by name:", error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newFormData = { ...formData, [name]: value };

    if (name === "checkin" || name === "checkout") {
      const checkinDate = new Date(newFormData.checkin);
      const checkoutDate = new Date(newFormData.checkout);

      if (name === "checkout" && checkoutDate <= checkinDate) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          checkout: "Check-out date must be after check-in date",
        }));
        return;
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          checkout: undefined,
        }));
      }

      if (checkinDate && checkoutDate && checkoutDate > checkinDate) {
        const duration = Math.ceil(
          (checkoutDate - checkinDate) / (1000 * 60 * 60 * 24)
        );
        newFormData.duration = duration;
      }
    }

    setFormData(newFormData);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.checkout) {
      newErrors.checkout = "check-out date is required";
    }
    if (!formData.checkin) {
      newErrors.checkin = "Check-in date is required";
    }
    if (!formData.duration || formData.duration <= 0) {
      newErrors.duration = "Duration must be greater than 0";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      navigate(
        `/room?location=${formData.location}&checkin=${formData.checkin}&duration=${formData.duration}&guests=${adults}`
      );
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 4;

  const handleNextPage = () => {
    if (currentPage < Math.ceil(rooms.length / roomsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <>
      <div
        className="dashboard"
        style={{ backgroundColor: "#FFFFFFFF", minHeight: "100vh" }}
      >
        {/* First Section */}
        <div
          className="section-one"
          style={{
            marginBottom: "40px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            className="container d-flex justify-content-between"
            style={{
              width: "90%",
              gap: "30px",
              padding: "5px",
              backgroundColor: "#FFFFFFFF",
              borderRadius: "10px",
            }}
          >
            {/* Left Container */}
            <div
              className="left-container"
              style={{ width: "60%", textAlign: "left" }}
            >
              <h1
                style={{
                  fontSize: "36px",
                  fontWeight: "bold",
                  color: "#13361C",
                  marginBottom: "10px",
                }}
              >
                The Perfect Combination of <br /> Luxury and Comfort
              </h1>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#555",
                    marginBottom: "0",
                    marginRight: "10px",
                  }}
                >
                  Let’s get acquainted !
                </p>
                <hr style={{ flex: "1", borderTop: "2px solid #CC9A48" }} />
              </div>
              <p
                style={{
                  fontSize: "16px",
                  color: "#777",
                  lineHeight: "1.6",
                  marginBottom: "20px",
                }}
              >
                StayEase is your go-to platform for booking the perfect hotel
                rooms with a blend of luxury and comfort. Discover unparalleled
                experiences tailored to your needs with just a few clicks. Our
                curated collection ensures you find the perfect stay for every
                occasion. Whether you’re planning a family vacation, a romantic
                getaway, or a business trip, we have you covered. Book your next
                stay with StayEase and experience the best of hospitality.
              </p>
              <button
                onClick={() => navigate("/aboutus")}
                style={{
                  backgroundColor: "#CC9A48",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                More →
              </button>
              <h4
                style={{
                  marginTop: "20px",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                Featured Rooms
              </h4>

              {/* Featured Hotels */}
              <div
                className="featured-hotels"
                style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "15px",
                }}
              >
                {rooms.slice(0, 3).map((room, index) => (
                  <div
                    key={index}
                    style={{
                      width: "30%",
                      position: "relative",
                      borderRadius: "8px",
                      overflow: "hidden",
                      cursor: "pointer",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                    onClick={() => navigate(`/room/${room._id}`)} // Navigate to room details
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                      e.currentTarget.style.boxShadow =
                        "0px 6px 12px rgba(0, 0, 0, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow =
                        "0px 4px 6px rgba(0, 0, 0, 0.1)";
                    }}
                  >
                    <img
                      src={`http://localhost:5000/rooms/${room.image}`}
                      alt={room.hotelName}
                      style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />
                    <p
                      style={{
                        position: "absolute",
                        top: "5px",
                        left: "10px",
                        color: "#FFFFFFFF",
                        fontSize: "14px",
                        fontWeight: "bold",
                        backgroundColor: "#13361C",
                      }}
                    >
                      {room.location}
                    </p>
                    <p
                      style={{
                        position: "absolute",
                        bottom: "1px",
                        left: "13px",
                        color: "#FFFFFFFF",
                        fontSize: "16px",
                        fontWeight: "bold",
                        backgroundColor: "#13361C",
                      }}
                    >
                      {room.hotelName}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Container */}
            <div
              className="right-container"
              style={{
                width: "35%",
                textAlign: "center",
                backgroundColor: "#13361C",
                color: "#FFFFFFFF",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#FFFFFFFF",
                  marginBottom: "15px",
                }}
              >
                Find Hotel
              </h3>
              <form>
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label
                    htmlFor="checkin"
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "#FFFFFFFF",

                      marginBottom: "5px",
                      display: "block",
                    }}
                  >
                    Check-in
                  </label>
                  <input
                    type="date"
                    id="checkin"
                    name="checkin"
                    value={formData.checkin}
                    min={today}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                  />
                  {errors.checkin && (
                    <span style={{ color: "red", fontSize: "10px" }}>
                      {errors.checkin}
                    </span>
                  )}
                </div>

                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label
                    htmlFor="checkout"
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      marginBottom: "5px",
                      color: "#FFFFFFFF",
                      display: "block",
                    }}
                  >
                    Check-out
                  </label>
                  <input
                    type="date"
                    id="checkout"
                    name="checkout"
                    value={formData.checkout}
                    onChange={handleChange}
                    min={today}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                  />
                  {errors.checkout && (
                    <span style={{ color: "red", fontSize: "10px" }}>
                      {errors.checkout}
                    </span>
                  )}
                </div>

                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label
                    htmlFor="duration"
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      marginBottom: "5px",
                      color: "#FFFFFFFF",
                      display: "block",
                    }}
                  >
                    Duration
                  </label>
                  <input
                    type="number"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="Number of days"
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                    disabled
                  />
                </div>

                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label
                    htmlFor="checkout"
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      marginBottom: "5px",
                      color: "#FFFFFFFF",
                      display: "block",
                    }}
                  >
                    Guests
                  </label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <button
                      type="button"
                      onClick={decrementAdults}
                      disabled={adults <= 0}
                    >
                      -
                    </button>
                    <span>Adults: {adults}</span>
                    <button type="button" onClick={incrementAdults}>
                      +
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  onClick={handleSearch}
                  style={{
                    backgroundColor: "#CC9A48",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Search Hotels
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Second Section (About Us) */}
        <div
          className="section-two mt-5 text-center"
          style={{
            marginBottom: "15px",
            backgroundColor: "#13361C",
            padding: "40px 20px",
          }}
        >
          <h1 style={{ color: "white", marginBottom: "20px" }}>
            OUR APPROACH TO BOOKING HOTELS
          </h1>
          <p
            style={{
              maxWidth: "700px",
              margin: "0 auto",
              fontSize: "16px",
              color: "#ffffff",
              lineHeight: "1.6",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <div
            className="photo-gallery"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
              marginTop: "30px",
            }}
          >
            <div style={{ overflow: "hidden", borderRadius: "12px" }}>
              <img
                src="/assets/images/image11.jpg"
                alt="Gallery 1"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ overflow: "hidden", borderRadius: "12px" }}>
              <img
                src="/assets/images/image2.jpg"
                alt="Gallery 2"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ overflow: "hidden", borderRadius: "12px" }}>
              <img
                src="/assets/images/image3.jpg"
                alt="Gallery 3"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ overflow: "hidden", borderRadius: "12px" }}>
              <img
                src="/assets/images/image4.jpg"
                alt="Gallery 4"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>

        {/* Third Section (Hotel Booking) */}
        <div
          className="section-three"
          style={{
            marginBottom: "1px",
            textAlign: "center",
            backgroundColor: "#FFFFFFFF",
            padding: "40px 20px",
            borderRadius: "10px",
          }}
        >
          {/* Heading */}
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#13361C",
              marginBottom: "20px",
            }}
          >
            Hotel Rooms Booking
          </h1>

          {/* Search Bar */}
          <div style={{ marginBottom: "20px", textAlign: "center" }}>
            <input
              type="text"
              placeholder="Search by hotel name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: "10px",
                width: "60%",
                borderRadius: "5px",
                border: "1px solid #ccc",
                marginRight: "10px",
              }}
            />
            <button
              onClick={handleSearchByName}
              style={{
                padding: "10px 20px",
                backgroundColor: "#CC9A48",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Search
            </button>
          </div>

          {/* Sort Dropdown */}
          <div style={{ marginBottom: "20px", textAlign: "center" }}>
            <label
              htmlFor="sort"
              style={{ marginRight: "10px", fontWeight: "bold" }}
            >
              Sort by Price:
            </label>
            <select
              id="sort"
              value={sortOrder}
              onChange={(e) => handleSort(e.target.value)}
              style={{
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            >
              <option value="none">None</option>
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>

          {/* Filter by Beds */}
          <div style={{ marginBottom: "20px", textAlign: "center" }}>
            <label
              htmlFor="filterBeds"
              style={{ marginRight: "10px", fontWeight: "bold" }}
            >
              Filter by Beds:
            </label>
            <select
              id="filterBeds"
              value={filterBeds}
              onChange={(e) => handleFilterByBeds(e.target.value)}
              style={{
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            >
              <option value="all">All</option>
              <option value="1">1 Bed</option>
              <option value="2">2 Beds</option>
              <option value="3">3 Beds</option>
              <option value="4">4 Beds</option>
            </select>
          </div>

          {/* Rooms Container */}
          <div
            className="hotel-rooms"
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "15px",
              flexWrap: "wrap",
            }}
          >
            {rooms.length > 0 ? (
              // Display only 4 rooms per row with pagination
              rooms
                .slice(
                  (currentPage - 1) * roomsPerPage,
                  currentPage * roomsPerPage
                )
                .map((room) => (
                  <RoomCard
                    key={room._id}
                    room={room}
                    style={{
                      width: "23%", // Adjust to fit 4 rooms in one row
                      borderRadius: "8px",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                      textAlign: "center",
                    }}
                  />
                ))
            ) : (
              <p
                style={{
                  color: "#777",
                  fontSize: "16px",
                  marginTop: "20px",
                }}
              >
                No rooms available at the moment.
              </p>
            )}
          </div>

          {/* Pagination */}
          <div
            className="pagination"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
              gap: "10px",
            }}
          >
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              style={{
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                backgroundColor: currentPage === 1 ? "#ddd" : "#CC9A48",
                color: "white",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
              }}
            >
              Previous
            </button>
            <span
              style={{
                fontSize: "16px",
                color: "#555",
              }}
            >
              Page {currentPage} of {Math.ceil(rooms.length / roomsPerPage)}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === Math.ceil(rooms.length / roomsPerPage)}
              style={{
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                backgroundColor:
                  currentPage === Math.ceil(rooms.length / roomsPerPage)
                    ? "#ddd"
                    : "#CC9A48",
                color: "white",
                cursor:
                  currentPage === Math.ceil(rooms.length / roomsPerPage)
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              Next
            </button>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Homepage;
