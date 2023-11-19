import useFormValidation from '../../hooks/useFormValidation';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';
import React, { useState, useEffect } from "react";

const SearchForm = ({ searchMovies, onShortChange, shortMovie, initialSearchValue = '' }) => {
  const { values, handleChange } = useFormValidation({ search: initialSearchValue });
  const [isQueryError, setisQueryError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const isInvalid = values.search.length === 0;
    setisQueryError(isInvalid);
    if (!isInvalid) searchMovies(values.search);
  };

  const changeShort = (event) => {
    onShortChange(event.target.checked);
  };

  return (
    <section className="search">
      <form className="search__form" name="search" onSubmit={handleSubmit}>
        <div className="search__container">
          <input className="search__input"
            type="text"
            name="search"            
            placeholder="Фильм"            
            value={values.search ? values.search : ''}
            autoComplete="off"
            onChange={handleChange}
          />
          <button className="search__button" type="submit"></button>
        </div>
        
        {isQueryError && (
        <span className="search__error_active">Введите ключевое слово</span>
      )}

        <FilterCheckbox isChecked={shortMovie} onChangeShort={changeShort} />
      </form>
    </section>
  );
};

export default SearchForm;