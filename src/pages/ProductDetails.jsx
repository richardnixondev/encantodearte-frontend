import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "/src/ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [cep, setCep] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5005/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setMainImage(`http://localhost:5005${res.data.imageUrl}`);
      });
  }, [id]);

  const handleQuantity = (type) => {
    setQuantity(q => Math.max(1, type === "plus" ? q + 1 : q - 1));
  };

  const handleAddToCart = () => {
  
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="pd-container">
      <div className="pd-images">
        <img src={mainImage} alt={product.name} className="pd-main-img" />
        <div className="pd-thumbnails">
          <img
            src={`http://localhost:5005${product.imageUrl}`}
            alt="thumb"
            onClick={() => setMainImage(`http://localhost:5005${product.imageUrl}`)}
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

        <button className="pd-buy-btn" onClick={handleAddToCart}>
          🛒 Comprar
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
