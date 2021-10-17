import { Fragment, useContext } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./Header.module.css";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();

  const authctx = useContext(AuthContext);

  const logoutHandler = () => {
    authctx.logout();
    history.replace("/");
  };
  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes.headerTitle}>
          <h1>Insurance App</h1>
        </div>
        {authctx.isLoggedIn && (
          <div className={classes.actions}>
            <button onClick={logoutHandler}>Logout</button>
          </div>
        )}
      </header>
    </Fragment>
  );
};

export default Header;
