import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthGuard from './AuthGuard'
import Header from './components/Header'
import Home from './pages/Home'
import Claims from './pages/Claims'
import WeatherForecast from './pages/WeatherForecast'
import './App.css'

function App() {
  return (
    <AuthGuard>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/claims" element={<Claims />} />
          <Route path="/weather" element={<WeatherForecast />} />
        </Routes>
      </Router>
    </AuthGuard>
  )
}

export default App
