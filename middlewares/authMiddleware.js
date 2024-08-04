import bcrypt from 'bcrypt';
const saltRounds = 10;
import jwt from 'jsonwebtoken';
import SessionModel from '../models/sessionModel.js';

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
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

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
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
      return res.status(401).json({error: "Unauthorized"});
    }
    const token = authHeader.split(' ')[1];
    const userData= verifyToken(token);
    const session = SessionModel.getSessionByTokenAndUserId(token, userData.userId);
    if(!session || session.expired_at < new Date()){
      return  res.status(401).json({error: "Unauthorized"});
    }
    if(!userData){
      return  res.status(401).json({error: "Unauthorized"});
    }
    req.userData = userData;
    if(req.path === '/logout'){
      req.token = token;
    }
    next();
  }catch(error){
   return res.status(401).json({message : error.message});
  }
}