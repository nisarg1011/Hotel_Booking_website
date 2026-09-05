import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./home.css";

const Home = () => {
  return (
    <div className="homePage">
      <Navbar />
      <Header />
      <main className="homeContainer">
        <section className="homeSection">
          <div className="homeSectionHeader">
            <span className="sectionTag">ICONIC DESTINATIONS</span>
            <h2 className="homeTitle">Explore World-Class Cities</h2>
            <p className="homeSubtitle">
              Immerse yourself in culture, historic landmarks, and 5-star hospitality.
            </p>
          </div>
          <Featured />
        </section>

        <section className="homeSection">
          <div className="homeSectionHeader">
            <span className="sectionTag">CURATED ARCHITECTURE</span>
            <h2 className="homeTitle">Browse by Property Style</h2>
            <p className="homeSubtitle">
              From ultra-modern penthouses and luxury villas to peaceful rustic cabins.
            </p>
          </div>
          <PropertyList />
        </section>

        <section className="homeSection">
          <div className="homeSectionHeader">
            <span className="sectionTag">HIGHLY RATED STAYS</span>
            <h2 className="homeTitle">Sanctuaries Guests Adore</h2>
            <p className="homeSubtitle">
              Top-rated properties with extraordinary panoramic views, spas, and bespoke amenities.
            </p>
          </div>
          <FeaturedProperties />
        </section>

        <MailList />
        <Footer />
      </main>
    </div>
  );
};

export default Home;
