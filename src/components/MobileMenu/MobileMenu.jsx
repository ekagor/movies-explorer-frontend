import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './MobileMenu.css';

const MobileMenu = () => {
const [isActive, setActive] = useState(false);
const { pathname } = useLocation()

const handleOpen = () => setActive(!isActive);
const handleClose = () => setActive(false);

return (
  <section className={`${!isActive ? 'mobile' : 'mobile mobile_type_active'}`}>
    <nav className={`${!isActive ? 'mobile__navigation' : 'mobile__navigation mobile__navigation_type_active'}`}>
      <div className="mobile__container">
        <button type="button" onClick={handleOpen} className={`${!isActive ? 'mobile__button' : 'mobile__button mobile__button_type_active'}`}>
          <span className={`${!isActive ? 'mobile__span' : 'mobile__span mobile__span_type_active'}`}></span>
        </button>
      </div>
      {isActive && (
        <>
          <ul className="mobile__links">
            <li>
              <NavLink to="/" onClick={handleClose} className={`mobile__nav ${pathname === '/' ? 'mobile__nav_active' : ''}`}>
                Главная
              </NavLink>
            </li>
            <li>
              <NavLink to="/movies" onClick={handleClose} className={`mobile__nav ${pathname === '/movies' ? 'mobile__nav_active' : ''}`}>
                Фильмы
              </NavLink>
            </li>
            <li>
              <NavLink to="/saved-movies" onClick={handleClose} className={`mobile__nav ${pathname === '/saved-movies' ? 'mobile__nav_active' : ''}`}>
                Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
          <div className="mobile__links_type_account">
            <NavLink to="/profile" onClick={handleClose} className={`mobile__nav mobile__nav_type_account ${pathname === '/profile' ? 'mobile__nav_active' : ''}`}>
              Аккаунт
              <div className="mobile__nav-log"></div>
            </NavLink>
          </div>
        </>
      )}
    </nav>
  </section>
)
}

export default MobileMenu;