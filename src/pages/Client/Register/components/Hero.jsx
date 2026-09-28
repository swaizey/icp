import styles from './styles.module.css'
import heroImage from '../../../../assets/images/Home/Hero.png'
import { FiUsers, FiUserCheck } from 'react-icons/fi'

function Hero() {
  return (
    <section className={styles.heroBanner} style={{ backgroundImage: `linear-gradient(90deg, rgba(3, 82, 166, .98) 0%, rgba(4, 103, 192, .83) 42%, rgba(5, 126, 204, .06) 82%), url(${heroImage})` }}>
      <div className={styles.heroContent}>
        <div className={styles.titleWrap}>
          <span className={styles.titleIcon}><FiUsers /></span>
          <div>
            <h1>Parishioner Registration</h1>
            <p>Join our parish family. Register today and be part of our faith community.</p>
          </div>
        </div>
        <div className={styles.decorText}>
          <FiUserCheck />
          <span>Together<br />in Christ</span>
        </div>
      </div>
    </section>
  )
}

export default Hero
