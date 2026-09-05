import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const { data, loading } = useFetch("/hotels?featured=true&limit=4");

  return (
    <div className="fp">
      {loading ? (
        <div className="fpSkeletonGrid">
          {[1, 2, 3, 4].map((n) => (
            <div className="fpSkeleton" key={n}></div>
          ))}
        </div>
      ) : (
        <div className="fpGrid">
          {data.map((item) => (
            <Link
              to={`/hotels/${item._id}`}
              className="fpCard"
              key={item._id}
            >
              <div className="fpImgWrapper">
                <img
                  src={
                    item.photos && item.photos[0]
                      ? item.photos[0]
                      : "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
                  }
                  alt={item.name}
                  className="fpImg"
                />
                <div className="fpBadge">
                  <span>★ {item.rating || 4.8}</span>
                </div>
              </div>

              <div className="fpDetails">
                <div className="fpCityTag">
                  <FontAwesomeIcon icon={faLocationDot} className="fpCityIcon" />
                  <span>{item.city}</span>
                </div>

                <h3 className="fpName">{item.name}</h3>

                <div className="fpFooter">
                  <div className="fpPriceBox">
                    <span className="fpPriceLabel">From</span>
                    <span className="fpPriceVal">${item.cheapestPrice}</span>
                    <span className="fpPriceUnit">/ night</span>
                  </div>

                  <span className="fpBookBtn">View Stay</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedProperties;
