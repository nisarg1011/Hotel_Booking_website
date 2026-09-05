import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./featured.css";

const Featured = () => {
  const { data, loading } = useFetch(
    "/hotels/countByCity?cities=berlin,madrid,london"
  );
  const navigate = useNavigate();
  const { dispatch } = useContext(SearchContext);

  const handleCityClick = (cityName) => {
    const dates = [
      {
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 3)),
        key: "selection",
      },
    ];
    const options = { adult: 2, children: 0, room: 1 };
    dispatch({
      type: "NEW_SEARCH",
      payload: { destination: cityName.toLowerCase(), dates, options },
    });
    navigate("/hotels", {
      state: { destination: cityName.toLowerCase(), dates, options },
    });
  };

  const cities = [
    {
      name: "Berlin",
      country: "Germany",
      image:
        "https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=800&q=80",
      tag: "Cultural Capital",
    },
    {
      name: "Madrid",
      country: "Spain",
      image:
        "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=800&q=80",
      tag: "Royal Heritage",
    },
    {
      name: "London",
      country: "United Kingdom",
      image:
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
      tag: "Cosmopolitan Luxe",
    },
  ];

  return (
    <div className="featured">
      {loading ? (
        <div className="featuredSkeletonGrid">
          <div className="featuredSkeleton"></div>
          <div className="featuredSkeleton"></div>
          <div className="featuredSkeleton"></div>
        </div>
      ) : (
        <div className="featuredGrid">
          {cities.map((city, index) => (
            <div
              className="featuredCard"
              key={city.name}
              onClick={() => handleCityClick(city.name)}
            >
              <div className="featuredImgWrapper">
                <img
                  src={city.image}
                  alt={city.name}
                  className="featuredImg"
                />
                <div className="featuredGradient"></div>
              </div>

              <div className="featuredTopBadge">
                <span>{city.tag}</span>
              </div>

              <div className="featuredContent">
                <div className="featuredLocation">
                  <FontAwesomeIcon icon={faLocationDot} className="locIcon" />
                  <span>{city.country}</span>
                </div>
                <h3 className="featuredCityName">{city.name}</h3>
                <div className="featuredMeta">
                  <span className="featuredCount">
                    {data && data[index] !== undefined
                      ? `${data[index]} Luxury Stays`
                      : "Explore Stays"}
                  </span>
                  <div className="featuredArrow">
                    <FontAwesomeIcon icon={faArrowRight} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Featured;
