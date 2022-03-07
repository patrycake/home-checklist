import React, { useEffect, useState } from "react";
// import { Link, useHistory } from "react-router-dom";
import {
  registerWithEmailAndPassword,
  loginWithGoogle,
  useAuthState,
} from "../firebase";
function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  console.log(useAuthState());
  // const history = useHistory();

  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };

  // useEffect(() => {
  // if (loading) return;
  // if (user) history.replace("/dashboard");
  // }, [user, loading]);

  return (
    <div className="register container">
      <div className="block form-container">
        <h1 className="title">Sign Up</h1>
        <div className="field section box is-three-quarters">
          <div className="block">
            <label className="label">Full Name</label>
            <input
              type="text"
              className="input is-primary"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
            />
          </div>
          <div className="block">
            <label className="label">Email Address</label>
            <input
              type="text"
              className="input is-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail Address"
            />
          </div>
          <div className="block">
            <label className="label">Password</label>
            <input
              type="password"
              className="input is-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <div className="buttons block">
            <button className="button" onClick={register}>
              Register
            </button>
            <button className="button is-primary" onClick={loginWithGoogle}>
              Register with Google
            </button>
          </div>
        </div>
        <div>
          {/* Already have an account? <Link to="/">Login</Link> now. */}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
