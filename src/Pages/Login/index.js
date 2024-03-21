import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function Login() {
  const [data, setData] = useState({ userName: "", password: "" });
  const provider = new GoogleAuthProvider();
  function handleEvent(event) {
    setData({ ...data, [event.target.name]: event.target.value });
    console.log(data);
  }
  function handleSubmit() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, data.userName, data.password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        // ...
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // ..
      });
  }
  function handleSubmitSignUp() {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, data.userName, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // ..
      });
  }
  function googleSignIn() {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        alert(errorMessage);
      });
  }
  return (
    <div>
      <h1>Login</h1>

      <input name="userName" type="text" placeholder="Username" onChange={(event) => handleEvent(event)} />
      <input name="password" type="password" placeholder="Password" onChange={(event) => handleEvent(event)} />
      <div>
        <button onClick={handleSubmit}>Login</button>
      </div>
      <div>
        <button onClick={handleSubmitSignUp}>SignUp</button>
      </div>

      <div>
        <button onClick={googleSignIn}>Google Sign In</button>
      </div>
    </div>
  );
}

export default Login;
