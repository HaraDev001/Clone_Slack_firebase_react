import "./Login.css";
import { Button } from "@mui/material";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";

function Login() {
const [state, dispatch] = useStateValue();
const provider = new GoogleAuthProvider();
const auth = getAuth();
  const signIn = () => {
      signInWithPopup(auth,provider)
      .then((result) => {
        dispatch({
        type: actionTypes.SET_USER,
        user: result.user,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://cdn.brandfolder.io/5H442O3W/as/pl546j-7le8zk-ex8w65/Slack_RGB.svg"
          alt=""
        />
        <h1>Sign in to Slack Clone</h1>
        <p>https://github.com/JohannD2/</p>
        <Button onClick={signIn}>Sign In with Google</Button>
      </div>
    </div>
  );
}

export default Login;