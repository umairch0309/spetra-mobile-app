import React, { Suspense, lazy } from "react";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { logout, loadUser } from "./redux/actions/authActions";
import { headers } from "./helpers/helpers";
import history from "./helpers/history";
import { Route, Switch } from "react-router-dom";

// lazy imports
// containers
const Layout = lazy(() => import("./container/Layout/Layout"));
// pages
const Login = lazy(() => import("./views/web/login/login"));
const SignUp = lazy(() => import("./views/web/signup/signup"));
const ForgetPassword = lazy(() =>
  import("./views/web/forgetAuth/ForgetPasswordPage")
);
const ResetPassword = lazy(() =>
  import("./views/web/forgetAuth/ResetPasswordPage")
);
const LandingPage = lazy(() => import("./views/web/landingPage/LandingPage"));
const SearchPage = lazy(() => import("./views/web/search/search"));
const ProfilePage = lazy(() => import("./views/web/profile/ProfilePage"));
const VideoChat = lazy(() => import("./views/web/videoChat/VideoChat"));
const BookAbdReview = lazy(() =>
  import("./views/web/bookAndReview/BookAndReviewPage")
);
const DoctorForm = lazy(() => import("./views/web/doctorForm/DoctorForm"));
const InsuranceForm = lazy(() =>
  import("./views/web/insurance/newPatientInsuranceForm")
);
const AboutUs = lazy(() => import("./views/web/footerPages/AboutUsPage"));
const ContactUs = lazy(() => import("./views/web/footerPages/ContactUsPage"));
const PrivacyPolicy = lazy(() =>
  import("./views/web/footerPages/PrivacyPolicyPage")
);
const TermsAndCondiiton = lazy(() =>
  import("./views/web/footerPages/TermsAndCondiiton")
);
const Specialities = lazy(() =>
  import("./views/web/specialities/specialities")
);
const ErrorPage = lazy(() => import("./views/web/errorPage/ErrorPage"));

// App
function App() {
  // loading
  const loading = (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
  );
  // auth structure
  const token = localStorage.authToken;
  const dispatch = useDispatch();

  if (token) {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      localStorage.removeItem("authToken");
      // logout
      dispatch(logout());
      history.push("/login");
    }
    headers();
    dispatch(loadUser());
  } else {
    dispatch(loadUser());
  }
  // main app return
  return (
    <Suspense fallback={loading}>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/login" component={Login} />
        <Route path="/patient/signup" component={SignUp} />
        <Route path="/auth/forget" component={ForgetPassword} />
        <Route path="/auth/reset-password/:token" component={ResetPassword} />
        <Route path="/doctor-form" component={DoctorForm} />
        <Route path="/specialties" component={Specialities} />
        <Route path="/insurance-form" component={InsuranceForm} />
        <Route path="/search" component={SearchPage} />
        <Route path="/profile/:profileId" component={ProfilePage} />
        <Route path="/booking/review-booking/:id" component={BookAbdReview} />
        <Route path="/video-chat" component={VideoChat} />
        <Route path="/about-us" component={AboutUs} />
        <Route path="/contact-us" component={ContactUs} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms-and-condition" component={TermsAndCondiiton} />
        <Route path="/dashboard" component={Layout} />
        <Route path="/:error" component={ErrorPage}></Route>
      </Switch>
    </Suspense>
  );
}

export default App;
