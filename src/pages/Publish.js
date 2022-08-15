import { useState } from "react";
import { Navigate } from "react-router-dom";

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
  const [dataImg, setDataImg] = useState();
  const [prevu, setPrevu] = useState("");

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // creation formData
      const formData = new FormData();
      // ajouts de paires clefs valeurs a formData
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
        // requete vers le back avec en param body le formData
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          // transmition du token
          headers: {
            authorization: `Bearer ${token}`,
            // pour indiquer que l on envoi un formData
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("R >>> ", response.data);
      // reponse recue >>> mise a jour du state dataImg avec la secur url recue du back et de cloudinary
      setDataImg(response.data.product_image.secure_url);
    } catch (error) {
      console.log(error);
    }
  };
  // Si il y a un token
  return token ? (
    <div className="publish">
      <h3>Vends ton article</h3>
      <form className="form-publish" onSubmit={handleSubmit}>
        <div className="publish-photo">
          <input
            // on fait disparaitre l input et on met le style sur le label
            className="disapear"
            id="photo"
            type="file"
            onChange={(event) => {
              console.log("event >>>", event);
              setPhoto(event.target.files[0]);
              // appercu de l url des selection de la photo
              setPrevu(URL.createObjectURL(event.target.files[0]));
            }}
          />
          <label className="ajoute" htmlFor="photo">
            + Ajoute une photo
          </label>
          {/* si le state prevu existe on afficher la photo  */}
          {prevu && (
            <div>
              <img className="prevu" src={prevu} alt="offre postée" />
            </div>
          )}
        </div>

        <div className="publish-title">
          <div className="center center1">
            <label htmlFor="title">Titre</label>
            <input
              id="title"
              placeholder="ex: Chemise Jules"
              type="text"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>
          <div className="center center2">
            <label htmlFor="description">Descris ton article</label>
            <input
              placeholder="ex: Usure légère"
              id="description"
              type="text"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </div>
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
              placeholder="ex: Neuf"
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
          <div className="center center3">
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
          <input
            className="publish-price-checkbox"
            type="checkbox"
            id-="echange"
          />
          <label htmlFor="echange">
            <span>Je suis intéréssé par les échanges</span>
          </label>
        </div>
        <div className="publish-price-button">
          <button className="add">Ajouter</button>
        </div>
      </form>
      {dataImg && (
        <div className="answer">
          <p>Votre Offre est bien publiée</p>
          <img className="picture-publish" src={dataImg} alt="Offre Publiée" />
        </div>
      )}
    </div>
  ) : (
    // Si il n y a pas de token retour a la page login
    <Navigate to="/login" />
  );
};

export default Publish;
