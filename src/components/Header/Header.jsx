
import Navigation from '../Navigation/Navigation';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../images/logo.svg';
import './Header.css';

const Header = ({ isLoggedInto }) => {const location = useLocation();

  return (
    <header
      className={`header header_theme_${location.pathname === '/' ? 'green' : 'dark'}`}
    >
      <div className="header__container">
        <Link to="/" className="header__link">
          <img className="header__logo" src={Logo} alt="Логотип"/>
        </Link>
        <Navigation isLoggedInto={isLoggedInto} />
      </div>
    </header>
  );
};

export default Header;
