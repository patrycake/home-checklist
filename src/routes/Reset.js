import React, { useEffect, useState } from "react";
import { useAuthState, sendPasswordReset } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Reset() {
  const [email, setEmail] = useState("");
  const { user, loading, error } = useAuthState();
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <div className="reset container">
      <div className="form-container block">
        <h1 className="title">Password Reset</h1>
        <div className="field section box">
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
          <button
            className="button is-primary"
            onClick={() => sendPasswordReset(email)}
          >
            Send password reset email
          </button>
          <div className="block container">
            Don't have an account? <Link to="/signup">Register</Link> now.
          </div>
        </div>
      </div>
    </div>
  );
}
export default Reset;
