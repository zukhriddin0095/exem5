import { Fragment, useContext } from "react";
import Cookies from "js-cookie";
import { AuthContext } from "../../context/AuthContext";
import { TOKEN } from "../../constants";

import "./account.scss";
import { useNavigate } from "react-router-dom";
const Account = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate()

  const logout = () => {
    setIsAuthenticated(false)
    Cookies.remove(TOKEN)
    navigate("/")
  }
  return (
    <Fragment>
      <section className="account">
        <div className="container">
          <form></form>
          <div className="Logout">
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Account;
