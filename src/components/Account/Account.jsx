import { Fragment, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import Tabs from "react-bootstrap/Tabs";
import { AuthContext } from "../../context/AuthContext";

import "./account.scss";
import { useNavigate } from "react-router-dom";
import Loading from "../LOADING/Loading";
import request from "../../server/data";
import { toast } from "react-toastify";
import { TOKEN } from "../../constants";
const Account = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [handleValue, setHandleValue] = useState({});

  console.log(handleValue);

  useEffect(() => {
    getInput();
  }, []);

  const logout = () => {
    setIsAuthenticated(false);
    Cookies.remove(TOKEN);
    navigate("/");
  };
  async function getInput() {
    try {
      setLoading(true);
      let { data } = await request.get("/auth/me");
      setHandleValue(data);
    } catch (err) {
      toast.error("serverda hatolik");
    } finally {
      setLoading(false);
    }
  }

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await request.put("auth/details", handleValue);
      toast.success("Successfull changed");
      setLoading(false)
    } catch (error) {
      toast.error("Invalid")
    }
  };
  console.log(handleValue);
  return (
    <Fragment>
      <section className="account">
        <div className="container">
          <Tabs
            defaultActiveKey="profile"
            id="fill-tab-example"
            className="mb-3"
            fill
          >
            <Tabs eventKey="home" title="Edit Account">
              <form onSubmit={submit} className="account__wrapper">
                <div className="account__wrapper__form__firstname">
                  <input
                    onChange={(e) => {
                      setHandleValue({
                        ...handleValue,
                        first_name: e.target.value,
                      });
                    }}
                    id="first_name"
                    type="text"
                    value={handleValue.first_name}
                  />
                </div>
                <div className="account__wrapper__form__lastname">
                  <input
                    onChange={(e) => {
                      setHandleValue({
                        ...handleValue,
                        last_name: e.target.value,
                      });
                    }}
                    id="last_name"
                    type="text"
                    placeholder="Last name"
                    value={handleValue.last_name}
                  />
                </div>
                <div className="account__wrapper__form__username">
                  <input
                    onChange={(e) => {
                      setHandleValue({
                        ...handleValue,
                        username: e.target.value,
                      });
                    }}
                    id="username"
                    type="text"
                    placeholder="Username"
                    value={handleValue.username}
                  />
                </div>
                <div className="account__wrapper__form__password">
                  <input
                    onChange={(e) => {
                      setHandleValue({
                        ...handleValue,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    id="password"
                    type="password"
                    value={handleValue.password}
                  />
                </div>
                <div className="register__box__form__submit">
                  {loading ? (
                    <Loading />
                  ) : (
                    <button type="submit">submit</button>
                  )}
                </div>
              </form>
            </Tabs>
            <Tabs eventKey="profile" title="Edit Parol">
              <div className="passwords">
                <div className="account__wrapper__form__password__current">
                  <label htmlFor="">currrent password</label>
                  <input
                    onChange={(e) => {
                      setHandleValue({
                        ...handleValue,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    id="password"
                    type="password"
                  />
                  <label htmlFor="">New password</label>
                </div>
                <div className="account__wrapper__form__password__new">
                  <input
                    onChange={(e) => {
                      setHandleValue({
                        ...handleValue,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    id="password"
                    type="password"
                  />
                </div>
                <div className="btn">
                  <button>submit</button>
                </div>
              </div>
            </Tabs>
          </Tabs>
          <div className="Logout">
            <button className="logout" onClick={logout}>
              <i className="fa-solid fa-right-from-bracket"></i>
            </button>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Account;
