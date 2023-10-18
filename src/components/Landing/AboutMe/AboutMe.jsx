import { Link } from "react-router-dom"
import './AboutMe.css'
import photo from '../../../images/photo.png'
import Wrapper from "../../Wrapper/Wrapper"

export default function AboutMe() {
  return (
    <section className="aboutme page__aboutme">
      <Wrapper>
      <h2 className="about-me__title">Студент</h2>
        <div className="about-me__container">
          <div className="about-me__text-container">
            <h3 className="about-me__name">Виталий</h3>
            <p className="about-me__job">Фронтенд-разработчик, 30 лет</p>
            <p className="about-me__description">Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове,
              закончил факультет экономики СГУ. У&nbsp;меня есть жена
              и&nbsp;дочь. Я&nbsp;люблю слушать музыку, а&nbsp;ещё увлекаюсь бегом.
              Недавно начал кодить. С&nbsp;2015 года работал в&nbsp;компании &laquo;СКБ Контур&raquo;.
              После того, как прошёл курс по&nbsp;веб-разработке,
              начал заниматься фриланс-заказами и&nbsp;ушёл с&nbsp;постоянной работы.</p>
            <Link to={'https://github.com/ekagor'} target='_blank' className="about-me__link">Github</Link>
          </div>
          <img src={photo} alt="#" className="about-me__image" />
        </div>
      </Wrapper>
    </section>
  )
}
