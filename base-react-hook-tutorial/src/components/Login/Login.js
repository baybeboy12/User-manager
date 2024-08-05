/*eslint-disable*/
import React, { useEffect } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { loginService } from "../../services/userService";
import { useDispatch } from "react-redux";
import { userFetchToken } from "../../redux/userSlice";
function Login(props) {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [valueLogin, setValueLogin] = useState(); // [valueLogin]
  const [password, setPassword] = useState();
  const defaultCheckValid = { isValidValueLogin: true, isValidPassword: true };
  const [objectCheckValid, setObjectCheckValid] = useState(defaultCheckValid);
  const handleCreateNewAcc = () => {
    history("/registry");
  };
  const handleLoginAcc = async () => {
    setObjectCheckValid(defaultCheckValid);
    if (!valueLogin) {
      setObjectCheckValid({ ...objectCheckValid, isValidValueLogin: false });
      toast.error("Please enter your email or phone number");
    }
    if (!password) {
      setObjectCheckValid({ ...objectCheckValid, isValidPassword: false });
      toast.error("Please enter your password");
    }

    let response = await loginService(valueLogin, password);

    // let severData = response;

    if (+response.EC === 0 && response) {
      let data = {
        isAuthenticated: true,
        token: "fake token",
      };
      dispatch(userFetchToken());
      sessionStorage.setItem("account", response.DT);
      history("/users");
      // window.location.reload();
    } else {
      toast.error(response.EM);
    }
  };
  const handlePressEnter = (event) => {
    if (event.key === "Enter") {
      handleLoginAcc();
    }
  };
  // useEffect(() => {
  //   let session = sessionStorage.getItem("account");
  //   if (session) {
  //     history("/home");
  //     window.location.reload();
  //   }
  // }, []);
  return (
    <div className="login-container">
      <div className="container">
        <div className="row px-3 px-sm-0">
          <div className="content-left col-12 d-none col-sm-7 d-sm-block d-flex flex-column justify-content-center">
            <div className="brand fw-bold ">Dung</div>
            <div className="detail ">
              Facebook helps you connect and share with the people in your life.
            </div>
          </div>
          <div className="content-right col-sm-5 col-12 green d-flex flex-column gap-3 py-3 ">
            <div className="brand d-sm-none">Dung</div>
            <input
              type="text"
              class={
                objectCheckValid.isValidValueLogin
                  ? "form-control"
                  : "is-invalid form-control"
              }
              placeholder="Email address or phone number"
              value={valueLogin}
              onChange={(e) => setValueLogin(e.target.value)}
            />
            <input
              type="password"
              class={
                objectCheckValid.isValidPassword
                  ? "form-control"
                  : "is-invalid form-control"
              }
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(event) => handlePressEnter(event)}
            />
            <button
              type="button"
              class="btn btn-primary"
              onClick={() => handleLoginAcc()}
            >
              Login
            </button>
            <span className="text-center">
              <a className="forgot-password" href="#">
                Forgotten password?
              </a>
            </span>
            <hr />
            <div className="text-center">
              <button
                type="button"
                class="btn btn-success"
                onClick={() => handleCreateNewAcc()}
              >
                Create new account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
