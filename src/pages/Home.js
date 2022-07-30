import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  // console.log("data >>>> ", data);

  useEffect(() => {
    fetchData();
  }, []);

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
                          <img src={element.owner.account.avatar.url} alt="" />
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
