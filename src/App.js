import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./components/Header";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  // console.log("data >>>> ", data);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Chargement</p>
      ) : (
        <div>
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Home offersArray={data.offers} />} />
              <Route path="/offers/:id" element={<Offer />} />
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
