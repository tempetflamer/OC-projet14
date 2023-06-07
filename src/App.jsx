import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.scss'
import Header from './components/Header/Header.jsx'
import Home from './pages/Home/Home.jsx'
import Error404 from './pages/Error404/Error404.jsx'
import Employees from './pages/Employees/Employees.jsx'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/employees" element={<Employees />}></Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  )
}

export default App
