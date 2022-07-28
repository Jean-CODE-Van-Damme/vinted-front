import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Offer = () => {
  const { id } = useParams();
  console.log("id >>>", id);
  // maper et afficher uniquement les element si l id est === a l id recu en params

  return (
    <>
      <p> Offers Page</p>
      <Link to="/"> Go to Home page </Link>
    </>
  );
};

export default Offer;
