import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ token, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState("false");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        " https://lereacteur-vinted-api.herokuapp.com/user/login",
        { email: email, password: password }
      );

      console.log("token connexion >>>", response.data.token);
      console.log("data >>>> ", response.data);

      Cookies.set("cookie", response.data.token, {
        expires: 10,
      });

      setToken(
        Cookies.set("cookie", response.data.token, {
          expires: 10,
        })
      );
      navigate("/");
    } catch (error) {
      console.log(error.response);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <h3>Se connecter</h3>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          fetchData();
        }}
      >
        <div className="login-form">
          <input
            className="login-input"
            type="text"
            placeholder="Adresse Mail"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />

          <input
            className="login-input"
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {/* {isLoading ? (
            <p>Connexion en cours</p>
          ) : (
            <button>Se connecter</button>
          )} */}
          <button>Se connecter</button>
          <Link to="/signup">
            <p className="login-form-p">Pas encore de compte ? Inscris-toi !</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
