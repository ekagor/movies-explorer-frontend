import MobileMenu from '../MobileMenu/MobileMenu';
import { NavLink, Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import './Navigation.css';

const Navigation = ({ isLoggedInto, logIn }) => {const isMobileMenu = useMediaQuery({ query: `(max-width: 767px)` });

  if (!isLoggedInto) {
    return (
      <nav className="nav">
        <Link to="/signup" className="nav__link">Регистрация</Link>
        <Link to="/signin" className="nav__link nav__link_type_active" onClick={logIn}>Войти</Link>
      </nav>
    );
  } else 
  if (isMobileMenu) {
    return <MobileMenu />;
  } else {
    return (
      <nav className="nav">
        <NavLink to="/movies" className="nav__link nav__link_type_movie">Фильмы</NavLink>
        <NavLink to="/saved-movies" className="nav__link nav__link_type_add-movie">Сохранённые фильмы</NavLink>
        <NavLink to="/profile" className="nav__link nav__link_type_log">Аккаунт</NavLink>
      </nav>
    );
  }
};

export default Navigation;