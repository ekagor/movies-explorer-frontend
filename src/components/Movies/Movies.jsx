import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useCallback, useState } from "react";
import apiMovies from '../../utils/MoviesApi';
import { useEffect } from "react";

export default function Movies({ setIsError, addMovie, savedMovies }) {
  const [allMovies, setAllMovies] = useState([]) //все фильмы с сервера ЯП 100 шт
  const [filteredMovies, setFilteredMovies] = useState([]) //отсюда отрисовываются отфильтрованные фильмы
  const [searchedMovie, setSearchedMovie] = useState('') //строка из инпута поиска фильмов, кот вводит пользователь
  const [isCheck, setIsCheck] = useState(false) //переключение на выбор только короткометражек
  const [isLoading, setIsLoading] = useState(false) //лоудер на первый запрос по всем фильмам
  const [serverError, setServerError] = useState(false) // ошибка сервера при первом поиске
  const [firstEntrance, setFirstEntrance] = useState(true) //блокировка переключателя короткометражек при первом входе

  const filter = useCallback((search, isCheck, movies) => { //filter useCallback используется для useEffect чтоб не перерендеривать
    setSearchedMovie(search) //велью инпута
    localStorage.setItem('movie', JSON.stringify(search)) //search - то что ввели в инпут, преобразует в строку JSON, записывается в локалсторидж
    localStorage.setItem('shorts', JSON.stringify(isCheck)) //isCheck - булево знач (короткометражка или нет) превращается в строку
    localStorage.setItem('allmovies', JSON.stringify(movies)) //movies - массив всех фильмов преобразов в строку
    setFilteredMovies(movies.filter((movie) => {
      // если ищем короткометражки, то проверяем и имя и продолжительность, иначе только имя
      const searchName = movie.nameRU.toLowerCase().includes(search.toLowerCase())
      return isCheck ? (searchName && movie.duration <= 40) : searchName
    }))
  }, [])

  function searchMovies(search) {
    if (allMovies.length === 0) {
      setIsLoading(true)
      apiMovies.getMovies()
        .then((res) => {
          setAllMovies(res)
          setIsCheck(false)
          setServerError(false)
          setFirstEntrance(false)
          filter(search, isCheck, res)
        })
        .catch(err => {
          setServerError(true)
          console.error(`Ошибкак при поске фильмов ${err}`)
        })
        .finally(() => setIsLoading(false))
    } else {
      filter(search, isCheck, allMovies)
    }
  }

  useEffect(() => {
    if (localStorage.allmovies && localStorage.shorts && localStorage.movie) {
      const movies = JSON.parse(localStorage.allmovies)
      const search = JSON.parse(localStorage.movie)
      const isCheck = JSON.parse(localStorage.shorts)
      setServerError(false)
      setFirstEntrance(false)
      setSearchedMovie(search)
      setIsCheck(isCheck)
      setAllMovies(movies)
      filter(search, isCheck, movies)
    }
  }, [filter])

  function changeShort() {
    if (isCheck) {
      setIsCheck(false)
      filter(searchedMovie, false, allMovies)
      localStorage.setItem('shorts', JSON.stringify(false))
    } else {
      setIsCheck(true)
      filter(searchedMovie, true, allMovies)
      localStorage.setItem('shorts', JSON.stringify(true))
    }
  }

  return (
    <>
      <SearchForm
        isCheck={isCheck}
        searchMovies={searchMovies}
        searchedMovie={searchedMovie}
        changeShort={changeShort}
        setIsError={setIsError}
        firstEntrance={firstEntrance}
      />
      <MoviesCardList
        movies={filteredMovies}
        addMovie={addMovie}
        savedMovies={savedMovies}
        isLoading={isLoading}
        serverError={serverError}
        firstEntrance={firstEntrance}
      />
    </>
  )
}
