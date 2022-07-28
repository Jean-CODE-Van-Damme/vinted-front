import { Link } from "react-router-dom";
import img from "../images/image_vinted.jpeg";

const Home = ({ offersArray = [], cardArray = [], setCardArray }) => {
  //   console.log("offersArray >>>", offersArray);
  //   console.log("cardArray >>>", cardArray);

  return (
    <>
      <div className="home">
        <img src={img} alt="" />

        <div className="container">
          <div className="start-sell">
            <h2>Prêts à faire du tri dans vos placards ?</h2>
            <button>Commencer à vendre</button>
          </div>
        </div>

        <Link to="/offers"> Go to Offers page </Link>

        <div className="all-cards">
          {offersArray.map((element) => {
            //   console.log("username >>> ", element.owner.account.username);
            const pictureArray = element.product_pictures;
            const productArray = element.product_details;

            return (
              <div className="card" key={element._id}>
                <div className="card-name">
                  {element.owner && (
                    <div>
                      <img src={element.owner.account.avatar.url} alt="" />
                    </div>
                  )}
                  {element.owner && <div>{element.owner.account.username}</div>}
                </div>
                <div className="card-img">
                  <img src={element.product_image.secure_url} alt="" />
                </div>
                <div className="card-price">{element.product_price} $</div>

                {productArray.map((product, index) => {
                  // console.log("productArray >>>", productArray);
                  // console.log("marque >>>", product.MARQUE);
                  // console.log("taille >>>", product.TAILLE);

                  return (
                    <div key={index}>
                      <div>{product.MARQUE}</div>
                      <div>{product.TAILLE}</div>
                    </div>
                  );
                })}

                {/* {pictureArray.map((picture, index) => {
                  console.log("pictureArray >>>", pictureArray);
                  return (
                    picture.secure_url && (
                      <div key={index}>
                        <img src={picture.secure_url} alt="" />
                      </div>
                    )
                  );
                })} */}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
