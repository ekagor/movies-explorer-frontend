import './FilterCheckbox.css';

const FilterCheckbox = ({ isChecked, onChangeShort }) => {
  return (
    <>
      <label className="checkbox" htmlFor="checkbox">
        <input
          className="checkbox__input"
          type="checkbox"
          id="checkbox"
          name="checkbox"
          checked={isChecked}
          onChange={onChangeShort}
        />
        <span className="checkbox__inner">Короткометражки</span>
      </label>
    </>
  );
};

export default FilterCheckbox;
