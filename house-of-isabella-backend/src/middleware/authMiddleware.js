const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next(); 
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "İcazəniz yoxdur, token səhvdir!" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "İcazəniz yoxdur, token tapılmadı!" });
  }
};

exports.admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Bu əməliyyat yalnız Adminlər üçündür!" });
  }
};
