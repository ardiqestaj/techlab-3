import User from "./user.model.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  try {
    // const firstName = req.body.firstName
    // const lastName = req.body.lastName
    // const email = req.body.email
    // const password = req.body.password
    // const phoneNumber = req.body.phoneNumber
    // const identityCard = req.body.identityCard;

    const { firstName, lastName, email, password, phoneNumber, identityCard } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      identityCard,
    });

    await user.save();

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};
