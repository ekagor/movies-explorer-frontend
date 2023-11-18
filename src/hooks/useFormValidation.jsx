import { useState, useCallback } from 'react';
  export function useFormValidation(initValues = {}) {
    const [values, setValues] = useState(initValues);
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);
  
    console.log(initValues)
  
    const handleChange = (evt) => {
      const target = evt.target;
      const { name, value} = target;
      if(initValues.name === value){
          setValues({ ...values, [name]: value });
          setIsValid(false);
      }else{
          setValues({ ...values, [name]: value });
          setIsValid(target.closest("form").checkValidity());
      }
  
      if(name === 'email'){
       if(initValues.email === value){
          setValues({ ...values, [name]: value });
          setIsValid(false);
      }else{
          setValues({ ...values, [name]: value });
          setIsValid(target.closest("form").checkValidity());
      }
      }
    };
  
    const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    }, []);
  return { values, errors, isValid, handleChange, resetForm, setIsValid };
};

export default useFormValidation;
