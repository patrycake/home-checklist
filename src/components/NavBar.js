import { Link, useNavigate, useLocation } from "react-router-dom";
import { Navbar, Button } from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { logout } from "../firebase";
export default function NavBar({ isLogin }) {
  let navigate = useNavigate;
  const state = useLocation();
  useEffect(() => {
    if (state === null || state === undefined) {
      navigate("/");
    }
  });

  return (
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
          {isLogin ? (
            <Navbar.Item href="#">
              <Button onClick={logout}>Log Off </Button>
            </Navbar.Item>
          ) : (
            <Navbar.Item href="#" renderAs={Button.Group}>
              <Button color="primary" renderAs={Link} to="/signup">
                Sign Up
              </Button>
              <Button renderAs={Link} to="/login">
                Login
              </Button>
            </Navbar.Item>
          )}
        </Navbar.Container>
      </Navbar.Menu>
    </nav>
  );
}
