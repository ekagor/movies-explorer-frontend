import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <h3 className="footer__title">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h3>
        <div className="footer__box">
          <p className="footer__data">© 2023</p>
          <ul className="footer__links">
            <li>
              <a href="https://practicum.yandex.ru/" className="footer__link" target="_blank" rel="noopener noreferrer">
                Яндекс.Практикум
              </a>
            </li>
            <li>
              <a href="https://github.com/ekagor" className="footer__link" target="_blank" rel="noopener noreferrer">
                Github
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
