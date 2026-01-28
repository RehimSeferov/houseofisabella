const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);


const categoryRoutes = require("./routes/categoryRoutes");
app.use("/api/categories", categoryRoutes);

const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);
const uploadRoutes = require("./routes/uploadRoutes");
app.use("/api/upload", uploadRoutes);
const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/", (req, res) => {
  res.json({ message: "House of Isabella API işləyir... 🚀" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server işləyir... Port: ${PORT}`);
});
