import { useState } from "react";

import axios from "axios";
const Publish = ({ token }) => {
  const [photo, setPhoto] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [wearRate, setWearRate] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("condition", wearRate);
      formData.append("city", city);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("picture", photo);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        { headers: { authorization: `Bearer ${token}` } }
      );
      console.log("response >>>", response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form className="form-publish" onSubmit={handleSubmit}>
        <div className="publish-photo">
          <input
            type="file"
            onChange={(event) => {
              console.log("event >>>", event);
              setPhoto(event.target.files[0]);
            }}
          />
        </div>
        <label htmlFor="title">Titre</label>
        <div>
          <input
            id="title"
            placeholder="ex: Chemise Sézane verte"
            type="text"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <label htmlFor="description">Description</label>
          <input
            placeholder="ex: Porté quelques fois"
            id="description"
            type="text"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </div>
        <div className="publish-center">
          <div className="center">
            <label htmlFor="brand">Marque</label>
            <input
              id="brand"
              placeholder="ex: Zara"
              type="text"
              value={brand}
              onChange={(event) => {
                setBrand(event.target.value);
              }}
            />
          </div>
          <div className="center">
            <label htmlFor="size">Taille</label>
            <input
              id="size"
              placeholder="ex: L/40/42"
              type="text"
              value={size}
              onChange={(event) => {
                setSize(event.target.value);
              }}
            />
          </div>
          <div className="center">
            <label htmlFor="color">Couleur</label>
            <input
              id="color"
              placeholder="ex: Fushia"
              type="text"
              value={color}
              onChange={(event) => {
                setColor(event.target.value);
              }}
            />
          </div>
          <div className="center">
            <label htmlFor="wearRate">Etat</label>
            <input
              id="wearRate"
              placeholder="ex: Neuf avec étiquette"
              type="text"
              value={wearRate}
              onChange={(event) => {
                setWearRate(event.target.value);
              }}
            />
          </div>
          <div className="center">
            <label htmlFor="city">Lieux</label>
            <input
              id="city"
              placeholder="ex: Paris"
              type="text"
              value={city}
              onChange={(event) => {
                setCity(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="publish-price">
          <label htmlFor="prix">Prix</label>
          <input
            id="prix"
            placeholder="ex: 30$"
            type="text"
            value={price}
            onChange={(event) => {
              setPrice(Number(event.target.value));
            }}
          />
        </div>
        <input type="checkbox" id-="echange" />
        <label htmlFor="echange">Je suis intéréssé par les échanges</label>

        <button>Ajouter</button>
      </form>
    </div>
  );
};

export default Publish;
