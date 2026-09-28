import Nav from '../../components/Nav.jsx'
import Footer from '../../components/Footer.jsx'
import Form from './components/Form.jsx'
import Hero from './components/Hero.jsx'

function Register() {
  return (
    <div className="app">
      <Nav />
      <main>
        <Hero />
        <Form />
      </main>
      <Footer />
    </div>
  )
}

export default Register
