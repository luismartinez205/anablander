import { useCart } from "../context/CardContext";
import "../App.css";
const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="card">
      <div className="card-img"><img src={product.image} width="120" /></div>
      
      <h3 className="card-title">{product.title}</h3>
      <p>${product.price}</p>

      <button onClick={() => addToCart(product)}>
        Agregar al carrito
      </button>
    </div>
  );
};

export default ProductCard;

  