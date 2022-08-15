import { Link } from "react-router-dom";
import logo from "../images/Vinted_logo.png";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";

const Header = ({
  token,
  setToken,
  setTitle,
  priceMin,
  priceMax,
  setPriceMin,
  setPriceMax,
  page,
  setPage,
  limit,
  setLimit,
  cresentPrice,
  setCrescentPrice,
}) => {
  // HOOKS
  const navigate = useNavigate();
  const location = useLocation();

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
                placeholder=" 🔍 Recherche"
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
            <div className="header-end">
              {/* Si un token existe */}
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
                // si on a pas de token present
                <>
                  <Link className="button2" to="/signup">
                    <button>S'inscrire</button>
                  </Link>

                  <Link className="button2" to="/login">
                    <button> Se Connecter</button>
                  </Link>
                </>
              )}

              {/* Lien vers la page publish */}
              <Link className="button2" to="/publish">
                <button>Vendre ses articles</button>
              </Link>
            </div>
          </div>

          {/* Afficher ou non les filtres que l on soit sur la page home ou sur une autre page */}
          {location.pathname === "/" ? (
            <div className="filters">
              <div className="croiss">
                <>
                  {/* box qui gere le state crescentPrice */}
                  <input
                    className="box"
                    type="checkbox"
                    id="price"
                    value={cresentPrice}
                    onChange={() => {
                      setCrescentPrice((prevState) => !prevState);
                    }}
                  />
                  {/* changement de classe du label selon le state box  */}
                  <label className={cresentPrice ? "big" : "little"}>
                    Prix ↗️
                  </label>
                  <label className={!cresentPrice ? "big" : "little"}>
                    Prix ↘️
                  </label>
                </>
              </div>
              <div className="min-max">
                <input
                  min="0"
                  type="number"
                  id="price-min"
                  value={priceMin}
                  onChange={(event) => setPriceMin(Number(event.target.value))}
                />
                <label htmlFor="price-min">Prix min</label>
                <input
                  min="0"
                  type="number"
                  id="price-max"
                  value={priceMax}
                  onChange={(event) => setPriceMax(Number(event.target.value))}
                />
                <label htmlFor="price-max">Prix max</label>
              </div>
              <div className="class-page">
                <input
                  min="0"
                  type="number"
                  id="page"
                  value={page}
                  onChange={(event) => setPage(Number(event.target.value))}
                />
                <label htmlFor="page">Page</label>
                <input
                  type="number"
                  min="0"
                  id="page"
                  value={limit}
                  onChange={(event) => setLimit(Number(event.target.value))}
                />
                <label htmlFor="page">Offres</label>
              </div>
            </div>
          ) : null}
        </div>
      </header>
    </>
  );
};

export default Header;
