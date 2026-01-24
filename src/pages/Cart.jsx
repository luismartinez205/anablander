import { useCart } from "../context/CardContext";
import { Link } from "react-router-dom";

function Carrito() {
  const { cart, removeFromCart } = useCart();

  if (cart.length === 0) {
    return <h2>Carrito vacío</h2>;
  }

  const grandTotal = cart.reduce(
    (acc, p) => acc + p.price * p.quantity,
    0
  );

  return (
    <div>
      <h1>Carrito</h1>

      <div className="carrito">
        {cart.map(p => (
          <div key={p.id} className="cart-item">
            <img src={p.image} alt={p.title} width="100" />

            <div>
              <h3>{p.title}</h3>
              <p>Cantidad: {p.quantity}</p>
              <p>Subtotal: ${(p.price * p.quantity).toFixed(2)}</p>

              <button onClick={() => removeFromCart(p.id)}>
                Eliminar
              </button>
            </div>
          </div>
        ))}

        <div className="carrito-dos">
          <h2>Gran Total: ${grandTotal.toFixed(2)}</h2>

          {/* 👉 SOLO NAVEGA */}
          <Link to="/checkout">
            <button>
              Ir al checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Carrito;


