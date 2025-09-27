import jwt from "jsonwebtoken";

const authSeller = (req, res, next) => {
  const { sellerToken } = req.cookies;

  if (!sellerToken) {
    return res.status(401).json({ success: false, message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);

    // Optional: check for allowed seller email
    if (decoded.email !== process.env.SELLER_EMAIL) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    // Attach seller info to request
    req.sellerId = decoded.id || decoded._id; // use whatever you store in token
    req.sellerEmail = decoded.email;

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

export default authSeller;
