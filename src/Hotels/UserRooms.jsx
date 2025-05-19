import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import RoomCard from "../components/RoomCard";

const RoomPage = () => {
    const [rooms, setRooms] = useState([]);

    // Fetch rooms from backend
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/room/get_all_rooms"
                );
                setRooms(response.data.data); // Assuming backend returns a "data" array
            } catch (error) {
                console.error("Error fetching rooms:", error);
            }
        };

        fetchRooms();
    }, []);

    return (
        <>
            {/* Page Description */}
            <div
                style={{
                    marginTop: "20px",
                    marginBottom: "1px",
                    paddingLeft: "20px",
                }}
            >
                <p
                    style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "#13361C",
                    }}
                >
                    Hotel Rooms Available
                </p>
            </div>

            {/* Third Section (Hotel Booking) */}
            <div
                className="section-three"
                style={{
                    marginBottom: "40px",
                    padding: "0 20px",
                }}
            >
                <div
                    className="hotel-rooms"
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "20px",
                        justifyContent: "center",
                        padding: "0 10px",
                    }}
                >
                    {/* Map over rooms and render RoomCard components */}
                    {rooms.length > 0 ? (
                        rooms.map((room) => (
                            <RoomCard key={room._id} room={room} />
                        ))
                    ) : (
                        <p style={{ fontSize: "16px", color: "#555" }}>
                            No rooms available at the moment.
                        </p>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
};

export default RoomPage;
