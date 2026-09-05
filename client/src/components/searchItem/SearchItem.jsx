import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCar,
  faCheck,
  faStar,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import "./searchItem.css";

const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      <div className="siImgBox">
        <img
          src={
            item.photos && item.photos[0]
              ? item.photos[0]
              : "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
          }
          alt={item.name}
          className="siImg"
        />
        {item.featured && (
          <div className="siFeaturedBadge">
            <span>✨ Signature Stay</span>
          </div>
        )}
      </div>

      <div className="siDesc">
        <div className="siLocationRow">
          <FontAwesomeIcon icon={faLocationDot} className="siLocIcon" />
          <span className="siLocationText">
            {item.city} · {item.distance || "500m from city center"}
          </span>
        </div>

        <h2 className="siTitle">{item.name}</h2>
        <span className="siSubtitle">{item.title || "Luxury Accommodation"}</span>
        <p className="siFeatures">{item.desc}</p>

        <div className="siPerksList">
          <span className="siPerkBadge taxiBadge">
            <FontAwesomeIcon icon={faCar} /> Free Airport Transfer
          </span>
          <span className="siPerkBadge cancelBadge">
            <FontAwesomeIcon icon={faCheck} /> Free Cancellation
          </span>
        </div>
      </div>

      <div className="siDetails">
        {item.rating && (
          <div className="siRatingBox">
            <div className="siRatingLabel">
              <span className="siRatingGrade">
                {item.rating >= 4.5 ? "Exceptional" : "Excellent"}
              </span>
              <span className="siReviewCount">Verified Reviews</span>
            </div>
            <div className="siRatingScore">
              <FontAwesomeIcon icon={faStar} className="starIcon" />
              <span>{item.rating}</span>
            </div>
          </div>
        )}

        <div className="siPricingAction">
          <div className="siPriceBlock">
            <span className="siFrom">From</span>
            <div className="siPriceRow">
              <span className="siCurrency">$</span>
              <span className="siAmount">{item.cheapestPrice}</span>
              <span className="siPerNight">/ night</span>
            </div>
            <span className="siTaxNote">Includes all taxes & resort fees</span>
          </div>

          <Link to={`/hotels/${item._id}`} className="siLinkBtn">
            <button className="siCheckButton">
              <span>View Suites</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
