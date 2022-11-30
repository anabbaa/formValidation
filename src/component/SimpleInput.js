import { useRef, useState } from 'react';
import useInput from '../hooks/use-input';
//useref to have value after finishing writing for another way is having value for every kexstroke
const SimpleInput = (props) => {
    //i will join both if entredvalue is valid with some condition and if touched with submit
  //even before conditions 
  // const [enteredName, setEnteredName] = useState('');
  // const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);
//here i shorened them to one state 
  //here by assigning to new variable i shortend some code so i don not need another state
  // const enteredNameIsValid = enteredName.trim() !== '';
  // const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  // const enteredEmailIsValid = enteredEmail.includes('@');
  // const enteredEmailIsInvalid = !enteredEmailIsValid && enteredEmailTouched;
//here addd it to button disabled so he cammot submit if ....

//hook
const {
  value: enteredName,
  isValid: enteredNameIsValid,
  hasError: nameInputHasError,
  valueChangeHandler: nameChangedHandler,
  inputBlurHandler: nameBlurHandler,
  reset: resetNameInput
} = useInput(value => value.trim() !== '');

const {
  value: enteredEmail,
  isValid: enteredEmailIsValid,
  hasError: emailInputHasError,
  valueChangeHandler: emailChangeHandler,
  inputBlurHandler: emailBlurHandler,
  reset: resetEmailInput,
} = useInput((value) => value.includes('@'));

let formIsValid = false;

if (enteredNameIsValid && enteredEmailIsValid) {
  formIsValid = true;
}

  // const nameInputChangeHandler = (event) => {
  //   setEnteredName(event.target.value);
  // };
  // const nameInputBlurHandler = event => {
    //here on blur i will be sure it is touched
  //   setEnteredNameTouched(true);
  // };
  

  // const emailInputChangeHandler = (event) => {
  //   setEnteredEmail(event.target.value);
  // };

  // const emailInputBlurHandler = (event) => {
  //   setEnteredEmailTouched(true);
  // };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!enteredNameIsValid) {
      return;
    }

       // nameInputRef.current.value = ''; => NOT IDEAL, DON'T MANIPULATE THE DOM let react 
    //makes manipulating
    // after submitting i need to empty values so i will back to origin form
    resetNameInput();
    resetEmailInput();
  };

  const nameInputClasses = nameInputHasError
  ? 'form-control invalid'
  : 'form-control';

const emailInputClasses = emailInputHasError
  ? 'form-control invalid'
  : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          onChange={nameChangedHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && (
          <p className='error-text'>Name must not be empty.</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='email'>Your E-Mail</label>
        <input
          type='email'
          id='email'
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {emailInputHasError && (
          <p className='error-text'>Please enter a valid email.</p>
        )}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );    
};

export default SimpleInput;