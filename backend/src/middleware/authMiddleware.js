// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "Unauthorized" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch {
//     res.status(401).json({ message: "Token invalid" });
//   }
// };

// module.exports = authMiddleware;
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ message: 'Accès refusé : token manquant' });

  const token = authHeader.split(' ')[1]; // Bearer token

  if (!token)
    return res.status(401).json({ message: 'Accès refusé : token invalide' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // stocke id et role du user dans req.user
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalide ou expiré' });
  }
};
