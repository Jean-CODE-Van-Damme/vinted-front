import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./components/Header";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useState } from "react";
import Cookies from "js-cookie";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

function App() {
  const [token, setToken] = useState(Cookies.get("cookie") || null);
  const [title, setTitle] = useState("");
  const [box, setBox] = useState(true);
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  return (
    <div>
      <div>
        <Router>
          <Header
            token={token}
            setToken={setToken}
            setTitle={setTitle}
            priceMin={priceMin}
            priceMax={priceMax}
            setPriceMin={setPriceMin}
            setPriceMax={setPriceMax}
            page={page}
            setPage={setPage}
            limit={limit}
            setLimit={setLimit}
            box={box}
            setBox={setBox}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  title={title}
                  setTitle={setTitle}
                  priceMin={priceMin}
                  priceMax={priceMax}
                  setPriceMin={setPriceMin}
                  setPriceMax={setPriceMax}
                  page={page}
                  setPage={setPage}
                  limit={limit}
                  setLimit={setLimit}
                  box={box}
                  setBox={setBox}
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

            <Route path="/offers/:id" element={<Offer token={token} />} />

            <Route path="/publish" element={<Publish token={token} />} />

            <Route
              path="/payment"
              element={
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              }
            />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
