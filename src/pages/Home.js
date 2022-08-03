import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = ({
  title,

  ascPrice,
  setAscPrice,
  desPrice,
  setDesPrice,
  priceMin,
  priceMax,
}) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // console.log("title>>>", title);

  const fetchData = async () => {
    if (ascPrice === true) {
      setAscPrice("sort=price-asc");
    }

    if (desPrice === true) {
      setDesPrice("sort=price-desc");
    }

    let filters = "";

    if (title) {
      filters = filters + `?title=${title}`;
    }

    if (ascPrice) {
      filters = filters + `?${ascPrice}`;
    }

    if (desPrice) {
      filters = filters + `?${desPrice}`;
    }

    if (priceMin) {
      filters = filters + `?priceMin=${priceMin}`;
    }

    if (priceMax) {
      filters = filters + `?priceMax=${priceMax}`;
    }

    // if (priceMin && priceMax) {
    //   filters = filters + `?priceMin=${priceMin}&priceMax=${priceMax}`;
    // }

    console.log("filters>>>", filters);

    try {
      if (filters) {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers${filters}`
        );
        setData(response.data);
        // console.log(response.data);
      }
      if (!filters) {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        setData(response.data);
        // console.log(response.data);
      }
    } catch (error) {
      console.log(error.response);
    }
    setIsLoading(false);
  };

  // console.log("data >>>> ", data);

  useEffect(() => {
    fetchData();
  }, [title, ascPrice, desPrice, priceMin, priceMax]);

  const offersArray = data.offers;

  return (
    <div>
      {isLoading ? (
        <p>Chargement</p>
      ) : (
        <div className="home">
          <div className="big-picture">
            <div className="start-sell">
              <h2>Prêts à faire du tri dans vos placards ?</h2>
              <button>Commencer à vendre</button>
            </div>
          </div>

          <div className="container">
            <div className="all-cards ">
              {offersArray.map((element) => {
                const productArray = element.product_details;
                const id = element._id;

                return (
                  <Link to={`/offers/${id}`} className="card" key={element._id}>
                    <div className="card-name">
                      {element.owner && (
                        <div>
                          {element.owner.account.avatar && (
                            <img
                              src={element.owner.account.avatar.url}
                              alt=""
                            />
                          )}
                        </div>
                      )}
                      {element.owner && (
                        <div className="username">
                          {element.owner.account.username}
                        </div>
                      )}
                    </div>
                    <div className="card-img">
                      <img src={element.product_image.secure_url} alt="" />
                    </div>
                    <div className="card-price">{element.product_price} $</div>
                    <div className="name">{element.product_name}</div>

                    {productArray.map((product, index) => {
                      return (
                        <div className="productArray" key={index}>
                          <div>{product.MARQUE}</div>
                          <div>{product.TAILLE}</div>
                        </div>
                      );
                    })}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
