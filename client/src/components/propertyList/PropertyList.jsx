import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import "./propertyList.css";

const PropertyList = () => {
  const { data, loading } = useFetch("/hotels/countByType");
  const navigate = useNavigate();

  const propertyTypes = [
    {
      name: "Hotels",
      type: "hotel",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Apartments",
      type: "apartment",
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Resorts",
      type: "resort",
      image:
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Villas",
      type: "villa",
      image:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Cabins",
      type: "cabin",
      image:
        "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const handleTypeClick = (type) => {
    navigate("/hotels", {
      state: {
        destination: "",
        dates: [
          {
            startDate: new Date(),
            endDate: new Date(new Date().setDate(new Date().getDate() + 3)),
            key: "selection",
          },
        ],
        options: { adult: 2, children: 0, room: 1 },
      },
    });
  };

  return (
    <div className="pList">
      {loading ? (
        <div className="pListSkeletonGrid">
          {[1, 2, 3, 4, 5].map((n) => (
            <div className="pListSkeleton" key={n}></div>
          ))}
        </div>
      ) : (
        <div className="pListGrid">
          {data &&
            propertyTypes.map((item, i) => (
              <div
                className="pListItem"
                key={item.type}
                onClick={() => handleTypeClick(item.type)}
              >
                <div className="pListImgBox">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="pListImg"
                  />
                  <div className="pListOverlay"></div>
                </div>
                <div className="pListTitles">
                  <h3 className="pListType">{item.name}</h3>
                  <span className="pListCount">
                    {data[i]?.count !== undefined
                      ? `${data[i]?.count} ${data[i]?.count === 1 ? "property" : "properties"}`
                      : "Available"}
                  </span>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default PropertyList;
