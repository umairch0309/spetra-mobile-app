import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setAuthToken } from "./config/AxiosBase";
import jwtDecode from "jwt-decode";
import history from "./config/history";
import "./scss/style.scss";
import "./scss/index.css";
import { loadUser, logout } from "./redux/actions/authActions";
import IdleTimer from "./containers/idleTimer";
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));

function App() {
  // configuring toast
  toast.configure();
  // auth structure
  const token = localStorage.adminToken;
  const dispatch = useDispatch();

  if (token) {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      localStorage.removeItem("adminToken");
      // logout
      dispatch(logout());
      history.push("/login");
    }
    setAuthToken(token);
    dispatch(loadUser());
  } else {
    dispatch(loadUser());
  }

  useEffect(() => {
    const timer = new IdleTimer({
      timeout: 1200, //expire after 5 mints
      onTimeout: () => {
        localStorage.removeItem("jwtToken");
        // logout
        dispatch(logout());
        history.push("/login");
      },
      onExpired: () => {
        //do something if expired on load
        console.log("expire");
      },
    });

    return () => {
      timer.cleanUp();
    };
  }, []);

  return (
    <Router forceRefresh={true} history={history}>
      <React.Suspense fallback={loading}>
        <Switch>
          <Route
            exact
            path="/admin/login"
            name="Login Page"
            render={(props) => <Login {...props} />}
          />

          <Route
            path="/"
            name="Home"
            render={(props) => <TheLayout {...props} />}
          />
        </Switch>
      </React.Suspense>
    </Router>
  );
}

export default App;
