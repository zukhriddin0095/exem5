import { Fragment, useContext, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { TOKEN } from "../../constants";
import request from "../../server/data";
import { AuthContext } from "../../context/AuthContext";


import "./login.scss";
import { useNavigate } from "react-router-dom";
import Loading from "../LOADING/Loading";
const Login = () => { 
  const {setIsAuthenticated} = useContext(AuthContext)
  const [handleValue, setHandleValue] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState()
  const navigate = useNavigate()

  function handleChange(e) {
    setHandleValue({ ...handleValue, [e.target.id]: e.target.value });
  }

  const login = async (e) => {
    e.preventDefault();
    try {
        setLoading(true);

      let {
        data: { token },
      } = await request.post("Auth/login", handleValue);
      Cookies.set(TOKEN, token);
      setIsAuthenticated(true)
      navigate("/my-blogs")
        setLoading(false);
    } catch (err) {
      toast.error("Login Hato");
        setLoading(false);

    }
  };

  return (
    <Fragment>
      <div className="container">
        <div className="Login">
          <form className="Login__form">
            <div className="Login__form__title">
              <h1>Login</h1>
            </div>
            <div className="Login__form__username">
              <input
                id="username"
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="Login__form__password">
              <input
                id="password"
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="password"
              />
            </div>
            <div className="Login__form__submit">
              {loading ? (
                <Loading />
              ) : (
                <button onClick={login} type="submit">
                  Login
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
