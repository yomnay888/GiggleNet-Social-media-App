import bcrypt from 'bcrypt';
const saltRounds = 10;
import jwt from 'jsonwebtoken';
export const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password");
  }
};

export const comparePassword = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error("Error comparing password");
  }
};

export const generateToken = (payload) =>{
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });
}
// refresh token: 



export const verifyToken =  (token) =>{
  try {
      const decoded =  jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
  }catch(error) {
      console.error("Inside Verify Token: ", error);
      return null;
  }
}
  export const verifyUser = async (req, res, next) => {
    try{
    const token = req.cookies.token;
    if(!token){
      return res.status(401).json({error: "Unauthorized"});
    }
    const userData= verifyToken(token);
    if(!userData){
      return  res.status(401).json({error: "Unauthorized"});
    }
    req.userData = userData;
    console.log("Inside Verify User: ", req.userData);
    next();
  }catch(error){
   return res.status(401).json({message : error.message});
  }
}