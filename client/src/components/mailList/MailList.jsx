import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPaperPlane, faCheck } from "@fortawesome/free-solid-svg-icons";
import "./mailList.css";

const MailList = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <div className="mailWrapper">
      <div className="mailCard">
        <div className="mailGlow"></div>
        <div className="mailContent">
          <span className="mailBadge">NISARG PRIVILEGE CLUB</span>
          <h2 className="mailTitle">Unlock Secret Member Rates & Bespoke Upgrades</h2>
          <p className="mailDesc">
            Join over 150,000 discerning travelers. Receive private sale invitations, complimentary room upgrades, and curated destination guides.
          </p>

          {subscribed ? (
            <div className="mailSuccess">
              <FontAwesomeIcon icon={faCheck} className="checkIcon" />
              <span>Welcome to the club! Check your inbox for your 15% VIP welcome voucher.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mailInputContainer">
              <div className="mailInputBox">
                <FontAwesomeIcon icon={faEnvelope} className="mailInputIcon" />
                <input
                  type="email"
                  placeholder="Enter your private email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="mailBtn">
                <FontAwesomeIcon icon={faPaperPlane} />
                <span>Join VIP</span>
              </button>
            </form>
          )}

          <span className="mailPrivacy">
            🔒 No spam ever. One-click unsubscribe anytime. Member terms apply.
          </span>
        </div>
      </div>
    </div>
  );
};

export default MailList;