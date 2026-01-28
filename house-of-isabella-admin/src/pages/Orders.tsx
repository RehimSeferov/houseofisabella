import React, { useEffect, useState } from "react";
import {
  getOrders,
  updateOrderStatus,
  deleteOrder,
} from "../services/orderService";
import { FiTrash2, FiEye } from "react-icons/fi";
import "./ProductList.scss";

const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      if (data.orders && Array.isArray(data.orders)) {
        setOrders(data.orders);
      } else if (Array.isArray(data)) {
        setOrders(data);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Sifarişlər gəlmədi:", error);
    } finally {
      setLoading(false);
    }
  };


  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateOrderStatus(id, newStatus);
      alert(`Status changed to ${newStatus}`);
      fetchOrders();
    } catch (error) {
      alert("Statusu dəyişmək mümkün olmadı.");
    }
  };


  const handleDelete = async (id: string) => {
    if (window.confirm("Bu sifarişi silmək istədiyinizə əminsiniz?")) {
      try {
        await deleteOrder(id);
        setOrders(orders.filter((order) => order._id !== id));
      } catch (error) {
        alert("Silinmədi.");
      }
    }
  };

  if (loading) return <div style={{ padding: 40 }}>Loading orders...</div>;

  return (
    <div className="product-list-page">
      <div className="page-header">
        <h2>Customer Orders</h2>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id}>
                  <td>#{order._id.slice(-6).toUpperCase()}</td>
                  <td>
                    {order.user ? order.user.name : "Guest"}
                    <div style={{ fontSize: "12px", color: "#888" }}>
                      {order.user?.email}
                    </div>
                  </td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>£{order.totalPrice}</td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      style={{
                        padding: "5px",
                        borderRadius: "4px",
                        border: "1px solid #ddd",
                        backgroundColor:
                          order.status === "Delivered"
                            ? "#e8f5e9"
                            : order.status === "Cancelled"
                            ? "#ffebee"
                            : "#fff3e0",
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="action-btn delete"
                      onClick={() => handleDelete(order._id)}
                      style={{
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                        color: "#d32f2f",
                      }}
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
