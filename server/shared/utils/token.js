import jwt from "jsonwebtoken";
export const generateToken = (email) => {
  const token = jwt.sign({ email: email }, "THISISSCERET", {
    expiresIn: "7d",
  });

  return token;
};
export const verifyToken = (token) => {
  try {

    return jwt.verify(token, "THISISSCERET");
    
  } catch (err) {
    console.log(err);
    return false;
  }
};
