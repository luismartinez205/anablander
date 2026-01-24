import { Link} from "react-router-dom";
import mujer from "../assets/mujeres.jpg"
import leon from "../assets/leo.png"
import calle from "../assets/arturo.png"
import adi from "../assets/adi.jpg"
import card from "../assets/card.webp"
import ImagenCard from "../components/ImagenCard";
const App = () => {
    return (
      <>
      <div className="container-home">
        <div className="cont-son">
        <h1>Disfruta tu Experiencia </h1>
        <h2 className="logo">Anablander</h2>
        <Link to="/productlist">
        <button type="button">Compra Ya</button>  
          </Link>
          <img src={card} alt="" />       
        </div>
         <img src={mujer} className="img-home" />                    
      </div>
      <div className="liner">        
      </div>
      <div className="parnert">
      <img src={leon} className="part-img" />
      <img src={adi} className="part-imgs"/>
      <img src={calle} className="part-img" /> 
      <h2>Recien llegada</h2>
      <ImagenCard/>               
      </div>
      </>
    );
  };
  
  export default App;
  