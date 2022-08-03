import { Link } from "react-router-dom";
import logo from "../images/Vinted_logo.png";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Header = ({
  token,
  setToken,
  setTitle,
  ascPrice,
  setAscPrice,
  desPrice,
  setDesPrice,
  priceMin,
  priceMax,
  setPriceMin,
  setPriceMax,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <header>
        <div className="container">
          <div className="header-div">
            <div className="header-start">
              <Link to="/">
                <img src={logo} alt="" />
              </Link>

              <input
                type="search"
                placeholder=" 🔍 Recherche tes articles"
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
            <div className="header-end">
              {token ? (
                <button
                  className="button2"
                  onClick={() => {
                    setToken(null);
                    Cookies.remove("cookie");
                    navigate("/login");
                  }}
                >
                  Se deconnecter
                </button>
              ) : (
                <>
                  <Link className="button2" to="/signup">
                    <button>S'inscrire</button>
                  </Link>

                  <Link className="button2" to="/login">
                    <button>Se connecter</button>
                  </Link>
                </>
              )}

              <button className="button2">Vends tes articles</button>
            </div>
          </div>
          <div className="filters">
            <div className="croiss">
              <input
                type="checkbox"
                id="price"
                value={ascPrice}
                onChange={() => {
                  setAscPrice((prevState) => !prevState);
                }}
              />
              <label htmlFor="price">trier par prix croissant</label>
              <input
                type="checkbox"
                id="price"
                value={desPrice}
                onChange={() => {
                  setDesPrice((prevState) => !prevState);
                }}
              />
              <label htmlFor="price">trier par prix decroissant</label>
            </div>
            <div className="min-max">
              <input
                type="text"
                id="price-min"
                value={priceMin}
                onChange={(event) => setPriceMin(event.target.value)}
              />
              <label htmlFor="price-min">Prix mini</label>
              <input
                type="text"
                id="price-max"
                value={priceMax}
                onChange={(event) => setPriceMax(event.target.value)}
              />
              <label htmlFor="price-max">Prix maxi</label>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
