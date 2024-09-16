import authService from '../services/authService.js';
class authController{
    static async signUp(req, res) {
    const { username, firstname,lastname,email, password } = req.body;
    try {
      const name= firstname + " " + lastname;
      const newUser = await authService.signUp(username,name, email, password);
      res.status(201).json({ message: 'User registered successfully', user: newUser }); //should put the jwt
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async logIn(req, res) {
    const { email, password } = req.body;
    // console.log(email + " " + password);
    try {
      const loginData = await authService.logIn(email, password);
      console.log(loginData);

      // res.cookie('token', token, {httpOnly: true, secure: true, sameSite: 'none'});
      res.status(201).json({ message: 'User logged In successfully',loginData });
    } catch (error) {
      console.log("This is the catch block:" + error.message);
      res.status(400).json({ error: error.message });
    }
  }

  static async logOut(req,res){
    const userId = req.userId;
    const token = req.token;
    try{
    await authService.logOut(userId, token);
    }catch (error){
      res.status(400).json({ error: error.message });
    }
  }

}
export default authController;