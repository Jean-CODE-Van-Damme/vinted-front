import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = ({
  title,
  priceMin,
  priceMax,
  page,
  limit,
  box,
  token,
  setToken,
}) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // console.log("title>>>", title);

  // console.log("page >>>", page);

  // console.log("data >>>> ", data);

  useEffect(() => {
    const fetchData = async () => {
      // Methode en prenant chaque state, en le pushant dans un tab vide

      // const filtersArray = [];
      // if (box) {
      //   filtersArray.push("sort=price-asc");
      // } else {
      //   filtersArray.push("sort=price-desc");
      // }

      // if (title) {
      //   filtersArray.push(`title=${title}`);
      // }

      // if (priceMin) {
      //   filtersArray.push(`priceMin=${priceMin}`);
      // }

      // if (priceMax) {
      //   filtersArray.push(`priceMax=${priceMax}`);
      // }

      // if (page) {
      //   filtersArray.push(`page=${page}`);
      // }

      // if (limit) {
      //   filtersArray.push(`limit=${limit}`);
      // }

      // console.log("FA >>>", filtersArray.join("&"));

      try {
        // On push  le tab en le transformant en string , separant chaque element par un "&"

        // const response = await axios.get(
        //   `https://lereacteur-vinted-api.herokuapp.com/offers?${filtersArray.join(
        //     "&"
        //   )}`
        // );

        // console.log(response.data);
        //
        //

        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?title=${
            title ? title : ""
          }&priceMin=${priceMin ? priceMin : ""}&priceMax=${
            priceMax ? priceMax : ""
          }&page=${page ? page : ""}&limit=${limit ? limit : ""}&sort=${
            box ? "price-asc" : "price-desc"
          } `
        );

        setData(response.data);
        // console.log(response.data);
        // }
      } catch (error) {
        console.log(error.response);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [title, priceMin, priceMax, page, limit, box]);

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
