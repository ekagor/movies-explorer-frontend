import './AboutMe.css';
import avatar from '../../../images/photo.png';

const AboutMe = () => {
  return (
    <>
      <section className="about-me">
        <div className="about-me__container">
          <h2 className="about-project__title ">Студент</h2>
          <div className="about-me__box">
            <img
              className="about-me__image"
              src={avatar}
              alt="фото"
            ></img>
            <div className="about-me__box-info">
              <h3 className="about-me__name">Виталий</h3>
              <p className="about-me__job">Фронтенд-разработчик, 30 лет</p>
              <p className="about-me__description">
                Я родился и живу в Саратове, закончил факультет экономики СГУ. У
                меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
                бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
                Контур». После того, как прошёл курс по веб-разработке, начал
                заниматься фриланс-заказами и ушёл с постоянной работы.
              </p>
              <a
                href="https://github.com/ekagor"
                target="_blank"
                rel="noreferrer"
                className="about-me__link"
              >
                Github
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutMe;
