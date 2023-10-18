import { useLocation } from 'react-router-dom'
import MoviesCard from '../MoviesCard/MoviesCard'
import './MoviesCardList.css'
import { useState } from 'react'
import Preloader from '../Preloader/Preloader'
export default function MoviesCardList({ movies, onDelete, addMovie, savedMovies, isLoading, serverError, firstEntrance }) {
  const { pathname } = useLocation()
  const [count, setCount] = useState(printCards().init)
  const fact = movies.slice(0, count)

/*printCards определяет объект counter, который содержит два свойства:
init: Начальное значение, которое будет использоваться для инициализации переменной count в useState.
step: Значение, на которое будет увеличиваться count при вызове clickMore().
Проверяет ширину окна браузера с помощью window.innerWidth.
Если ширина окна меньше 1023 пикселей, значения counter.init и counter.step изменяются на меньшие значения.
Это позволяет управлять количеством отображаемых карточек в зависимости от размера экрана.
Функция возвращает объект counter, который затем используется при инициализации состояния count в useState
и при увеличении count при клике на кнопку "Еще" (clickMore()).*/
  function printCards() {
    const counter = { init: 16, step: 4 }
    if (window.innerWidth < 1023) {
      counter.init = 8
      counter.step = 2
    }
    if (window.innerWidth < 650) {
      counter.init = 5
      counter.step = 2
    }
    return counter
  }
  function clickMore() {
    setCount(count + printCards().step)
  }

  return (
    <section className='movies page__movies'>
      <ul className='movies__lists'>
        {isLoading ? <Preloader /> :
          (pathname === '/movies' && fact.length !== 0) ?
            fact.map(data => {
              return (
                <MoviesCard
                  key={data.id}
                  savedMovies={savedMovies}
                  addMovie={addMovie}
                  data={data}
                />
              )
            }) : movies.length !== 0 ?
              movies.map(data => {
                return (
                  <MoviesCard
                    key={data._id}
                    onDelete={onDelete}
                    data={data}
                  />
                )
              }) : serverError ?
                <span className='movies__serch-error'>Соединение недоступно.
                  Подождите немного и попробуйте ещё раз
                </span>
                : !firstEntrance ?
                <span className='movies__serch-error'>Ничего не найдено</span>
                : pathname === '/movies' ?
                <span className='movies__serch-error'>Наберите поисковый запрос</span>
                :
                <span className='movies__serch-error'>Нет сохранённых фильмов</span>
        }
      </ul>
      {pathname === '/movies' && <button type='button' className={`movies__more ${count >= movies.length && 'movies__more_hidden'}`} onClick={clickMore}>Ёще</button>}
    </section>
  )
}
