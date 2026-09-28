import Nav from '../../components/Nav.jsx'
import Footer from '../../components/Footer.jsx'
import Hero from './components/Hero.jsx'
import Schedule from './components/Schedule.jsx'
import Extra from './components/Extra.jsx'

function Home() {
	return <div className="app"><Nav /><main><Hero /><Schedule /><Extra /></main><Footer /></div>
}

export default Home
