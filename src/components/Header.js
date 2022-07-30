import logo from "../images/Vinted_logo.png";

const Header = () => {
  return (
    <>
      <header>
        <div className="container">
          <div className="header-div">
            <div className="header-start">
              <img src={logo} alt="" />
              <input type="search" placeholder=" 🔍 Recherche tes articles" />
            </div>
            <div className="header-end">
              <button className="button1">S'inscrire</button>
              <button className="button1">Se connecter</button>
              <button className="button2">Vends tes articles</button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
