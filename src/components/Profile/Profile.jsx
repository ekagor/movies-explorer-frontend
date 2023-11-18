import { useContext, useState } from 'react';
import useFormValidation from '../../hooks/useFormValidation';
import { useMoviesContext } from '../../contexts/MoviesContext';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './Profile.css';

export default function Profile({ loginingOut, updating }) {
  const currentUser = useContext(CurrentUserContext);
  const { cleanMoviesContext } = useMoviesContext();

  const handleLoginingOut = () => {loginingOut()
    cleanMoviesContext()
  };

  const { values, errors, handleChange, isValid } = useFormValidation({name: currentUser.name, email: currentUser.email,});
  const [isProfileChange, setIsProfileChange] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openProfileChange = (event) => {
    event.preventDefault();
    setIsProfileChange(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    updating(values)
      .then(() => {
        setIsProfileChange(false);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const validRequest = !isValid || (currentUser.name === values.name && currentUser.email === values.email);

  return (
    <main className="main">
      <section className="profile">
        <form className="profile__form" name="profile" noValidate onSubmit={handleSubmit}>
          <h1 className="profile__title">Привет, {currentUser.name}!</h1>
          <div className="profile__container">
            <label className="profile__label" type="name">
              <span className="profile__text">Имя</span>
              <input name="name"
                type="text"
                className={`profile__input ${errors.name && 'profile__input_errors'}`}
                onChange={handleChange}
                value={values.name}                
                required
                disabled={!isProfileChange}
                minLength="3"
                maxLength="40"
                pattern={'^[а-яА-Яa-zA-Z0-9]+$'}
                placeholder="Введите имя"
              />
            </label>
            <span className="profile__name-error">{errors.name ?? ''}</span>
            <label className="profile__label" type="email">
              <span className="profile__text">E-mail</span>
              <input name="email"
                type="email"
                className={`profile__input ${errors.email && 'profile__input_errors'}`}
                onChange={handleChange}
                value={values.email}
                disabled={!isProfileChange}                
                required
                placeholder="Введите почту"
              />
            </label>
            <span className="profile__error">{errors.email ?? ''}</span>
          </div>
          {!isProfileChange ? (
            <div className="profile__button-box">
              <button type="button" onClick={openProfileChange} className="profile__button-edit">Редактировать</button>
              <button type="button" className="profile__button-out" onClick={handleLoginingOut}>Выйти из аккаунта</button>
            </div>
          ) : (
            <div className="profile__button-box">
              <button type="submit" className="profile__button-add" disabled={validRequest || isSubmitting}>Сохранить</button>
            </div>
          )}
        </form>
      </section>
    </main>
  )
}
