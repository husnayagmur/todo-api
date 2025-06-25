const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Header'dan token'ı al
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Yetkilendirme tokenı gerekli" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Token'ı doğrula
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // req.user içine kullanıcı bilgilerini koy
    req.user = decoded;

    next(); // Middleware'den sonra diğer işlemlere devam et
  } catch (error) {
    return res.status(401).json({ message: "Geçersiz token" });
  }
};

module.exports = authMiddleware;
