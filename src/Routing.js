import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Dashboard from "./routes/Dashboard";
import Home from "./routes/Home";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";
import App from "./App";
import Reset from "./routes/Reset";
import { AuthContextProvider, useAuthState } from "./firebase";

function Routing() {
  const RequireAuth = ({ component: C, ...props }) => {
    console.log(C);
    const { isAuthenticated } = useAuthState();
    let location = useLocation();
    console.log(`AuthenticatedRoute: ${isAuthenticated}`);
    return isAuthenticated ? (
      <C {...props} />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  };

  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="reset" element={<Reset />} />
          <Route
            path="dashboard"
            element={<RequireAuth component={Dashboard} />}
          />
        </Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default Routing;
