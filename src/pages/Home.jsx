import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "/src/home.css"


export default function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

useEffect(() => {
  axios.get("http://localhost:5005/products")
    .then((response) => {
      console.log("Produtos recebidos:", response.data);
      setProducts(response.data);
    })
    .catch((err) => {
      console.error("Error fetching products:", err);
    });
}, []);


  return (
    <div className="home-container">
      <h1 className="heading">Explore Our Handmade Products 🧵</h1>

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
                src={`http://localhost:5005${product.imageUrl}`}
                alt={product.name}
                className="product-image"
              />
              <h2 className="product-name">{product.name}</h2>
        <button className="pd-buy-btn" >
          🛒 Adicionar ao Carrinho
        </button>
              
            </div>
          ))
        )}
      </div>
    </div>
  );
}
