
import jwt from "jsonwebtoken";

function generateToken(id) {
  try {
    const token = jwt.sign(
      { id },
      process.env.JWT_TOKEN,
      {
        expiresIn: "7d",
      }
    );

    return token;

  } catch (error) {
    throw error;
  }
}

export default generateToken;
