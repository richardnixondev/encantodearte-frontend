import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Signup from "./pages/Signup";
import MyOrders from "./pages/MyOrders";
import AdminOrders from "./pages/AdminOrders";
import ProductForm from "./components/ProductForm";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/orders/me" element={<MyOrders />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/create-product" element={<ProductForm />} />
        <Route path="/products/new" element={<ProductForm />} />
        <Route path="/products/edit/:productId" element={<ProductForm isEdit={true} />} />
      </Routes>
    </>
  );
}

export default App;
