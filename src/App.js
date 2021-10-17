import { Route, Switch, Redirect } from "react-router-dom";
import MyPolicy from "./pages/MyPolicy";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import { useContext } from "react";
import AuthContext from "./store/auth-context";

import "./App.css";

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/Login" />
        </Route>
        <Route path="/MyPolicy" exact>
          <MyPolicy />
          {!isLoggedIn && <Redirect to="/Login" />}
        </Route>
        <Route path="/Login" exact>
          <Login />
        </Route>
        <Route path="*">
          <Redirect to="/Login" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
