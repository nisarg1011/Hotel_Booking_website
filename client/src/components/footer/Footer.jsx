import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown, faShieldAlt, faAward, faHeadset } from "@fortawesome/free-solid-svg-icons";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footerWrapper">
      <div className="footerTop">
        <div className="footerBrandCol">
          <div className="footerBrand">
            <div className="fBrandIcon">
              <FontAwesomeIcon icon={faCrown} />
            </div>
            <span className="fBrandName">NISARG COLLECTION</span>
          </div>
          <p className="footerTagline">
            Setting the global standard for exceptional luxury hospitality, boutique residences, and bespoke travel experiences.
          </p>
          <div className="footerTrustBadges">
            <div className="trustBadge">
              <FontAwesomeIcon icon={faShieldAlt} />
              <span>PCI-DSS Secured</span>
            </div>
            <div className="trustBadge">
              <FontAwesomeIcon icon={faAward} />
              <span>5-Star Certified</span>
            </div>
            <div className="trustBadge">
              <FontAwesomeIcon icon={faHeadset} />
              <span>24/7 Concierge</span>
            </div>
          </div>
        </div>

        <div className="footerNavGrid">
          <div className="footerCol">
            <h4>Destinations</h4>
            <ul>
              <li>Berlin, Germany</li>
              <li>Madrid, Spain</li>
              <li>London, UK</li>
              <li>Paris, France</li>
              <li>Rome, Italy</li>
              <li>Tokyo, Japan</li>
            </ul>
          </div>

          <div className="footerCol">
            <h4>Collections</h4>
            <ul>
              <li>Historic Palaces</li>
              <li>Lakefront Villas</li>
              <li>Penthouse Suites</li>
              <li>Alpine Ski Lodges</li>
              <li>Private Islands</li>
              <li>Eco-Resorts</li>
            </ul>
          </div>

          <div className="footerCol">
            <h4>Member Services</h4>
            <ul>
              <li>VIP Genius Club</li>
              <li>Private Jet Charter</li>
              <li>Chauffeur Airport Taxi</li>
              <li>Michelin Dining Reservations</li>
              <li>Curated Itineraries</li>
              <li>Travel Agents Portal</li>
            </ul>
          </div>

          <div className="footerCol">
            <h4>Legal & Support</h4>
            <ul>
              <li>24/7 Customer Care</li>
              <li>Safety & Security</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Sustainability Pledge</li>
              <li>Investor Relations</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footerBottom">
        <div className="footerBottomContainer">
          <div className="fText">Copyright © 2026 Nisargbooking. All rights reserved.</div>
          <div className="footerLegalLinks">
            <span>Privacy</span>
            <span>·</span>
            <span>Terms</span>
            <span>·</span>
            <span>Sitemap</span>
            <span>·</span>
            <span>Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
