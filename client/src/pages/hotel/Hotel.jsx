import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faXmark,
  faLocationDot,
  faStar,
  faWifi,
  faWaterLadder,
  faUtensils,
  faSpa,
  faShieldHalved,
  faCar,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading } = useFetch(`/hotels/find/${id}`);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { dates, options } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    if (!date1 || !date2) return 1;
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays > 0 ? diffDays : 1;
  }

  const days =
    dates && dates[0]
      ? dayDifference(dates[0].endDate, dates[0].startDate)
      : 1;

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;
    const totalPhotos = data.photos?.length || 1;
    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? totalPhotos - 1 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === totalPhotos - 1 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  const amenities = [
    { icon: faWifi, label: "Ultra High-Speed WiFi" },
    { icon: faWaterLadder, label: "Panoramic Pool & Sun Deck" },
    { icon: faUtensils, label: "Gourmet Breakfast Included" },
    { icon: faSpa, label: "Luxury Wellness Spa & Sauna" },
    { icon: faCar, label: "Complimentary Valet Parking" },
    { icon: faShieldHalved, label: "24/7 VIP Concierge Care" },
  ];

  return (
    <div className="hotelPage">
      <Navbar />
      <Header type="list" />

      {loading ? (
        <div className="hotelLoading">
          <div className="hotelSkeleton"></div>
        </div>
      ) : data ? (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <button className="closeBtn" onClick={() => setOpen(false)}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
              <button className="sliderArrow leftArrow" onClick={() => handleMove("l")}>
                <FontAwesomeIcon icon={faCircleArrowLeft} />
              </button>
              <div className="sliderWrapper">
                <img
                  src={data.photos && data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <button className="sliderArrow rightArrow" onClick={() => handleMove("r")}>
                <FontAwesomeIcon icon={faCircleArrowRight} />
              </button>
            </div>
          )}

          <div className="hotelWrapper">
            <div className="hotelHeader">
              <div className="hotelHeaderInfo">
                <div className="hotelRatingTag">
                  <FontAwesomeIcon icon={faStar} className="starGold" />
                  <span>{data.rating || 4.9} Superb</span>
                  <span className="hotelTypeBadge">{data.type || "Luxury Resort"}</span>
                </div>
                <h1 className="hotelTitle">{data.name}</h1>
                <div className="hotelAddress">
                  <FontAwesomeIcon icon={faLocationDot} className="addrIcon" />
                  <span>{data.address}, {data.city}</span>
                  <span className="hotelDistPill">{data.distance || "Central Location"}</span>
                </div>
              </div>

              <div className="hotelHeaderCta">
                <div className="hotelHeaderPrice">
                  <span className="fromText">Starting from</span>
                  <div className="priceBig">
                    <span>${data.cheapestPrice}</span>
                    <small>/ night</small>
                  </div>
                </div>
                <button className="bookNowTop" onClick={handleClick}>
                  Reserve Suites
                </button>
              </div>
            </div>

            <div className="hotelImagesGrid">
              {data.photos?.map((photo, i) => (
                <div
                  className={`hotelImgWrapper ${i === 0 ? "imgHero" : ""}`}
                  key={i}
                  onClick={() => handleOpen(i)}
                >
                  <img src={photo} alt="" className="hotelImg" />
                  <div className="imgOverlay">
                    <span>Click to expand</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="hotelAmenitiesSection">
              <h3 className="amenitiesTitle">Property Highlights & Amenities</h3>
              <div className="amenitiesGrid">
                {amenities.map((item, idx) => (
                  <div className="amenityItem" key={idx}>
                    <FontAwesomeIcon icon={item.icon} className="amenityIcon" />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h2 className="hotelSubTitle">{data.title || "Experience Unrivaled Comfort"}</h2>
                <p className="hotelDesc">{data.desc}</p>
              </div>

              <aside className="hotelDetailsPrice">
                <div className="priceCardHeader">
                  <h3>Curated {days}-Night Stay</h3>
                  <span className="priceCardBadge">VIP Genius Rate</span>
                </div>
                <p className="priceCardDesc">
                  Prime location in {data.city || "this iconic destination"} with 5-star verified guest hospitality score.
                </p>

                <div className="priceCalculation">
                  <div className="calcRow">
                    <span>${data.cheapestPrice} x {days} nights x {options?.room || 1} room</span>
                    <span>${days * data.cheapestPrice * (options?.room || 1)}</span>
                  </div>
                  <div className="calcRow highlightRow">
                    <span>Total Amount</span>
                    <span className="totalPriceVal">
                      ${days * data.cheapestPrice * (options?.room || 1)}
                    </span>
                  </div>
                  <span className="calcTaxNote">Includes taxes, breakfast, and resort service</span>
                </div>

                <button className="bookNowBtn" onClick={handleClick}>
                  Book Your Sanctuary Now
                </button>
              </aside>
            </div>
          </div>

          <MailList />
          <Footer />
        </div>
      ) : null}

      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default Hotel;
