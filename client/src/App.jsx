import './App.css'
import LoginPage from './pages/loginPage/LoginPage'
import SignupPage from './pages/signupPage/SignupPage'
import HomePage from './pages/homePage/HomePage'
import ProfilePage from './pages/profilePage/ProfilePage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
  <Router>  
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/signup" element={<SignupPage/>}/>
      <Route path='/home' element={<HomePage />} />
      <Route path='/profile/:userId' element={<ProfilePage/>} />
    </Routes> 
  </Router>
    </>
  )
}

export default App