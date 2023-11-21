import './Techs.css';

const Techs = () => {
  return (
    <section className="techs">
      <div className="techs__container">
        <h2 className="section-title">Технологии</h2>
        <div className="techs-info">
          <h3 className="techs__subtitle">7 технологий</h3>
          <p className="techs-info__article">
            На курсе веб-разработки мы освоили технологии, которые применили в
            дипломном проекте.
          </p>
          <ul className="techs__list">
            <li className="techs__list-item">
              <p
                className="techs__list"
              >
                HTML
              </p>
            </li>
            <li className="techs__list-item">
              <p
                className="techs__list"
              >
                CSS
              </p>
            </li>
            <li className="techs__list-item">
              <p
                className="techs__list"
              >
                JS
              </p>
            </li>
            <li className="techs__list-item">
              <p
                className="techs__list"
              >
                React
              </p>
            </li>
            <li className="techs__list-item">
              <p
                className="techs__list"
              >
                Git
              </p>
            </li>
            <li className="techs__list-item">
              <p
                className="techs__list"
              >
                Express.js
              </p>
            </li>
            <li className="techs__list-item">
              <p
                className="techs__list"
              >
                mongoDB
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Techs;
