import React, { useEffect, useState } from "react";
import { FiDollarSign, FiShoppingBag, FiBox, FiUsers } from "react-icons/fi";
import { getDashboardStats } from "../services/statsService"; 
import "./Dashboard.scss";

const Dashboard = () => {

  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Dashboard səhifəsi yükləndi...");
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      console.log("Statistika Backend-dən istənilir...");
      const data = await getDashboardStats();

      console.log("Backend-dən gələn cavab:", data); 

      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error("Statistika xətası:", error);
    } finally {
      setLoading(false);
    }
  };


  const statCards = [
    {
      title: "Total Sales",
      value: `£${stats.totalSales.toLocaleString()}`,
      icon: <FiDollarSign />,
      color: "#2e7d32",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: <FiShoppingBag />,
      color: "#1976d2",
    },
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: <FiBox />,
      color: "#ed6c02",
    },
    {
      title: "Customers",
      value: stats.totalUsers,
      icon: <FiUsers />,
      color: "#9c27b0",
    },
  ];

  if (loading) return <div style={{ padding: "40px" }}>Loading stats...</div>;

  return (
    <div className="admin-dashboard">
      <div className="page-header">
        <h2>Dashboard Overview</h2>
      </div>

      <div className="stats-grid">
        {statCards.map((item, index) => (
          <div key={index} className="stat-card">
            <div className="icon-box" style={{ backgroundColor: item.color }}>
              {item.icon}
            </div>
            <div className="info">
              <h3>{item.value}</h3>
              <p>{item.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="recent-section">
        <h3>System Status</h3>
        <p style={{ color: "green" }}>Backend connection is active.</p>
      </div>
    </div>
  );
};

export default Dashboard;
