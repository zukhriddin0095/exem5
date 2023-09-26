import { useState } from "react";
import "./register.scss";
import request from "../../server/data";
import Cookies from "js-cookie";
import { RegiterTOKEN } from "../../constants";
import { toast } from "react-toastify";
import Loading from "../LOADING/Loading";
const Register = () => {
  const [handleValue, setHandleValue] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState();

  const handeChange = (e) => {
    setHandleValue({ ...handleValue, [e.target.id]: e.target.value });
  };

  const regiter = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let {
        data: { token },
      } = await request.post("/auth/register", handleValue);
      Cookies.set(RegiterTOKEN, token);
      setLoading(false);
    } catch (err) {
      toast.error("hato bo'ldi");
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="register">
        <div className="container">
          <div className="register__box">
            <h1>Account</h1>
            <form className="register__box__form">
              <div className="register__box__form__firstname">
                <input
                  onChange={(e) => handeChange(e)}
                  id="first_name"
                  type="text"
                  placeholder="First name"
                />
              </div>
              <div className="register__box__form__lastname">
                <input
                  onChange={(e) => handeChange(e)}
                  id="last_name"
                  type="text"
                  placeholder="Last name"
                />
              </div>
              <div className="register__box__form__username">
                <input
                  onChange={(e) => handeChange(e)}
                  id="username"
                  type="text"
                  placeholder="Username"
                />
              </div>
              <div className="register__box__form__password">
                <input
                  onChange={(e) => handeChange(e)}
                  id="password"
                  type="password"
                />
              </div>
              {/* <div className="register__box__form__confirm">
                <input
                  onChange={(e) => handeChange(e)}
                  id="confirm"
                  type="password"
                />
              </div> */}
              <div className="register__box__form__submit">
                {loading ? (
                  <Loading />
                ) : (
                  <button onClick={regiter} type="submit">
                    submit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Register;
