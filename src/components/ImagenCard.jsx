import "../App.css";
import moda1 from "../assets/moda1.webp"
import moda3 from "../assets/moda3.webp"
import moda4 from "../assets/moda4.jpg"
import moda5 from "../assets/moda5.jpg"
function ImageCard() {
  return (
    <div className="image-card">
    

      
        <img src={moda1}/>     
        <img src={moda3}/>
        <img src={moda4}/>
        <img src={moda5}/>
      
    </div>
  );
}

export default ImageCard;
