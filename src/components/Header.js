import { Link } from "react-router-dom";
import logo from "../images/Vinted_logo.png";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Header = ({ token, setToken }) => {
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

              <input type="search" placeholder=" 🔍 Recherche tes articles" />
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
        </div>
      </header>
    </>
  );
};

export default Header;
