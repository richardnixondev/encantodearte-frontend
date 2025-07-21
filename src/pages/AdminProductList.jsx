import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "/src/AdminProductList.css";

const apiUrl = import.meta.env.VITE_API_URL;

export default function AdminProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${apiUrl}/products`);
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`${apiUrl}/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts((prev) => prev.filter((p) => p._id !== productId));
    } catch (err) {
      console.error("Error deleting product", err);
    }
  };

  return (
    <div className="admin-product-list">
      <h2>Todos os Produtos</h2>
      <Link to="/products/new" className="create-button">+ Criar Novo Produto</Link>

      {products.length === 0 ? (
        <p>Nenhum produto cadastrado.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product._id} className="product-item">
              <div className="product-info">
                <strong>{product.name}</strong> - €{product.price.toFixed(2)}
              </div>
              <div className="product-actions">
                <button onClick={() => navigate(`/products/edit/${product._id}`)}>Editar</button>
                <button onClick={() => handleDelete(product._id)} style={{ background: "red", color: "white" }}>
                  Deletar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
