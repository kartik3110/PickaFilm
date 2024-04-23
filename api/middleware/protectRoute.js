import jwt from "jsonwebtoken";
import ExpressError from "../utils/ExpressError.js";
import User from "../models/User.model.js";
export default async function protectRoute(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return next(new ExpressError(401, "Unauthorised: No token provided"));
  }

  const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decodedPayload);
  const { userId } = decodedPayload;

  if (!userId) {
    return next(new ExpressError(401, "Unauthorised: Invalid Token"));
  }

  const foundUser = await User.findById(userId).select("-password");

  if (!foundUser) {
    return next(new ExpressError(401, "User does not exist"));
  }

  req.user = foundUser;

  next();
}
