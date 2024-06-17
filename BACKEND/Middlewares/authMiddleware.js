import jwt from 'jsonwebtoken'
import User from '../Models/userModel.js'

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        res.status(401).json({ message: "Session expired" });
      } else {
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

// export {protect};
// export default protect;
// isko sirf un jagah lgana hai jaha logged in hone ki jarurat hai 