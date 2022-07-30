import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Offer = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  // console.log("id >>>", id);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        ` https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
      );
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  console.log("data >>>> ", data);

  useEffect(() => {
    fetchData();
  });

  return (
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
                      <div className="center">
                        <p>MARQUE </p>
                        <span>{element.MARQUE}</span>
                      </div>
                    )}
                    {element.TAILLE && (
                      <div className="center">
                        <p>TAILLE </p>
                        <span>{element.TAILLE}</span>
                      </div>
                    )}
                    {element.ETAT && (
                      <div className="center">
                        <p>ETAT </p>
                        <span>{element.ETAT}</span>
                      </div>
                    )}
                    {element.COULEUR && (
                      <div className="center">
                        <p>COULEUR </p> <span>{element.COULEUR}</span>
                      </div>
                    )}
                    {element.EMPLACEMENT && (
                      <div className="center">
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
                {data.owner && (
                  <img src={data.owner.account.avatar.secure_url} alt="" />
                )}
                {data.owner && <div>{data.owner.account.username}</div>}
              </div>
            </div>
            <div className="button-end">
              <button>Acheter</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Offer;
