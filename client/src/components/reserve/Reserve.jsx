import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faBed,
  faUsers,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [success, setSuccess] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  const { data, loading } = useFetch(`/hotels/room/${hotelId}`);
  const { dates } = useContext(SearchContext);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    const dateList = [];

    while (date <= end) {
      dateList.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dateList;
  };

  const currentDates =
    dates && dates[0]
      ? dates[0]
      : { startDate: new Date(), endDate: new Date() };

  const alldates = getDatesInRange(
    currentDates.startDate,
    currentDates.endDate
  );

  const isAvailable = (roomNumber) => {
    if (!roomNumber.unavailableDates) return true;
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    if (selectedRooms.length === 0) {
      alert("Please select at least one room number to reserve.");
      return;
    }

    setBookingLoading(true);
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          return axios.put(`/rooms/availability/${roomId}`, {
            dates: alldates,
          });
        })
      );
      setSuccess(true);
      setTimeout(() => {
        setOpen(false);
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error(err);
      alert("Reservation failed. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="reserveModal">
      <div className="rOverlay" onClick={() => setOpen(false)}></div>
      <div className="rContainer">
        <button className="rCloseBtn" onClick={() => setOpen(false)}>
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <div className="rHeader">
          <span className="rBadge">SELECT SUITES</span>
          <h2 className="rTitle">Choose Your Sanctuary Suites</h2>
          <p className="rSub">
            Select your preferred suite numbers from the available options below.
          </p>
        </div>

        {success ? (
          <div className="rSuccessBox">
            <FontAwesomeIcon icon={faCheckCircle} className="rSuccessIcon" />
            <h3>Reservation Confirmed!</h3>
            <p>Your suite has been secured. Redirecting to home page...</p>
          </div>
        ) : (
          <>
            <div className="rRoomsList">
              {loading ? (
                <div className="rLoading">Loading available suites...</div>
              ) : data && data.length > 0 ? (
                data.map((item) => (
                  <div className="rItem" key={item._id}>
                    <div className="rItemInfo">
                      <div className="rItemHeader">
                        <FontAwesomeIcon icon={faBed} className="rBedIcon" />
                        <h4 className="rRoomTitle">{item.title}</h4>
                      </div>
                      <p className="rDesc">{item.desc}</p>
                      <div className="rMetaRow">
                        <div className="rMax">
                          <FontAwesomeIcon icon={faUsers} />
                          <span>Max guests: {item.maxPeople}</span>
                        </div>
                        <div className="rPrice">
                          <span>${item.price}</span>
                          <small>/ night</small>
                        </div>
                      </div>
                    </div>

                    <div className="rSelectRooms">
                      <span className="rSelectLabel">Select Suite #:</span>
                      <div className="rRoomNumberGrid">
                        {item.roomNumbers?.map((roomNumber) => (
                          <label
                            key={roomNumber._id}
                            className={`roomChip ${
                              !isAvailable(roomNumber) ? "disabledChip" : ""
                            } ${
                              selectedRooms.includes(roomNumber._id)
                                ? "selectedChip"
                                : ""
                            }`}
                          >
                            <input
                              type="checkbox"
                              value={roomNumber._id}
                              onChange={handleSelect}
                              disabled={!isAvailable(roomNumber)}
                            />
                            <span>#{roomNumber.number}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rNoRooms">No suites currently configured for this property.</div>
              )}
            </div>

            <div className="rFooter">
              <div className="rSelectedCount">
                <span>Selected:</span>
                <b>{selectedRooms.length} suite(s)</b>
              </div>
              <button
                onClick={handleClick}
                disabled={selectedRooms.length === 0 || bookingLoading}
                className="rButton"
              >
                {bookingLoading ? "Securing Booking..." : "Confirm Reservation"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Reserve;
