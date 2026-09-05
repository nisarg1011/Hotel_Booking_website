import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSliders,
  faCalendarDays,
  faLocationDot,
  faSearch,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(
    location.state?.destination || ""
  );
  const [dates, setDates] = useState(
    location.state?.dates || [
      {
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 3)),
        key: "selection",
      },
    ]
  );
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(
    location.state?.options || { adult: 2, children: 0, room: 1 }
  );
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, reFetch } = useFetch(
    `/hotels?city=${destination}&min=${min || 0}&max=${max || 9999}`
  );

  const handleSearch = () => {
    reFetch();
  };

  const handleClearFilters = () => {
    setDestination("");
    setMin(undefined);
    setMax(undefined);
  };

  return (
    <div className="listPage">
      <Navbar />
      <Header type="list" />

      <div className="listContainer">
        <div className="listWrapper">
          <aside className="listSearch">
            <div className="lsHeader">
              <div className="lsIconBox">
                <FontAwesomeIcon icon={faSliders} />
              </div>
              <h2 className="lsTitle">Filter Stays</h2>
            </div>

            <div className="lsItem">
              <label>DESTINATION / CITY</label>
              <div className="lsInputWrapper">
                <FontAwesomeIcon icon={faLocationDot} className="lsFieldIcon" />
                <input
                  placeholder="e.g. Berlin, Madrid, London"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  type="text"
                />
              </div>
            </div>

            <div className="lsItem">
              <label>CHECK-IN / CHECK-OUT</label>
              <div
                className="lsDateBox"
                onClick={() => setOpenDate(!openDate)}
              >
                <FontAwesomeIcon icon={faCalendarDays} className="lsFieldIcon" />
                <span>
                  {dates && dates[0]
                    ? `${format(dates[0].startDate, "MMM dd")} to ${format(
                        dates[0].endDate,
                        "MMM dd, yyyy"
                      )}`
                    : "Select Dates"}
                </span>
              </div>
              {openDate && (
                <div className="lsDatePopover">
                  <DateRange
                    onChange={(item) => setDates([item.selection])}
                    minDate={new Date()}
                    ranges={dates}
                    rangeColors={["#0ea5e9"]}
                  />
                  <div className="popoverFooter">
                    <button
                      className="popoverDoneBtn"
                      onClick={() => setOpenDate(false)}
                    >
                      Apply Dates
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="lsItem">
              <label>PRICE RANGE (PER NIGHT)</label>
              <div className="lsPriceRangeGrid">
                <div className="priceInputBox">
                  <span>Min $</span>
                  <input
                    type="number"
                    placeholder="0"
                    value={min !== undefined ? min : ""}
                    onChange={(e) => setMin(e.target.value)}
                  />
                </div>
                <div className="priceInputBox">
                  <span>Max $</span>
                  <input
                    type="number"
                    placeholder="999"
                    value={max !== undefined ? max : ""}
                    onChange={(e) => setMax(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="lsItem">
              <label>GUESTS & SUITES</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span>Adults</span>
                  <input
                    type="number"
                    min={1}
                    value={options.adult}
                    onChange={(e) =>
                      setOptions({
                        ...options,
                        adult: parseInt(e.target.value) || 1,
                      })
                    }
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span>Children</span>
                  <input
                    type="number"
                    min={0}
                    value={options.children}
                    onChange={(e) =>
                      setOptions({
                        ...options,
                        children: parseInt(e.target.value) || 0,
                      })
                    }
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span>Rooms</span>
                  <input
                    type="number"
                    min={1}
                    value={options.room}
                    onChange={(e) =>
                      setOptions({
                        ...options,
                        room: parseInt(e.target.value) || 1,
                      })
                    }
                    className="lsOptionInput"
                  />
                </div>
              </div>
            </div>

            <div className="lsButtonRow">
              <button className="lsSearchBtn" onClick={handleSearch}>
                <FontAwesomeIcon icon={faSearch} />
                <span>Apply Filters</span>
              </button>
              {(destination || min || max) && (
                <button
                  className="lsResetBtn"
                  onClick={handleClearFilters}
                  title="Clear filters"
                >
                  <FontAwesomeIcon icon={faRotateRight} />
                </button>
              )}
            </div>
          </aside>

          <main className="listResult">
            <div className="listResultHeader">
              <div>
                <h1 className="listResultTitle">
                  {destination
                    ? `Sanctuaries in "${destination}"`
                    : "All Available Sanctuaries"}
                </h1>
                <p className="listResultSub">
                  {data ? `${data.length} boutique properties found` : "Searching..."}
                </p>
              </div>
            </div>

            {loading ? (
              <div className="listSkeletonList">
                <div className="listSkeleton"></div>
                <div className="listSkeleton"></div>
              </div>
            ) : data && data.length > 0 ? (
              <div className="listItemsContainer">
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </div>
            ) : (
              <div className="listEmptyState">
                <div className="emptyIcon">🏰</div>
                <h3>No properties found</h3>
                <p>
                  We couldn't find any stays matching your current filters. Try
                  adjusting your destination or price range.
                </p>
                <button className="clearBtn" onClick={handleClearFilters}>
                  Show All Available Stays
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default List;
