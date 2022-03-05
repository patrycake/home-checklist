import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, loginWithEmailAndPassword, loginWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (loading) {
  //     // maybe trigger a loading screen
  //     return;
  //   }
  //   if (user) navigate("/dashboard");
  // }, [user, loading]);
  return (
    <div className="login container">
      {/* <NavBar /> */}
      <div className="login-container">
        <h1 className="title">Login</h1>
        <div className="field section box is-three-quarters">
          <div className="block container">
            <label className="label">Email</label>
            <input
              className="input is-primary"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail Address"
            />
          </div>
          <div className="block container">
            <label className="label">Password</label>
            <input
              type="password"
              className="input is-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <div className="buttons">
            <button
              className="button"
              onClick={() => loginWithEmailAndPassword(email, password)}
            >
              Login
            </button>
            <button className="button is-primary" onClick={loginWithGoogle}>
              Login with Google
            </button>
          </div>
          <div className="block">
            <p>
              <Link to="/reset">Forgot Password</Link>
            </p>
            <p>
              Don't have an account? <Link to="/register">Register</Link> now.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
