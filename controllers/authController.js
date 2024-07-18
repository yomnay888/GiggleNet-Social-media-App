import authService from '../services/authService.js';
class authController{
    static async signUp(req, res) {
    const { username, email, password } = req.body;
    try {
      const newUser = await authService.signUp(username, email, password);
      res.status(201).json({ message: 'User registered successfully', user: newUser }); //should put the jwt
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async logIn(req, res) {
    const { email, password } = req.body;
    try {
      const user = await authService.logIn(email, password);
      res.status(201).json({ message: 'User logged In successfully', user: user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

}
export default authController;