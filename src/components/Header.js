import { Link } from "react-router-dom";
import logo from "../images/Vinted_logo.png";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { isDisabled } from "@testing-library/user-event/dist/utils";

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
  page,
  setPage,
  limit,
  setLimit,
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
                placeholder=" 🔍 Look for your articles"
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
                    <button>Login</button>
                  </Link>

                  <Link className="button2" to="/login">
                    <button>Connect</button>
                  </Link>
                </>
              )}

              <button className="button2">Sell your articles</button>
            </div>
          </div>
          <div className="filters">
            <div className="croiss">
              {!desPrice && (
                <>
                  <input
                    type="checkbox"
                    id="price"
                    value={ascPrice}
                    onChange={() => {
                      setAscPrice((prevState) => !prevState);
                    }}
                  />
                  <label htmlFor="price">Ascending price</label>
                </>
              )}

              {!ascPrice && (
                <>
                  <input
                    type="checkbox"
                    id="price"
                    value={desPrice}
                    onChange={() => {
                      setDesPrice((prevState) => !prevState);
                    }}
                  />
                  <label htmlFor="price">Decreasing price</label>
                </>
              )}
            </div>
            <div className="min-max">
              <input
                type="text"
                id="price-min"
                value={priceMin}
                onChange={(event) => setPriceMin(Number(event.target.value))}
              />
              <label htmlFor="price-min">Price min</label>
              <input
                type="text"
                id="price-max"
                value={priceMax}
                onChange={(event) => setPriceMax(Number(event.target.value))}
              />
              <label htmlFor="price-max">Price max</label>
            </div>
            <div className="class-page">
              <input
                type="number"
                id="page"
                value={page}
                onChange={(event) => setPage(Number(event.target.value))}
              />
              <label htmlFor="page">Page number</label>
              <input
                type="number"
                id="page"
                value={limit}
                onChange={(event) => setLimit(Number(event.target.value))}
              />
              <label htmlFor="page">Offers per page</label>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
