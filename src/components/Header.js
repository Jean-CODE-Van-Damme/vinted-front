import { Link } from "react-router-dom";
import logo from "../images/Vinted_logo.png";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { isDisabled } from "@testing-library/user-event/dist/utils";

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
  box,
  setBox,
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
                placeholder=" 🔍 Recherche"
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
                    <button> Se Connecter</button>
                  </Link>
                </>
              )}

              <button className="button2">Vendre ses articles</button>
            </div>
          </div>
          <div className="filters">
            <div className="croiss">
              <>
                <input
                  className="box"
                  type="checkbox"
                  id="price"
                  value={box}
                  onChange={() => {
                    setBox((prevState) => !prevState);
                  }}
                />

                {/* {box ? "Croissant" : "Decroissant"} */}
                <label className={box ? "big" : "little"}> 👆 </label>
                <label className={!box ? "big" : "little"}>👇</label>
              </>
            </div>
            <div className="min-max">
              <input
                type="text"
                id="price-min"
                value={priceMin}
                onChange={(event) => setPriceMin(Number(event.target.value))}
              />
              <label htmlFor="price-min">Prix min</label>
              <input
                type="text"
                id="price-max"
                value={priceMax}
                onChange={(event) => setPriceMax(Number(event.target.value))}
              />
              <label htmlFor="price-max">Prix max</label>
            </div>
            <div className="class-page">
              <input
                type="number"
                id="page"
                value={page}
                onChange={(event) => setPage(Number(event.target.value))}
              />
              <label htmlFor="page">Page</label>
              <input
                type="number"
                id="page"
                value={limit}
                onChange={(event) => setLimit(Number(event.target.value))}
              />
              <label htmlFor="page">Offres</label>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
