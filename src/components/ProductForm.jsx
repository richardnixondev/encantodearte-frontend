import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '/src/ProductForm.css';

const apiUrl = import.meta.env.VITE_API_URL;

export default function ProductForm() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Other',
    price: '',
    stock: '',
    image: null
  });

  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const categories = [
    'Decor', 'Accessories', 'Textiles', 'Ceramics', 'Jewelry', 'Woodwork', 'Other'
  ];

  useEffect(() => {
    if (productId) {
      setIsEdit(true);
      axios.get(`${apiUrl}/products/${productId}`)
        .then((res) => {
          const { name, description, category, price, stock, imageUrl } = res.data;
          setFormData({ name, description, category, price, stock, image: null });
          setPreview(`${apiUrl}${imageUrl}`);
        })
        .catch(err => console.error("Error loading product", err));
    }
  }, [productId]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      for (const key in formData) {
        if (formData[key]) payload.append(key, formData[key]);
      }

      const token = localStorage.getItem('authToken');

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      };

      if (isEdit) {
        await axios.put(`${apiUrl}/products/${productId}`, Object.fromEntries(payload), config);
        setMessage('Product updated successfully!');
      } else {
        await axios.post(`${apiUrl}/products/`, payload, config);
        setMessage('Product created successfully!');
        setFormData({ name: '', description: '', category: 'Other', price: '', stock: '', image: null });
        setPreview(null);
      }
    } catch (err) {
      console.error(err);
      setMessage('Error saving product.');
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('authToken');
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${apiUrl}/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate("/");
    } catch (err) {
      console.error(err);
      setMessage("Error deleting product.");
    }
  };

  return (
    <div className="product-form-container">
      <h2>{isEdit ? 'Editar Produto' : 'Cadastrar novo produto'}</h2>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          step="0.01"
          min="0"
          required
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          min="0"
          required
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />

        {preview && (
          <div>
            <p>Image preview:</p>
            <img src={preview} alt="Preview" style={{ maxWidth: '200px' }} />
          </div>
        )}

        <button type="submit">{isEdit ? 'Atualizar' : 'Cadastrar'} Produto</button>
        {isEdit && (
          <button type="button" onClick={handleDelete} style={{ marginLeft: '1rem', background: 'red', color: 'white' }}>
            Delete Product
          </button>
        )}
      </form>
    </div>
  );
}
