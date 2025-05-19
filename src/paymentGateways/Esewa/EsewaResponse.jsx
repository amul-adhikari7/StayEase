import axios from "axios";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { decodeDataFromBase64 } from "./esewaCrypto";

const style = {
  width: "48px",
  height: "48px",
  border: "5px solid #13361c",
  borderBottomColor: "transparent",
  borderRadius: "50%",
  display: "inline-block",
  boxSizing: "border-box",
  animation: "rotation 1s linear infinite",
};
const EsewaResponse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const data = searchParams.get("data");
  const decodedData = decodeDataFromBase64(data);

  const roomId = localStorage.getItem("roomid");
  const duration = localStorage.getItem("duration");
  const guests = localStorage.getItem("guests");
  const checkInDate = localStorage.getItem("checkInDate");
  console.log(decodedData);
  const token = localStorage.getItem("token");
  const refOnce = useRef(false);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      const bookingData = {
        roomId: roomId,
        checkInDate,
        duration,
        guests,
        paymentType: "Esewa",
      };

      if (refOnce.current === true) {
        const response = await axios.post(
          "http://localhost:5000/api/booking/create",
          bookingData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 201) {
          toast.success("Room booked successfully!");
          navigate("/bookings");
        }
      }
    };

    if (roomId && duration && guests && checkInDate && token) {
      if (!refOnce.current) {
        refOnce.current = true;
        fetchRoomDetails();
      }
    }
  }, [roomId, duration, guests, checkInDate, token]);

  return (
    <div
      style={{
        width: "100vw",
        paddingTop: "100px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <span style={style}></span>
    </div>
  );
};
export default EsewaResponse;
