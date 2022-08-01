import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./components/Header";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useState } from "react";
import Cookies from "js-cookie";

function App() {
  const [token, setToken] = useState(Cookies.get("cookie") || null);

  return (
    <div>
      <div>
        <Router>
          <Header token={token} setToken={setToken} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={<Login token={token} setToken={setToken} />}
            />
            <Route
              path="/signup"
              element={<Signup token={token} setToken={setToken} />}
            />
            <Route path="/offers/:id" element={<Offer />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
