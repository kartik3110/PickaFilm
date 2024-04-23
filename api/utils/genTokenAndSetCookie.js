// The actual response is sent only when a middleware calls the res.send(), res.json(),
// res.sendFile(), or another method that sends a response.

import jwt from "jsonwebtoken";
const genTokenAndSetCookie = (res, user) => {
  // console.log("user", user);
  var token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  //doesnt send. only modifies the res object
  res.cookie("token", token, {
    httpOnly: true, // make cookie unaccessible to client side js
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: "strict", // cookie is not sent along with requests initiated by third-party websites.
    secure: process.env.NODE_ENV === "production", // cookie will only be sent if website is accessed over HTTPS
  });
};

export default genTokenAndSetCookie;
