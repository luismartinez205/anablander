import { useCart } from "../context/CardContext";
import { Link } from "react-router-dom";
import { useState } from "react";

function Checkout() {
  const { cart } = useCart();

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: ""
  });

  if (cart.length === 0) {
    return (
      <div>
        <h2>No hay productos en el carrito</h2>
        <Link to="/productlist">Volver al catálogo</Link>
      </div>
    );
  }

  const total = cart.reduce(
    (acc, p) => acc + p.price * p.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      {/* RESUMEN */}
      <div className="checkout-resumen">
        <h2>Resumen del pedido</h2>

        {cart.map(p => (
          <div key={p.id} className="checkout-item">
            <span>{p.title}</span>
            <span>
              {p.quantity} × ${p.price}
            </span>
          </div>
        ))}

        <h3>Total: ${total.toFixed(2)}</h3>
      </div>

      {/* FORMULARIO */}
      <div className="checkout-form">
        <h2>Datos del cliente</h2>

        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo"
          value={form.nombre}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="tel"
          name="telefono"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={handleChange}
        />
      </div>

      {/* CONTINUAR */}
      <Link to="/payment">
        <button disabled={!form.nombre || !form.email} >
          Continuar al pago
        </button>
      </Link>
    </div>
  );
}

export default Checkout;
