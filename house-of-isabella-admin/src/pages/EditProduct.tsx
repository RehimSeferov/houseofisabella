import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiSave, FiImage } from "react-icons/fi";
import { getProductById, updateProduct } from "../services/productService";
import "./EditProduct.scss";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      getProductById(id)
        .then((res) => {
          setForm({
            name: res.name || "",
            price: res.price || "",
            category: res.category || "",
            image: res.image || "",
          });
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.category) {
      setError("Please fill all required fields");
      return;
    }

    setError("");
    setSaving(true);

    try {
      await updateProduct(id!, form);
      navigate("/products");
    } catch {
      setError("Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="edit-loading">Loading product...</div>;

  return (
    <div className="edit-page">
      <div className="edit-card">
        <h2>Edit Product</h2>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Luxury Necklace"
            />
          </div>

          <div className="form-group">
            <label>Price (£)</label>
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              type="number"
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Image URL</label>
            <div className="image-input">
              <FiImage />
              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>
          </div>

          {form.image && (
            <div className="image-preview">
              <img src={form.image} alt="preview" />
            </div>
          )}

          <button type="submit" disabled={saving}>
            <FiSave />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
