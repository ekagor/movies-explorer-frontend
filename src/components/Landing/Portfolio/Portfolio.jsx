import './Portfolio.css';

const Portfolio = () => {
  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h2 className="portfolio-title ">Портфолио</h2>
        <ul className="portfolio__list">
          <li className="portfolio__element">
            <a
              href="https://ekagor.github.io/how-to-learn/"
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio__subtitle"
            >
              Статичный сайт
            </a>
          </li>
          <li className="portfolio__element">
            <a
              href="https://ekagor.github.io/russian-travel/"
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio__subtitle"
            >
              Адаптивный сайт
            </a>
          </li>
          <li className="portfolio__element">
            <a
              href="https://ekagor.github.io/react-mesto-auth/"
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio__subtitle"
            >
              Одностраничное приложение
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Portfolio;
