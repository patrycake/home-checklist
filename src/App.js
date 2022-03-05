import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import { Navbar, Button } from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { logout, auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function App() {
  //   const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const state = useLocation();
  //   useEffect(() => {
  //     if (loading) {
  //       // maybe trigger a loading screen
  //       return;
  //     }
  //     if (user) navigate("/dashboard");
  //   }, [user, loading]);

  useEffect(() => {
    if (state === null || state === undefined) {
      navigate("/");
    }
  });

  return (
    <div className="app">
      <nav className="navbar" role="navigation">
        <div className="navbar-brand" onClick={navigate("/")}>
          <Navbar.Item renderAs={Link} to="/">
            <FontAwesomeIcon icon={faHouseChimney} color="#d99c02" size="2x" />
          </Navbar.Item>
          <Navbar.Burger />
        </div>
        <Navbar.Menu>
          <Navbar.Container>
            <Navbar.Item href="#">First</Navbar.Item>
            <Navbar.Item href="#">Second</Navbar.Item>
          </Navbar.Container>
          <Navbar.Container align="end">
            <Navbar.Item href="#">
              <Button onClick={logout}>Log Off </Button>
            </Navbar.Item>
            <Navbar.Item href="#" renderAs={Button.Group}>
              <Button color="primary" renderAs={Link} to="/signup">
                Sign Up
              </Button>
              <Button renderAs={Link} to="/login">
                Login
              </Button>
            </Navbar.Item>
          </Navbar.Container>
        </Navbar.Menu>
      </nav>
      <Outlet />
    </div>
  );
}
