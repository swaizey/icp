import './App.css'
import Home from './pages/Client/Home/Home.jsx'
import Register from './pages/Client/Register/Register.jsx'
import Member from './pages/Admin/Members/Member.jsx'
import Dashboard from './pages/Admin/Dashboard/Dashboard.jsx'
import MassSchedule from './pages/Admin/MassSchedule/MassSchedule.jsx'
import Sacraments from './pages/Admin/Sacraments/Sacraments.jsx'
import Reports from './pages/Admin/Reports/Reports.jsx'
import UserRole from './pages/Admin/UserRole/UserRole.jsx'
import SignIn from './pages/Admin/SignIn/SignIn.jsx'

function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'

  if (path === '/admin/sign-in' || path === '/admin/login') return <SignIn />
  if (['/admin', '/admin/dashboard'].includes(path)) return <Dashboard />
  if (path === '/admin/members') return <Member />
  if (path === '/admin/mass-schedule') return <MassSchedule />
  if (path === '/admin/sacraments') return <Sacraments />
  if (path === '/admin/reports') return <Reports />
  if (path === '/admin/user-roles') return <UserRole />
  if (path === '/register') return <Register />
  return <Home />
}

export default App
