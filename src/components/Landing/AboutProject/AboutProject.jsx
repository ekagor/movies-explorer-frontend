import './AboutProject.css';

const AboutProject = () => {
  return (
    <>
      <section className="about-project">
        <a href="#about-project" name="about-project"> </a>
        <div className="about-project__container">
          <h2 className="about-project__title ">О проекте</h2>
          <div className="about-project-info">
            <article className="two-columns">
              <h3 className="about-project__subtitle">
                Дипломный проект включал 5 этапов
              </h3>
              <p className="about-project__description">
                Составление плана, работу над бэкендом, вёрстку, добавление
                функциональности и финальные доработки.
              </p>
            </article>
            <article className="two-columns">
              <h3 className="about-project__subtitle">
                На выполнение диплома ушло 5 недель
              </h3>
              <p className="about-project__description">
                У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
                соблюдать, чтобы успешно защититься.
              </p>
            </article>
          </div>
          <div className="about-project__scheme">
            <div className="about-project__backend">
              <span className="about-project__progress about-project__progress_type_backend">1 неделя</span>
              <span className="about-project__text">Back-end</span>
            </div>
            <div className="about-project__frontend">
              <span className="about-project__progress">4 недели</span>
              <span className="about-project__text">Front-end</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutProject;