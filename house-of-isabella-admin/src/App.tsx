import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProductList from "./pages/ProductList"; 
import AddProduct from "./pages/AddProduct"; 
import EditProduct from "./pages/EditProduct"; 
import Orders from "./pages/Orders";
function App() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div
        style={{
          flex: 1,
          marginLeft: "260px",
          padding: "40px",
          backgroundColor: "#f4f6f8",
          minHeight: "100vh",
        }}
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/new" element={<AddProduct />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/users" element={<h1>Users Page</h1>} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
