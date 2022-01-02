import "./App.css";
import Login from "./pages/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Constants } from "./constants/Constants";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { useState } from "react";
import Statistic from "./pages/Statistic";
import VideoViewer from "./components/VideoViewer";

const isLoggedIn =
sessionStorage.getItem(Constants.IS_LOGIN_SUCCESS) ||
localStorage.getItem(Constants.IS_LOGIN_SUCCESS);

const localStorageEmail = localStorage.getItem(Constants.EMAIL);

function App() {

  const [state, setstate] = useState({
    isLogin: false,
    email: localStorageEmail,
  })

  const handleChangeLoginState = (isLogin: boolean, email: string) => {
    setstate({
      isLogin,
      email
    })
  }

  const logoutHandler = () => {
    setstate({
      isLogin: false,
      email: ""
    });
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/home">
            {state.email && (isLoggedIn || state.isLogin) ? <Home email={state.email} logoutHandler={logoutHandler}/> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/login">
            {state.email && (isLoggedIn || state.isLogin)  ? <Redirect to="/home" /> : <Login handleChangeLoginState={handleChangeLoginState}/>}
          </Route>
          <Route exact path="/signUp">
            <SignUp handleChangeLoginState={handleChangeLoginState}/>
          </Route>
          <Route exact path="/statistic">
            {state.email && (isLoggedIn || state.isLogin) ? <Statistic email={state.email}/> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/video-viewer">
            {state.email && (isLoggedIn || state.isLogin) ? <VideoViewer email={state.email}/> : <Redirect to="/login" />}
          </Route>
          <Route exact path="*">
            {/* <ErrorPage /> */}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
