import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [completed, setCompleted] = useState(false);

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
          title: "Veste Sandro",
          amount: 30,
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
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button>Valider</button>
      {completed && <p>Paiement effectué</p>}
    </form>
  );
};

export default Payment;
