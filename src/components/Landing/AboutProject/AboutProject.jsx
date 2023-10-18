import Wrapper from '../../Wrapper/Wrapper'
import './AboutProject.css'


export default function AboutProject() {
  return (
    <section id={"aboutProject"} className="about-project about-project">
    <Wrapper>
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__container">
        <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
        <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
        <p className="about-project__description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        <p className="about-project__description">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </div>
      <div className="about-project__time-learn">
          <p className="about-project__progress about-project__progress_type_backend" >1 неделя</p>
          <p className="about-project__progress">4 недели</p>
          <span className="about-project__text">Back-end</span>
          <span className="about-project__text">Front-end</span>
      </div>
    </Wrapper>
  </section>
  )
}
