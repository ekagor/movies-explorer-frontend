import { useLocation } from 'react-router-dom'
import './MoviesCard.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function MoviesCard({ name, src, trailerLink }) {
  const { pathname } = useLocation()
  const [click, setClick] = useState(false)

  function onClick() {
    if (click) {
      setClick(false)
    } else {
      setClick(true)
    }
  }
  return (
    <li className='movies__card'>
      <article>
        <Link to={trailerLink} target='_blank'>
          <img src={src} alt="#" className='movies__image' />
        </Link>
        <div className='movies__card-group'>
          <div className='movies__text-group'>
            <h2 className='movies__subtitle'>{name}</h2>
            <span className='movies__duration'>1ч 42м</span>
          </div>
          {pathname === '/movies' ?
            <button type='button' className={`movies__save ${click ? 'movies__save_active' : ''}`} onClick={onClick}></button>
            :
            <button type='button' className={`movies__save movies__save_type_delete`} onClick={onClick}></button>
          }
        </div>
      </article>
    </li>
  )
}
