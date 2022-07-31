import { Link } from "react-router-dom";
import logo from "../images/Vinted_logo.png";
import Cookies from "js-cookie";

const Header = ({ token, setToken }) => {
  console.log("ici je vois ca le token>>>", token);
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
                  onClick={() => {
                    Cookies.remove("cookie");
                  }}
                >
                  Se deconnecter
                </button>
              ) : (
                <>
                  <Link className="button1" to="/signup">
                    <button>S'inscrire</button>
                  </Link>

                  <Link className="button1" to="/login">
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
