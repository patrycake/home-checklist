import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Dashboard from "./routes/Dashboard";
import Home from "./routes/Home";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";
import App from "./App";
import { AuthContextProvider, useAuthState } from "./firebase";

function Routing() {
  // function RequireAuth({ children }: { children: JSX.Element }) {
  //   let auth = useAuth();
  //   let location = useLocation();

  //   if (!auth.user) {
  //     // Redirect them to the /login page, but save the current location they were
  //     // trying to go to when they were redirected. This allows us to send them
  //     // along to that page after they login, which is a nicer user experience
  //     // than dropping them off on the home page.
  //     return <Navigate to="/login" state={{ from: location }} replace />;
  //   }

  //   return children;
  // }
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

  // const UnauthenticatedRoute = ({ component: C, ...props }) => {
  //   const { isAuthenticated } = useAuthState();
  //   console.log(`UnauthenticatedRoute: ${isAuthenticated}`);
  //   return (
  //     <Route
  //       {...props}
  //       render={(routeProps) =>
  //         !isAuthenticated ? <C {...routeProps} /> : <Navigate to="/" />
  //       }
  //     />
  //   );
  // };

  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
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
