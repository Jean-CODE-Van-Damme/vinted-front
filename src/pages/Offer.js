import { useParams, Navigate, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Offer = ({ token }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  // console.log("id >>>", id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          ` https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        console.log("data >>>> ", response.data);
        setData(response.data);
      } catch (error) {
        console.log(error.response);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  return token ? (
    <div>
      {isLoading ? (
        <p>Chargement</p>
      ) : (
        <div className="offer">
          <div className="offer-left">
            <img src={data.product_image.secure_url} alt="" />
          </div>
          <div className="offer-right">
            <div className="right-price">{data.product_price} $</div>

            <div className="right-start">
              {data.product_details.map((element) => {
                return (
                  <>
                    {element.MARQUE && (
                      <div className="line">
                        <p>MARQUE </p>
                        <span>{element.MARQUE}</span>
                      </div>
                    )}
                    {element.TAILLE && (
                      <div className="line">
                        <p>TAILLE </p>
                        <span>{element.TAILLE}</span>
                      </div>
                    )}
                    {element.ETAT && (
                      <div className="line">
                        <p>ETAT </p>
                        <span>{element.ETAT}</span>
                      </div>
                    )}
                    {element.COULEUR && (
                      <div className="line">
                        <p>COULEUR </p> <span>{element.COULEUR}</span>
                      </div>
                    )}
                    {element.EMPLACEMENT && (
                      <div className="line">
                        <p>EMPLACEMENT </p> <span>{element.EMPLACEMENT}</span>
                      </div>
                    )}
                  </>
                );
              })}
            </div>
            <div className="right-end">
              {data.product_name && (
                <p className="product-name">{data.product_name}</p>
              )}
              {data.product_description && (
                <p className="description">{data.product_description}</p>
              )}
              <div className="right-owner">
                {data.owner.account.avatar && (
                  <img src={data.owner.account.avatar.secure_url} alt="" />
                )}
                {data.owner && <div>{data.owner.account.username}</div>}
              </div>
            </div>
            <div>
              <Link
                className="button-end"
                to="/payment"
                state={{ title: data.product_name, price: data.product_price }}
              >
                <button className="button-end">Acheter</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Offer;
