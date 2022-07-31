import { useState } from "react";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  console.log("newsletter >>>", newsletter);

  let isChecked = false;

  return (
    <div>
      <h3>S'inscrire</h3>

      <form
        onSubmit={(event) => {
          event.preventDefault();
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
            checked={isChecked ? true : false}
            onChange={() => (isChecked = !isChecked)}
          />
          <label htmlFor="checkbox">S'inscrire à notre newsletter</label>
          <button>S'inscrire</button>
        </div>
      </form>

      <p>signup page</p>
    </div>
  );
};

export default Signup;
