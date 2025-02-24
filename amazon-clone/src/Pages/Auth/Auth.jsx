import React from "react";
import styles from "./Auth.module.css";
import { Link } from "react-router-dom";
function Auth() {
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
            <input type="email" id="email" />
          </div>
          <div>
            <label htmlFor="password">Email</label>
            <input type="password" id="password" />
          </div>
          <button className={styles.signInButton}>Sign In</button>
        </form>
        <p>
          By signing in you are agree to the AMAZON FAKE CLONE Conditions of Use
          & Sale. PLease see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice
        </p>
        <button className={styles.registerButton}>
          Create your Amazon Account
        </button>
      </div>
    </section>
  );
}

export default Auth;
