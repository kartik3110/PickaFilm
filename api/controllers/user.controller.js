import User from "../models/User.model.js";

const userController = {
  getUser: async (req, res) => {
    const { _id: senderId } = req.user;

    const foundUser = await User.findOne({ _id: senderId }).select("-password");
    // console.log("foundUser: ", foundUser);
    res.status(200).json(foundUser);
  },
};

export default userController;
