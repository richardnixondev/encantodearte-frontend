import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "/src/home.css";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // fecth api
    fetch(`${apiUrl}/status`)
      .then((res) => res.json())
      .then((data) => console.log("API status:", data))
      .catch((err) => console.error("Error to call API :", err));

    // get all products
    axios
      .get(`${apiUrl}/products`)
      .then((response) => {
        console.log("Products received:", response.data);
        setProducts(response.data);
      })
      .catch((err) => {
        console.error("Error to find products:", err);
      });
  }, []);

  const handleAddToCart = () => {
    // Lógica futura para adicionar ao carrinho
  };

  return (
    <div className="home-container">
      <h1 className="heading">Explore Nossos Produtos feitos à mão 🧵</h1>

      <div className="products-grid">
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="product-card"
              onClick={() => navigate(`/products/${product._id}`)}
            >
              <p className="product-price">R$ {product.price.toFixed(2)}</p>
              <img
                src={`${apiUrl}${product.imageUrl}`}
                alt={product.name}
                className="product-image"
              />
              <h2 className="product-name">{product.name}</h2>
              <button className="pd-buy-btn" onClick={handleAddToCart}>
                Veja mais detalhes
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
