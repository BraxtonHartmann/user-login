import { useState, useEffect, useReducer } from "react";
import classes from "./Login.module.css";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.val,
      isValid: action.val.includes("@")
    }
  };

  if (action.type === "INPUT_BLUR") {
    return {
      value: state.value,
      isValid: state.value.includes("@")
    }
  }

  return {
    value: "",
    isValid: false
  }
}

const passwordReducer = (state, action) => {
  if(action.type === "USER_INPUT"){
    return{
      value: action.val,
      isValid: action.val.trim().length > 6
    }
  }
  if(action.type === "INPUT_BLUR"){
    return{
      value: state.value,
      isValid: state.value.trim().length > 6
    }
  }
  return{
    value: "",
    isValid: false
  }
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();

  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();

  const [formIsValid, setFormIsValid] = useState(false);

  // const[state, dispatch] = useReducer(reducer, initialArg)
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null
  });

  const {isValid: emailIsValid} = emailState;
  const {isValid: passwordIsValid} = passwordState;

  useEffect(() => {
    console.log(emailState);
  
    const timerID = setTimeout(() => {
      console.log(emailState.value);
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);
  
    return () => {
      console.log("Cleaning up");
      clearTimeout(timerID);
    };
  }, [emailIsValid, passwordIsValid]);


  const emailChangeHandler = (event) => {
    dispatchEmail({
      type: "USER_INPUT",
      val: event.target.value
    });
    // setEnteredEmail(event.target.value);
    // setFormIsValid(
    //   event.target.value.includes("@") && enteredPassword.trim().length > 6
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({
      type: "USER_INPUT",
      val: event.target.value
    })
    // setEnteredPassword(event.target.value);
    // setFormIsValid(
    //   event.target.value.trim().length > 6 && enteredEmail.includes("@")
    // );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes("@"));
    dispatchEmail({ type: "INPUT_BLUR" })
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({type: "INPUT_BLUR"})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <div className={classes.card}>
      <h2>Login</h2>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ""
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${passwordIsValid === false ? classes.invalid : ""
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <button
            type="submit"
            className={classes.btn}
            disabled={!formIsValid}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;