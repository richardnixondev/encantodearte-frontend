import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "/src/ProductDetails.css";

const apiUrl = import.meta.env.VITE_API_URL;

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [cep, setCep] = useState("");

  useEffect(() => {
    axios.get(`${apiUrl}/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setMainImage(`${apiUrl}${res.data.imageUrl}`);
      });
  }, [id]);

  const handleQuantity = (type) => {
    setQuantity(q => Math.max(1, type === "plus" ? q + 1 : q - 1));
  };

  const addToCart = (product) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItemIndex = cart.findIndex(
    (item) => item.product._id === product._id
  );

  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Produto adicionado ao carrinho!");
};


  if (!product) return <p>Loading...</p>;

  return (
    <div className="pd-container">
      <div className="pd-images">
        <img src={mainImage} alt={product.name} className="pd-main-img" />
        <div className="pd-thumbnails">
          <img
            src={`${apiUrl}${product.imageUrl}`}
            alt="thumb"
            onClick={() => setMainImage(`${apiUrl}${product.imageUrl}`)}
          />
        
        </div>
      </div>

      <div className="pd-info">
        <h1>{product.name}</h1>
        <p className="pd-price">R$ {product.price.toFixed(2)}</p>
        <p>{product.description}</p>

        <div className="pd-quantity-box">
          <button onClick={() => handleQuantity("minus")}>–</button>
          <span>{quantity}</span>
          <button onClick={() => handleQuantity("plus")}>+</button>
        </div>

       
        <button className="pd-buy-btn" onClick={() => addToCart(product)}>
          🛒 Adicionar ao Carrinho
        </button>

        <div className="pd-shipping">
          <label>Frete e prazo de entrega</label>
          <div className="pd-cep-box">
            <input
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              placeholder="Informe seu CEP"
            />
            <button>CALCULAR</button>
          </div>
        </div>
      </div>
    </div>
  );
}
