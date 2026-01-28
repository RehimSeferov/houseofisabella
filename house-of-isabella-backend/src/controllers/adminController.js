const Product = require("../models/Product");
const Order = require("../models/Order");

exports.getDashboardStats = async (req, res) => {
  try {
    console.log("Real statistika hesablanır...");
    const productCount = await Product.countDocuments();
    const orderCount = await Order.countDocuments();
    const totalSalesData = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$totalPrice" },
        },
      },
    ]);

    const totalSales = totalSalesData.length > 0 ? totalSalesData[0].total : 0;

    res.status(200).json({
      success: true,
      stats: {
        totalProducts: productCount || 0,
        totalOrders: orderCount || 0,
        totalUsers: 0, 
        totalSales: totalSales || 0,
      },
    });
  } catch (error) {
    console.error("Database Xətası:", error);
    res.status(500).json({ message: "Hesablama xətası", error: error.message });
  }
};
