import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { fetchGroup, updateUser } from "../../services/userService";

function ModalEditUser(props) {
  const [userData, setUserData] = useState({ ...props.userEdit });
  const [listGroup, setListGroup] = useState([]);

  useEffect(() => {
    getGroups();
    setUserData({ ...props.userEdit }); // Cập nhật khi props thay đổi
  }, [props.userEdit]);

  const getGroups = async () => {
    let response = await fetchGroup();
    if (response && response.EC === 0) {
      setListGroup(response.DT);
    } else {
      toast.error(response.EM);
    }
  };

  const checkValidateInput = () => {
    if (!userData.userName) {
      toast.error("Tên người dùng là bắt buộc");
      return false;
    }
    if (!userData.address) {
      toast.error("Địa chỉ là bắt buộc");
      return false;
    }
    return true;
  };

  const changeHandleInput = (value, name) => {
    setUserData({ ...userData, [name]: value });
  };

  const handleUpdateUser = async () => {
    if (checkValidateInput()) {
      let response = await updateUser(userData);
      if (response && response.EC === 0) {
        toast.success(response.EM);
        setUserData({ ...props.userEdit });
        await props.fetchListUsers();
        props.onHide();
      } else {
        toast.error(response.EM);
      }
    }
  };

  return (
    <>
      <Modal
        size="lg"
        show={props.show}
        onHide={props.onHide}
        className="modal-edit-user"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Cập nhật người dùng
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div className="col-12 col-sm-6 form-group">
              <label>
                Email: (<span className="red">*</span>)
              </label>
              <input
                type="email"
                className="form-control"
                disabled
                value={userData.email}
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Số điện thoại: (<span className="red">*</span>)
              </label>
              <input
                type="text"
                className="form-control"
                disabled
                value={userData.phone}
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Tên người dùng: (<span className="red">*</span>)
              </label>
              <input
                type="text"
                className="form-control"
                value={userData.userName}
                onChange={(e) => changeHandleInput(e.target.value, "userName")}
              />
            </div>
            <div className="col-12 col-sm-12 form-group">
              <label>Địa chỉ:</label>
              <input
                type="text"
                className="form-control"
                value={userData.address}
                onChange={(e) => changeHandleInput(e.target.value, "address")}
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Giới tính: (<span className="red">*</span>)
              </label>
              <select
                className="form-select"
                value={userData.sex || ""}
                onChange={(e) => changeHandleInput(e.target.value, "sex")}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Nhóm: (<span className="red">*</span>)
              </label>
              <select
                className="form-select"
                value={userData.Group ? userData.Group.id : ""}
                onChange={(e) => changeHandleInput(e.target.value, "group")}
              >
                {listGroup.map((item, index) => (
                  <option key={`group-${index}`} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleUpdateUser}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEditUser;
