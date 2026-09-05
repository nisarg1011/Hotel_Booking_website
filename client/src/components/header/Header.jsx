import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faUmbrellaBeach,
  faShieldHalved,
  faGem,
  faAward,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 3)),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 2,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { destination, dates, options } });
  };

  return (
    <div className="header">
      <div className="headerAmbientGlow"></div>
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} className="tabIcon" />
            <span>Luxury Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faUmbrellaBeach} className="tabIcon" />
            <span>Villas & Resorts</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} className="tabIcon" />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} className="tabIcon" />
            <span>Chauffeur & Cars</span>
          </div>
        </div>

        {type !== "list" && (
          <>
            <div className="headerHero">
              <div className="heroBadge">
                <span className="heroBadgeDot"></span>
                <span>Exclusive 2026 Collection</span>
              </div>
              <h1 className="headerTitle">
                Discover Your Next <span className="titleHighlight">Sanctuary</span>
              </h1>
              <p className="headerDesc">
                Handpicked boutique hotels, private villas, and secluded lakefront retreats with tailored concierge service and member privileges.
              </p>

              <div className="heroPerks">
                <div className="perkItem">
                  <FontAwesomeIcon icon={faGem} className="perkIcon" />
                  <span>Best Rate Guaranteed</span>
                </div>
                <div className="perkItem">
                  <FontAwesomeIcon icon={faShieldHalved} className="perkIcon" />
                  <span>Flexible Cancellation</span>
                </div>
                <div className="perkItem">
                  <FontAwesomeIcon icon={faAward} className="perkIcon" />
                  <span>VIP Perks & Upgrades</span>
                </div>
              </div>
            </div>

            <div className="headerSearchCapsule">
              <div className="searchField destinationField">
                <div className="fieldIconBox">
                  <FontAwesomeIcon icon={faBed} className="fieldIcon" />
                </div>
                <div className="fieldInputs">
                  <label>DESTINATION</label>
                  <input
                    type="text"
                    placeholder="Where to? (e.g. Berlin, Madrid, London)"
                    className="headerSearchInput"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
              </div>

              <div className="searchDivider"></div>

              <div className="searchField dateField" onClick={() => setOpenDate(!openDate)}>
                <div className="fieldIconBox">
                  <FontAwesomeIcon icon={faCalendarDays} className="fieldIcon" />
                </div>
                <div className="fieldInputs">
                  <label>DATES</label>
                  <span className="headerSearchText">
                    {`${format(dates[0].startDate, "MMM dd")} — ${format(
                      dates[0].endDate,
                      "MMM dd, yyyy"
                    )}`}
                  </span>
                </div>

                {openDate && (
                  <div className="datePickerPopover" onClick={(e) => e.stopPropagation()}>
                    <DateRange
                      editableDateInputs={true}
                      onChange={(item) => setDates([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={dates}
                      className="date"
                      minDate={new Date()}
                      rangeColors={["#0ea5e9"]}
                    />
                    <div className="popoverFooter">
                      <button className="popoverDoneBtn" onClick={() => setOpenDate(false)}>
                        Done
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="searchDivider"></div>

              <div className="searchField guestsField" onClick={() => setOpenOptions(!openOptions)}>
                <div className="fieldIconBox">
                  <FontAwesomeIcon icon={faPerson} className="fieldIcon" />
                </div>
                <div className="fieldInputs">
                  <label>GUESTS & ROOMS</label>
                  <span className="headerSearchText">
                    {`${options.adult} Adults · ${options.children} Kids · ${options.room} Room`}
                  </span>
                </div>

                {openOptions && (
                  <div className="optionsPopover" onClick={(e) => e.stopPropagation()}>
                    <div className="optionItem">
                      <div className="optionLabel">
                        <span className="optionTitle">Adults</span>
                        <span className="optionSub">Ages 13 or above</span>
                      </div>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">{options.adult}</span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="optionItem">
                      <div className="optionLabel">
                        <span className="optionTitle">Children</span>
                        <span className="optionSub">Ages 0 to 12</span>
                      </div>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">{options.children}</span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="optionItem">
                      <div className="optionLabel">
                        <span className="optionTitle">Rooms</span>
                        <span className="optionSub">Total suites</span>
                      </div>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">{options.room}</span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="popoverFooter">
                      <button className="popoverDoneBtn" onClick={() => setOpenOptions(false)}>
                        Done
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="searchAction">
                <button className="searchSubmitBtn" onClick={handleSearch}>
                  <FontAwesomeIcon icon={faSearch} />
                  <span>Explore</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
