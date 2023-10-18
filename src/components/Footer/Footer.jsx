import './Footer.css'
import { Link, useLocation } from 'react-router-dom'


export default function Footer() {

  const { pathname } = useLocation()

  return (
    <footer className={`footer${pathname === '/saved-movies' && 'page__footer_type_saved-movies'}`}>
      <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__container">
        <p className="footer__subtitle">© 2023</p>
        <nav className="footer__nav">
          <Link to={'https://practicum.yandex.ru/'} target='_blank' className="footer__link">Яндекс.Практикум</Link>
          <Link to={'https://github.com/ekagor'} target='_blank' className="footer__link">Github</Link>
        </nav>
      </div>
    </footer>
  )
}
