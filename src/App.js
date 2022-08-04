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
  const [title, setTitle] = useState("");
  const [ascPrice, setAscPrice] = useState(false);
  const [desPrice, setDesPrice] = useState(false);
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  return (
    <div>
      <div>
        <Router>
          <Header
            token={token}
            setToken={setToken}
            setTitle={setTitle}
            ascPrice={ascPrice}
            setAscPrice={setAscPrice}
            desPrice={desPrice}
            setDesPrice={setDesPrice}
            priceMin={priceMin}
            priceMax={priceMax}
            setPriceMin={setPriceMin}
            setPriceMax={setPriceMax}
            page={page}
            setPage={setPage}
            limit={limit}
            setLimit={setLimit}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  title={title}
                  setTitle={setTitle}
                  ascPrice={ascPrice}
                  setAscPrice={setAscPrice}
                  desPrice={desPrice}
                  setDesPrice={setDesPrice}
                  priceMin={priceMin}
                  priceMax={priceMax}
                  setPriceMin={setPriceMin}
                  setPriceMax={setPriceMax}
                  page={page}
                  setPage={setPage}
                  limit={limit}
                  setLimit={setLimit}
                />
              }
            />
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
