import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/Footer";

const AdminRoomTable = () => {
    const [rooms, setRooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/room/get_all_rooms");
                setRooms(response.data.data); // Assuming rooms are returned in the "data" field
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to fetch rooms.");
            }
        };
        fetchRooms();
    }, []);

    const handleDelete = async (roomId) => {
        if (!window.confirm("Are you sure you want to delete this room?")) {
            return;
        }

        try {
            await axios.delete(`http://localhost:5000/api/room/delete_room/${roomId}`);
            setRooms(rooms.filter((room) => room._id !== roomId));
            toast.success("Room deleted successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete room.");
        }
    };

    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const styles = {
        container: {
            display: "flex",
            minHeight: "100vh",
        },
        sidebar: {
            width: "250px",
            backgroundColor: "#13361C",
            color: "#FFFFFF",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        sidebarLink: {
            textDecoration: "none",
            color: "#FFFFFF",
            margin: "10px 0",
            padding: "10px 20px",
            borderRadius: "5px",
            textAlign: "center",
            width: "100%",
            backgroundColor: "#CC9A48",
            fontWeight: "bold",
            cursor: "pointer",
        },
        sidebarLinkActive: {
            backgroundColor: "#FFFFFF",
            color: "#13361C",
        },
        content: {
            flex: 1,
            padding: "20px",
        },
        tableContainer: {
            marginTop: "20px",
            overflowX: "auto",
        },
        table: {
            width: "100%",
            borderCollapse: "collapse",
        },
        thTd: {
            border: "1px solid #ddd",
            padding: "12px",
            textAlign: "center",
            verticalAlign: "middle",
            fontSize: "14px",
        },
        th: {
            backgroundColor: "#F7F7F7",
            fontWeight: "bold",
            color: "#333",
        },
        thumbnail: {
            width: "80px",
            height: "80px",
            objectFit: "cover",
            borderRadius: "8px",
        },
        button: {
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: "bold",
            cursor: "pointer",
            margin: "0 5px",
        },
        deleteButton: {
            backgroundColor: "#f44336",
        },
        pagination: {
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
        },
        pageItem: {
            padding: "8px 12px",
            margin: "0 5px",
            cursor: "pointer",
            borderRadius: "4px",
            border: "1px solid #ddd",
            backgroundColor: "#f9f9f9",
            color: "#333",
        },
        activePageItem: {
            backgroundColor: "#007bff",
            color: "#fff",
        },
    };

    return (<> <div>
        <div style={styles.container}>
            {/* Sidebar */}
            <div style={styles.sidebar}>
                <h2>Admin Dashboard</h2>
                <div
                    style={{
                        width: "100%",
                        textAlign: "center",
                        borderBottom: "1px solid #FFFFFF",
                        marginBottom: "20px",
                        paddingBottom: "10px",
                    }}
                />
                <Link
                    to="/hotel"
                    style={styles.sidebarLink}
                    onClick={() => navigate("/admin/add-room")}
                >
                    Add Room
                </Link>
                <Link
                    to="/admin/bookings"
                    style={styles.sidebarLink}
                    onClick={() => navigate("/admin/view-bookings")}
                >
                    View Bookings
                </Link>
                <Link
                    to="/admin/rooms"
                    style={{ ...styles.sidebarLink, ...styles.sidebarLinkActive }}
                >
                    Manage Rooms
                </Link>
            </div>

            {/* Content */}
            <div style={styles.content}>
                <h1>Manage Rooms</h1>
                {rooms.length === 0 ? (
                    <p>No rooms available at the moment.</p>
                ) : (
                    <>
                        <div style={styles.tableContainer}>
                            <table style={styles.table}>
                                <thead>
                                    <tr>
                                        <th style={styles.th}>#</th>
                                        <th style={styles.th}>Image</th>
                                        <th style={styles.th}>Room Name</th>
                                        <th style={styles.th}>Hotel Name</th>
                                        <th style={styles.th}>Location</th>
                                        <th style={styles.th}>Price</th>
                                        <th style={styles.th}>Beds</th>
                                        <th style={styles.th}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentRooms.map((room, index) => (
                                        <tr key={room._id}>
                                            <td style={styles.thTd}>{indexOfFirstRoom + index + 1}</td>
                                            <td style={styles.thTd}>
                                                <img
                                                    src={`http://localhost:5000/rooms/${room.image}`}
                                                    alt={room.image}
                                                    style={styles.thumbnail}
                                                />
                                            </td>
                                            <td style={styles.thTd}>{room.roomName}</td>
                                            <td style={styles.thTd}>{room.hotelName}</td>
                                            <td style={styles.thTd}>{room.location}</td>
                                            <td style={styles.thTd}>${room.price}</td>
                                            <td style={styles.thTd}>{room.noOfBeds}</td>
                                            <td style={styles.thTd}>
                                                <Link
                                                    to={`/room/update-delete/${room._id}`}
                                                    style={styles.button}
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(room._id)}
                                                    style={{ ...styles.button, ...styles.deleteButton }}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div style={styles.pagination}>
                            {Array.from({ length: Math.ceil(rooms.length / roomsPerPage) }, (_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => paginate(i + 1)}
                                    style={{
                                        ...styles.pageItem,
                                        ...(currentPage === i + 1 ? styles.activePageItem : {}),
                                    }}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    </div>
        <Footer />

    </>
    );
};

export default AdminRoomTable;
