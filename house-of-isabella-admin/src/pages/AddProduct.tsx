import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct, uploadImage } from "../services/productService";
import "./AddProduct.scss";

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); 


  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "furniture",
    brand: "",
    description: "",
    inStock: true,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);


  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imagePath = "";

      if (imageFile) {
        console.log("Şəkil yüklənir...");
        const uploadData = await uploadImage(imageFile);

        console.log("Backend-dən gələn şəkil cavabı:", uploadData);

        if (uploadData && uploadData.imageUrl) {
          imagePath = uploadData.imageUrl;
        } else if (typeof uploadData === "string") {
          imagePath = uploadData;
        } else {
          console.warn(
            "Şəkil yolu tapılmadı, cavab formatı fərqlidir:",
            uploadData
          );
        }
      }


      const newProduct = {
        ...product,
        image: imagePath, 
      };

      console.log("Göndərilən məhsul:", newProduct);

      await addProduct(newProduct);
      alert("Product added successfully!");
      navigate("/products");
    } catch (error: any) {
      console.error("Xəta baş verdi:", error);

      if (error.response && error.response.status === 404) {
        alert(
          "Xəta (404): Backend-də POST routu tapılmadı. productRoutes.js faylını yoxlayın."
        );
      } else {
        alert("Xəta: Məhsul əlavə edilə bilmədi.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-page">
      <h2>Add New Product</h2>
      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Product Name</label>
            <input type="text" name="name" required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Brand</label>
            <input type="text" name="brand" onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Price (£)</label>
            <input
              type="number"
              name="price"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select name="category" onChange={handleChange}>
              <option value="furniture">Furniture</option>
              <option value="lighting">Lighting</option>
              <option value="accessories">Accessories</option>
              <option value="mirrors">Mirrors</option>
              <option value="outdoor">Outdoor</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
          {imageFile && (
            <p style={{ fontSize: "12px", color: "green", marginTop: "5px" }}>
              Selected: {imageFile.name}
            </p>
          )}
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea name="description" onChange={handleChange}></textarea>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Processing..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
