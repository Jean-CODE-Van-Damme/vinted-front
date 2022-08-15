import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ token, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      // En chargement lors de la requete
      setIsLoading(true);
      // Requete vers le back pour la connexion
      const response = await axios.post(
        " https://lereacteur-vinted-api.herokuapp.com/user/login",
        { email: email, password: password }
      );

      // Creation d un cookie qui  a pour value le token contenu dans la reponse du back
      Cookies.set("cookie", response.data.token, {
        expires: 10,
      });
      // Mise a jour du state token avec le cookie cree
      setToken(
        Cookies.set("cookie", response.data.token, {
          expires: 10,
        })
      );
      // Si tout est ok : connexion et token, nav vers la page Home
      navigate("/");
    } catch (error) {
      console.log(error.response);
    }
    // Fin du chargement lie a la requete
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
          {/* Si chargement de la requete en cours  */}
          {isLoading ? (
            <p>Connexion en cours</p>
          ) : (
            // Si chargement de la reque termine
            <button>Se connecter</button>
          )}
          {/* Lien vers la page signup si le client n a pas encore de compte  */}
          <Link to="/signup">
            <p className="login-form-p">Pas encore de compte ? Inscris-toi !</p>
          </Link>
          {/* En l abscence de token : message client pour se connecter  */}
          {!token && (
            <p>Merci de vous connecter pour voir les offres ou en publier</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
