import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";

const Signup = ({ token, setToken }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //   const navigate = useNavigate();

  //   console.log("newsletter >>>", newsletter);

  const fetchData = async () => {
    // console.log("body >>>", {
    //   email: email,
    //   username: userName,
    //   password: password,
    //   newsletter: newsletter,
    // });

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

      console.log("data >>>> ", response.data);
    } catch (error) {
      console.log(error.response);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <div>
        <h3>S'inscrire</h3>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            fetchData();

            // navigate("/");
          }}
        >
          <div className="form-part">
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              type="password"
              placeholder="Mot de Passe"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <input
              type="checkbox"
              id="checkbox"
              checked={newsletter}
              onChange={() => setNewsletter((prevState) => !prevState)}
            />
            <label htmlFor="checkbox">S'inscrire à notre newsletter</label>

            {isLoading ? (
              <p>Inscription en cours</p>
            ) : (
              <button>S'inscrire</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
