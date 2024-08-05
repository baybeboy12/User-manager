import React from "react";
import "./Registry.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registryService } from "../../services/userService";
function Registry(props) {
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [confirmPasword, setConfirmPassword] = useState();
  const defaultCheckValid = {
    isValidEmail: true,
    isValidPhone: true,
    isValidUsername: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  };
  const [objectCheckValid, setObjectCheckValid] = useState(defaultCheckValid);
  let history = useNavigate();
  const handleLoginAcc = () => {
    history("/login");
  };

  const isValidInputs = () => {
    setObjectCheckValid(defaultCheckValid);
    if (!email) {
      toast.error("Email is required");
      setObjectCheckValid({ ...objectCheckValid, isValidEmail: false });
      return false;
    }
    //valid email
    //email start with @ and end with .
    let rexemail = /\S+@\S+\.\S+/;
    if (!rexemail.test(email)) {
      setObjectCheckValid({ ...objectCheckValid, isValidEmail: false });
      toast.error("Email not valid");
      return false;
    }
    if (!phone) {
      toast.error("Phone number is required");
      setObjectCheckValid({ ...objectCheckValid, isValidPhone: false });
      return false;
    }
    //valid phone
    //phone number start with 84 or 03 or 05 or 07 or 08 or 09, and have 10 digits
    let rexphone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!rexphone.test(phone)) {
      setObjectCheckValid({ ...objectCheckValid, isValidPhone: false });
      toast.error("Phone number not valid");
      return false;
    }
    if (!username) {
      toast.error("Username is required");
      setObjectCheckValid({ ...objectCheckValid, isValidUsername: false });
      return false;
    }
    //valid username
    //username have at least 1 lowercase, 1 uppercase and 1 number
    let rexusername = /^[a-zA-Z0-9]+$/;
    if (!rexusername.test(username)) {
      setObjectCheckValid({ ...objectCheckValid, isValidUsername: false });
      toast.error("Username not valid");
      return false;
    }
    if (!password) {
      toast.error("Password is required");
      setObjectCheckValid({ ...objectCheckValid, isValidPassword: false });
      return false;
    }
    //valid password
    //password have at least 1 lowercase, 1 uppercase, 1 number and 1 special character
    // let rexpassword =
    //   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
    // if (!rexpassword.test(password)) {
    //   setObjectCheckValid({ ...objectCheckValid, isValidPassword: false });
    //   toast.error("Password not valid");
    //   return false;
    // }
    if (password !== confirmPasword) {
      toast.error("Password not match");
      return false;
    }

    return true;
  };
  const handleRegistry = async () => {
    let check = isValidInputs();
    if (check) {
      let response = await registryService(email, phone, username, password);
      let severData = response;
      if (+severData.EC === 0) {
        toast.success(severData.EM);
        history("/login");
      } else {
        toast.error(severData.EM);
      }
    }
  };
  return (
    <div className="registry-container">
      <div className="container">
        <div className="row">
          <div className="content-left col-7 d-flex flex-column justify-content-center">
            <div className="brand fw-bold fs-1">Dung</div>
            <div className="detail fs-3">
              Facebook helps you connect and share with the people in your life.
            </div>
          </div>
          <div className="content-right col-5 green d-flex flex-column gap-3 py-3">
            <div class="mb-3">
              <label for="" class="form-label">
                Email:
              </label>
              <input
                type="text"
                class={
                  objectCheckValid.isValidEmail
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Email "
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                required
              />

              <label for="" class="form-label">
                Phone number:
              </label>
              <input
                type="text"
                class={
                  objectCheckValid.isValidPhone
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Phone number"
                value={phone}
                onChange={(event) => {
                  setPhone(event.target.value);
                }}
              />

              <label for="" class="form-label">
                User name:
              </label>
              <input
                type="text"
                class={
                  objectCheckValid.isValidUsername
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="User name"
                value={username}
                onChange={(event) => {
                  setUserName(event.target.value);
                }}
              />

              <label for="" class="form-label">
                Password:
              </label>
              <input
                type="password"
                class={
                  objectCheckValid.isValidPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />

              <label for="" class="form-label">
                Re-en Password:
              </label>
              <input
                type="password"
                class={
                  objectCheckValid.isValidConfirmPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder=" Re-en Password"
                value={confirmPasword}
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                }}
              />
            </div>

            <button
              type="button"
              class="btn btn-primary"
              onClick={() => handleRegistry()}
            >
              Registry
            </button>

            <hr />
            <div className="text-center">
              <button
                type="button"
                class="btn btn-success"
                onClick={() => handleLoginAcc()}
              >
                Already've an account. Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registry;
