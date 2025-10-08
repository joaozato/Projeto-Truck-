import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Register from '/pages/register/register.jsx'
import Login from '/pages/login/login.jsx'
import PortfolioCard from '../pages/register/register'
import ListUsers from '../pages/list/list'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/list" element={<ListUsers />} />
      </Routes>
    
    </BrowserRouter>
    
  )
}

export default App
