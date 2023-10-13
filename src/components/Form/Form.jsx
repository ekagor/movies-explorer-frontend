import './Form.css'

export default function Form({ name, children, isValid, onSubmit }) {

  return (
    <form noValidate name={name} onSubmit={onSubmit}>
      {children}
      {name === 'signin' ?
        <>
          <span className='login__form-input-error'>{'При входе произошла ошибка.'}</span>
          <button
            type="submit"
            className={`login__submit ${isValid ? '' : 'login__submit_disabled'}`}
            disabled={!isValid}
          >{'Войти'}</button>
        </>
        :
        name === 'signup' ?
          <>
            <span className='login__form-input-error login__form-input-error_type_reg'>{'При регистрации произошла ошибка.'}</span>
            <button type="submit" className={`login__submit ${isValid ? '' : 'login__submit_disabled'}`}>{'Зарегистрироваться'}</button>
          </>
          :
          <>
            <span className='profile__form-input-error'>{'При обновлении профиля произошла ошибка.'}</span>
            <button type="submit" className='profile__submit'>{'Редактировать'}</button>
          </>
      }
    </form>
  )
}
