import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import { getProducts, deleteProduct } from "../services/productService";
import "./ProductList.scss";

const ProductList = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await getProducts();
      console.log("Backend-dən gələn data:", result);

      if (result.products && Array.isArray(result.products)) {
        setProducts(result.products);
      } else if (Array.isArray(result)) {
        setProducts(result);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };


  const handleEdit = (id: string) => {
    navigate(`/products/edit/${id}`);
  };


  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);

        setProducts(products.filter((p) => p._id !== id));
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete product.");
      }
    }
  };

  if (loading) return <div style={{ padding: 40 }}>Loading products...</div>;

  return (
    <div className="product-list-page">
      <div className="page-header">
        <h2>All Products</h2>
        <Link to="/products/new" className="add-btn">
          <FiPlus style={{ marginRight: "5px", verticalAlign: "middle" }} />
          Add New Product
        </Link>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(products) && products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img
                      src={product.image || "https://via.placeholder.com/50"}
                      alt={product.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "4px",
                      }}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>£{product.price}</td>
                  <td>

                    <button
                      className="action-btn edit"
                      onClick={() => handleEdit(product._id)} 
                      style={{
                        marginRight: "10px",
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                        color: "#1976d2",
                        fontSize: "18px",
                      }}
                    >
                      <FiEdit />
                    </button>

                    <button
                      className="action-btn delete"
                      onClick={() => handleDelete(product._id)}
                      style={{
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                        color: "#d32f2f",
                        fontSize: "18px",
                      }}
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
