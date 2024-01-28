import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Landing";
import "./App.css";
import Home from "./components/Home";
import Detail from "./components/Detail";
import SignUp from "./components/SignUp";
import SignIn from "./components/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/detail/:id" componont={Detail}>
            <Detail />
          </Route>
          <Route path="/login">
            <SignIn/>
          </Route>
          <Route path="/signin">
            <SignUp />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
