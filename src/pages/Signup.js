import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup = ({ token, setToken }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  //   console.log("newsletter >>>", newsletter);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email: email,
          username: userName,
          password: password,
          newsletter: newsletter,
        }
      );

      Cookies.set("cookie", response.data.token, {
        expires: 10,
      });

      setToken(
        Cookies.set("cookie", response.data.token, {
          expires: 10,
        })
      );
      navigate("/");

      console.log("data >>>> ", response.data);
    } catch (error) {
      console.log(error.response);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <h3>S'inscrire</h3>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          fetchData();
        }}
      >
        <div className="form-part">
          <input
            className="form-part-input"
            type="text"
            placeholder="Nom d'utilisateur"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          />
          <input
            className="form-part-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            className="form-part-input"
            type="password"
            placeholder="Mot de Passe"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <div className="box">
            <input
              type="checkbox"
              id="checkbox"
              checked={newsletter}
              onChange={() => setNewsletter((prevState) => !prevState)}
            />
            <label htmlFor="checkbox">S'inscrire à notre newsletter</label>
            <div>
              <p className="politique">
                En m'inscrivant je confirme avoir lu et accepté les Termes et
                Conditions et Politiques de Confidentialité de Vinted. Je
                confirme avoir au moins 18 ans.
              </p>
            </div>
          </div>
          {isLoading ? (
            <p>Inscription en cours</p>
          ) : (
            <button>S'inscrire</button>
          )}
          <Link to="/login">
            <p className="form-part-end">
              Tu as Déja un compte? Connecte-toi !
            </p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
