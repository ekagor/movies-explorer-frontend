import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useFormValidation from '../../hooks/useFormValidation';
import logo from '../../images/logo.svg';
import './Login.css';

const Login = ({logining}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {values, handleChange, resetForm, isValid, errors} = useFormValidation();

  function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    logining(values).finally(() => {
      setIsSubmitting(false);
    });
  }

  useEffect(() => {resetForm()}, [resetForm]);

  return (
    <main className="main">
      <section className="login">
        <form className="login__form" name="login" noValidate onSubmit={handleSubmit}>
          <Link to="/" className="login__link">
            <img src={logo} alt="Логотип" className="login__logo"/>
          </Link>
          <h1 className="login__title">Рады видеть!</h1>
          <div className="login__container">
            <label className="login__label">
              <span className="login__text">E-mail</span>
              <input name="email"
                type="email"
                className={`login__input ${errors.email && 'login__input_errors'}`}
                onChange={handleChange}
                value={values.email ?? ''}                
                required
                placeholder="Введите почту"
              />
              <span className="login__error">{errors.email ?? ''}</span>
            </label>
            <label className="login__label">
              <span className="login__text">Пароль</span>
              <input name="password"
                type="password"
                className={`login__input ${errors.password && 'login__input_errors'}`}
                onChange={handleChange}
                value={values.password ?? ''}                
                required
                minLength="5"
                maxLength="40"
                placeholder="Введите пароль"
              />
              <span className="login__error">{errors.password ?? ''}</span>
            </label>
          </div>
          <button type="submit" className="login__button" disabled={!isValid || isSubmitting}>Войти</button>
          <span className="login__tips">
            Ещё не зарегистрированы?&nbsp;
            <Link to="/signup" className="login__link">
              Регистрация
            </Link>
          </span>
        </form>
      </section>
    </main>
  );
};

export default Login;
