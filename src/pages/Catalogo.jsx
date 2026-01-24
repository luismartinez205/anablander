import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import Pagination from "../components/Pagination";
import "../App.css";

const Catalogo = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 6;

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div>
      <h2>Nuestro catalogo</h2>

      {products.length === 0 && <p>Cargando productos...</p>}

      <ProductList products={currentProducts} />

      <Pagination
        totalProducts={products.length}
        productsPerPage={productsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Catalogo;



