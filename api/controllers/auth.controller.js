import User from "../models/User.model.js";
import bcryptjs from "bcryptjs";
import ExpressError from "../utils/ExpressError.js";
import genTokenAndSetCookie from "../utils/genTokenAndSetCookie.js";

const authController = {
  signUp: async (req, res, next) => {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return next(new ExpressError(400, "All fields are required"));
    }

    //check for existing user
    const foundUser = await User.findOne({ email: email });
    if (foundUser) {
      return next(new ExpressError(400, "Account with email already exists"));
    }

    //hash the password
    const hash = bcryptjs.hashSync(password, 12);

    //add proile pic
    const profilePic = `https://avatar.iran.liara.run/username?username=${username}`;

    //create new user
    const newUser = new User({
      email,
      username,
      password: hash,
      profilePic,
    });
    try {
      //generate token and set cookie to the response
      genTokenAndSetCookie(res, newUser);
      //save user to db
      const savedUser = await newUser.save();

      // Remove the password field from the user object
      const userWithoutPassword = savedUser.toObject();
      delete userWithoutPassword.password;

      res.status(201).json({ success: true, user: userWithoutPassword });
    } catch (err) {
      return next(new ExpressError(500, err.message));
    }
  },

  signIn: async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ExpressError(400, "All fields are required"));
    }
    const foundUser = await User.findOne({ email: email });
    if (!foundUser) {
      return next(new ExpressError(400, "user not found"));
    }
    const isPasswordValid = bcryptjs.compareSync(password, foundUser.password);
    if (!isPasswordValid) {
      return next(new ExpressError(400, "Invalid password"));
    }

    genTokenAndSetCookie(res, foundUser);

    // Remove the password field from the user object
    const userWithoutPassword = foundUser.toObject();
    delete userWithoutPassword.password;

    res.status(200).json({ success: true, user: userWithoutPassword });
  },
  signOut: (req, res) => {
    // set jwt cookie to none
    console.log("signing out");
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ message: "signed out successfully" });
  },
};

export default authController;
