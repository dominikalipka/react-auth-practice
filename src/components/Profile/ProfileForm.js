import classes from "./ProfileForm.module.css";
import { useRef, useContext } from "react";
import AuthContext from '../../store/auth-context'

const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext)

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    //validation can be added here

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBPY_0J4ORN5yQHX_Dt8oo7InjT5kRkLM8",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(res => {
      console.log(res)
    }).catch(err => console.log(err))
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input ref={newPasswordInputRef} minLength='7' type="password" id="new-password" />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
