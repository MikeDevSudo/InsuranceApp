import { useState, useRef, useContext } from 'react'; 
import { useHistory } from 'react-router-dom';

import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';

const AUTH_URL = "https://api.bybits.co.uk/auth/token"

const AuthForm = () => {
  const history = useHistory();
  const userInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext); 
  
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredUsername = userInputRef.current.value; 
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);

    fetch(AUTH_URL, {
      method: 'POST',
      body: JSON.stringify({
        Username: enteredUsername,
        password: enteredPassword,
        type:"USER_PASSWORD_AUTH"
      }),
      headers: {
        'Content-Type': 'application/json',
        'environment': 'mock'
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication failed!';
            throw new Error(errorMessage);
          });
        }
      }) 
      .then((data) => {
          authCtx.login(data.access_token);
          history.replace('/MyPolicy');
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{'Sign In'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='Username'>Your Username</label>
          <input type='text' id='Username' required ref={userInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{'Login'}</button>
          )}
          {isLoading && <p>Sending request...</p>}

        </div>
      </form>
    </section>
  );
};

export default AuthForm;
