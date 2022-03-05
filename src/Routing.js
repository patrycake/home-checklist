import {
  BrowserRouter,
  Routes,
  Route,
  Redirect,
  Navigate,
} from "react-router-dom";
import Dashboard from "./routes/Dashboard";
import Home from "./routes/Home";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";
import App from "./App";
import { AuthContextProvider, useAuthState } from "./firebase";

function Routing() {
  const AuthenticatedRoute = ({ component: C, ...props }) => {
    const { isAuthenticated } = useAuthState();
    console.log(`AuthenticatedRoute: ${isAuthenticated}`);
    return (
      <Route
        {...props}
        render={(routeProps) =>
          isAuthenticated ? <C {...routeProps} /> : <Navigate to="/login" />
        }
      />
    );
  };

  const UnauthenticatedRoute = ({ component: C, ...props }) => {
    const { isAuthenticated } = useAuthState();
    console.log(`UnauthenticatedRoute: ${isAuthenticated}`);
    return (
      <Route
        {...props}
        render={(routeProps) =>
          !isAuthenticated ? <C {...routeProps} /> : <Navigate to="/" />
        }
      />
    );
  };

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <UnauthenticatedRoute index element={<Home />} />
            <UnauthenticatedRoute path="signup" element={<SignUp />} />
            <AuthenticatedRoute path="dashboard" element={<Dashboard />} />
          </Route>
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default Routing;
