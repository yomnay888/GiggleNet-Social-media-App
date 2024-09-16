import './App.css'
import LoginPage from './pages/loginPage/LoginPage'
import SignupPage from './pages/signupPage/SignupPage'
import HomePage from './pages/homePage/HomePage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
  <Router>  
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/signup" element={<SignupPage/>}/>
      <Route path='/home' element={<HomePage />} />
    </Routes> 
  </Router>
    </>
  )
}

export default App