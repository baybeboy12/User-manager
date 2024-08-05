import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { fetchGroup } from "../../services/userService";
import _ from "lodash";
import { createUser } from "../../services/userService";
function ModalUser(props) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [sex, setSex] = useState("");
  const [group, setGroup] = useState("");
  const defaultUserData = {
    email: "",
    phone: "",
    username: "",
    password: "",
    address: "",
    sex: "Male",
    group: "",
  };
  const validInputDefault = {
    email: true,
    phone: true,
    username: true,
    password: true,
    address: true,
    sex: true,
    group: true,
  };
  const [userData, setUserData] = useState(defaultUserData);
  const [validInput, setValidInput] = useState(validInputDefault);

  const [listGroup, setListGroup] = useState([]);
  useEffect(() => {
    getGroups();
  }, []);
  const getGroups = async () => {
    let response = await fetchGroup();
    if (response && response.EC === 0) {
      setListGroup(response.DT);
      if (response.DT.length > 0 && response.DT) {
        // i want save sex and group in userData
        setUserData({ ...userData, group: response.DT[0].id });
      }
    } else {
      toast.error(response.EM);
    }
  };
  const handleChangeInput = (value, name) => {
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const checkValidateInput = () => {
    setValidInput(validInputDefault);
    let arr = ["email", "phone", "username", "password", "address"];
    let check = true;
    for (let i = 0; i < arr.length; i++) {
      if (!userData[arr[i]]) {
        let _validInput = _.cloneDeep(validInputDefault);
        _validInput[arr[i]] = false;
        setValidInput(_validInput);
        toast.error(`empty input ${arr[i]}`);
        check = false;
        break;
      }
    }

    return check;
  };

  const handleCreateUser = async () => {
    if (checkValidateInput()) {
      let response = await createUser(
        userData.email,
        userData.phone,
        userData.username,
        userData.password,
        userData.address,
        userData.sex,
        userData.group
      );
      if (response && response.EC === 0) {
        toast.success("create user success");
        await props.onSubmit();
        setUserData({ ...defaultUserData, group: listGroup[0].id });
        props.onHide();
      } else {
        toast.error("error create user");
      }
    }
  };

  return (
    <>
      <Modal
        size="lg"
        show={props.show}
        className="modal-create-user"
        onHide={props.onHide}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create user
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div className="col-12 col-sm-6 form-group">
              <label>
                Email:(<span className="red">*</span>)
              </label>
              <input
                type="email"
                className={
                  validInput.email ? "form-control" : " is-invalid form-control"
                  // validInput.email ? " is-valid form-control" : "form-control"
                }
                value={userData.email}
                onChange={(event) =>
                  handleChangeInput(event.target.value, "email")
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Phone number:(<span className="red">*</span>)
              </label>
              <input
                type="text"
                className={
                  validInput.phone ? "form-control" : "form-control is-invalid"
                }
                value={userData.phone}
                onChange={(event) =>
                  handleChangeInput(event.target.value, "phone")
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                User name:(<span className="red">*</span>)
              </label>
              <input
                type="text"
                className={
                  validInput.username
                    ? "form-control"
                    : "form-control is-invalid"
                }
                value={userData.username}
                onChange={(event) =>
                  handleChangeInput(event.target.value, "username")
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Password:(<span className="red">*</span>)
              </label>
              <input
                type="text"
                className={
                  validInput.password
                    ? "form-control"
                    : "form-control is-invalid"
                }
                value={userData.password}
                onChange={(event) =>
                  handleChangeInput(event.target.value, "password")
                }
              />
            </div>
            <div className="col-12 col-sm-12 form-group">
              <label>Address:</label>
              <input
                type="text"
                className={
                  validInput.address
                    ? "form-control"
                    : "form-control is-invalid"
                }
                value={userData.address}
                onChange={(event) =>
                  handleChangeInput(event.target.value, "address")
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Gender:(<span className="red">*</span>)
              </label>
              <select
                className="form-select"
                value={userData.sex}
                onChange={(event) =>
                  handleChangeInput(event.target.value, "sex")
                }
              >
                <option defaultValue="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Group:(<span className="red">*</span>)
              </label>
              <select
                className="form-select"
                onChange={(event) =>
                  handleChangeInput(event.target.value, "group")
                }
              >
                {listGroup && listGroup.length > 0
                  ? listGroup.map((item, index) => {
                      return (
                        <option key={`group-${index}`} value={item.id}>
                          {item.name}
                        </option>
                      );
                    })
                  : ""}
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleCreateUser()}>
            save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUser;
