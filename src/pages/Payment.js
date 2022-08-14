import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const title = location.state.title;
  const price = location.state.price;
  // on peut destructurer comme ca
  // const {title} = location.state
  // const {price} = location.state
  const stripe = useStripe();
  const elements = useElements();
  const [completed, setCompleted] = useState(false);
  const feesProtection = 0.4;
  const feesTransport = 0.8;
  const total = price + feesProtection + feesTransport;
  const totalFixed = total.toFixed(2);
  // console.log("Location >>>", location);
  // console.log("title >>>", title);
  // console.log("price >>>", price);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const cardElement = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElement, {
        name: "id de l'acheteur",
      });

      console.log("stripeResponse >>>", stripeResponse);
      const stripeToken = stripeResponse.token.id;
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          token: stripeToken,
          title: title,
          amount: price,
        }
      );

      if (response.data.status === "succeeded") {
        setCompleted(true);
      }

      console.log("response du back >>>", response);
      console.log("status >>>", response.data.status);
      console.log("stripeToken >>>", stripeToken);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="payment">
      {completed ? (
        <p className="pay-ok">Paiement effectué</p>
      ) : (
        <form className="payment-form" onSubmit={handleSubmit}>
          <h5>Résumé de la commande</h5>
          <div className="commande">
            <div className="pay-com">
              <span>Commande</span>
              <span>{price} $</span>
            </div>
            <div className="pay-com">
              <span>Frais protection acheteurs</span>
              <span>{feesProtection} $</span>
            </div>
            <div className="pay-com">
              <span>Frais de port</span>
              <span>{feesTransport} $</span>
            </div>
          </div>
          <div className="pay-com-total">
            <span>Total</span>
            <span>{totalFixed} $</span>
          </div>
          <div>
            <p className="pay-p">
              Il ne vous reste plus qu'une étape pour vous offir{" "}
              <span className="bold">{title}</span>. Vous allez payer{" "}
              <span className="bold">{price}</span> $ . Frais de protection et
              frais de port inclus
            </p>
          </div>
          <div className="card">
            <CardElement />
          </div>
          <button>Payer</button>
          {/* {completed && <p className="pay-ok">Paiement effectué</p>} */}
        </form>
      )}
    </div>
  );
};

export default Payment;
