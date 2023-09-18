import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { logOut } from "../../redux/authentication/actionCreator";
import history from "../../utils/history";
function ScrollToTop(props) {
  const pathname = props.location.pathname;
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.jwtToken;
    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      console.log();
      if (decoded.exp < currentTime) {
        localStorage.removeItem("jwtToken");
        // logout
        dispatch(logOut());
        history.push("/login");
      }
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default withRouter(ScrollToTop);
