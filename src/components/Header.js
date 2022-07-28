import logo from "../images/Vinted_logo.png";

const Header = () => {
  return (
    <>
      <header>
        <div className="container">
          <div className="header-div">
            <img src={logo} alt="" />
            <input type="search" placeholder=" 🔍 Recherche tes articles" />
            <button className="button1">S'inscrire</button>
            <button className="button1">Se connecter</button>
            <button className="button2">Vends tes articles</button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
