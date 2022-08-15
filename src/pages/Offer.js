import { useParams, Navigate, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Offer = ({ token }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // requete vers le back afin d afficher l offre correspondant a l id envoyee en params
        const response = await axios.get(
          ` https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );

        setData(response.data);
      } catch (error) {
        console.log(error.response);
      }
      // Fin du chargement lie a la requete
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  // si il y a un token on retourne
  return token ? (
    <div>
      {/* En chargement  */}
      {isLoading ? (
        <p>Chargement</p>
      ) : (
        // Chargement termine
        <div className="offer">
          <div className="offer-left">
            <img src={data.product_image.secure_url} alt="" />
          </div>
          <div className="offer-right">
            <div className="right-price">{data.product_price} $</div>

            <div className="right-start">
              {/* On map data.product_detail */}
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
              {/* Lien vers la page payment pour acheter le produit  */}
              <Link
                className="button-end"
                to="/payment"
                // On passe en state le titre et le prix avec le Link afin de les recup sur la page payment
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
    // Si il n y a pas de token , renvoi vers la page de connexion
    <Navigate to="/login" />
  );
};

export default Offer;
