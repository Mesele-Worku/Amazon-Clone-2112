import React, { useContext, useState } from "react";
import styles from "./Auth.module.css";
import { Link } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [{ user }, dispatch] = useContext(DataContext);
  const authHandler = async (e) => {
    e.preventDefault();
    if (e.target.name == "signin") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
        })
        .catch((err) => console.log(err));
    } else {
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userInfo) => {
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <section className={styles.login}>
      <Link to="">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/603px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>
      <div className={styles.login_container}>
        <h1>Sign In</h1>
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Email</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button
            type="submit"
            name="signin"
            onClick={authHandler}
            className={styles.signInButton}
          >
            Sign In
          </button>
        </form>
        <p>
          By signing in you are agree to the AMAZON FAKE CLONE Conditions of Use
          & Sale. PLease see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice
        </p>
        <button
          type="submit"
          name="signup"
          onClick={authHandler}
          className={styles.registerButton}
        >
          Create your Amazon Account
        </button>
      </div>
    </section>
  );
}

export default Auth;
