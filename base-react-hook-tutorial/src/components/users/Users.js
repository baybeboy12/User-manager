import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { fetchAllUser } from "../../services/userService";
import ReactPaginate from "react-paginate";
import "./Users.scss";
import { deleteUser } from "../../services/userService";
import ModalDelete from "./ModalDelete";
import ModalCreateUser from "./ModalCreateUser";
import ModalEditUser from "./ModalEditUser";

import { Pagination } from "antd";
const Users = (props) => {
  let history = useNavigate();
  const [listUsers, setListUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(5);
  const [totalRows, setToTalRows] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [isShowModalCreateUser, setIsShowModalCreateUser] = useState(false);
  const [isShowModalEditUser, setIsShowModalEditUser] = useState(false);
  const [userEdit, setUserEdit] = useState({});
  useEffect(() => {
    fetchListUsers();
  }, [currentPage, currentLimit]);

  const fetchListUsers = async (page) => {
    let response = await fetchAllUser(currentPage, currentLimit);
    if (response && response.EC === 0) {
      setTotalPage(response.DT.totalPages);
      setListUsers(response.DT.users);
      setToTalRows(response.DT.totalRows);
      console.log("check users", response.DT);
    } else {
      toast.error(response.EM);
    }
  };
  const onChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleDeleteUser = (user) => {
    setDataModal(user);
    setIsShowModalDelete(true);
  };
  const handleClose = () => {
    setIsShowModalDelete(false);
  };
  const confirmDeleteUser = async () => {
    let response = await deleteUser(dataModal);
    if (response && response.EC === 0) {
      toast.success(response.EM);
      await fetchListUsers();
      setIsShowModalDelete(false);
      if (listUsers.length === 1) {
        setCurrentPage(currentPage - 1);
      }
    } else {
      toast.error(response.EM);
    }
  };
  const onHideModalCreateUser = () => {
    setIsShowModalCreateUser(false);
  };
  const onShowModalUser = () => {
    setIsShowModalCreateUser(true);
  };
  const onHideModalEditUser = () => {
    setIsShowModalEditUser(false);
  };
  const onShowModalEditUser = (item) => {
    setIsShowModalEditUser(true);
    setUserEdit(item);
  };
  const onSubmitCreateUser = async () => {
    if (currentPage === totalPage && listUsers.length === 5) {
      console.log("1");
      setCurrentPage(currentPage + 1);
    } else if (currentPage === totalPage && listUsers.length < 5) {
      console.log("2");
      setCurrentPage(currentPage);
    } else if (currentPage < totalPage && totalRows % 10 !== 0) {
      console.log("3");
      setCurrentPage(totalPage);
    } else {
      console.log("4");
      setCurrentPage(totalPage + 1);
    }
  };

  return (
    <>
      <div className="container" style={{ backgroundColor: "white" }}>
        <div className="manage-users-container">
          <div className="user-header">
            <div className="title">
              <h3>Table users</h3>
            </div>
            <div className="action">
              <button className="btn btn-success" onClick={onShowModalUser}>
                Add
              </button>
              <button className="btn btn-primary">Refresh</button>
            </div>
          </div>
          <div className="user-body">
            <table className="table table-hover table-bordered">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">id</th>
                  <th scope="col">email</th>
                  <th scope="col">userName</th>
                  <th scope="col">Group</th>
                  <th scope="col">phone</th>
                  <th scope="col">address</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {listUsers && listUsers.length > 0 ? (
                  <>
                    {listUsers.map((item, index) => {
                      return (
                        <tr key={`row-${index}`}>
                          <td>{index + 1}</td>
                          <td>{item.id}</td>
                          <td>{item.email}</td>
                          <td>{item.userName}</td>
                          <td>{item.Group ? item.Group.name : ""}</td>
                          <td>{item.phone}</td>
                          <td>{item.address}</td>
                          <td>{item.sex}</td>
                          <td>
                            <button
                              className="btn btn-warning mx-3"
                              onClick={(e) => onShowModalEditUser(item)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                handleDeleteUser(item);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <tr>
                      <td>not found Users</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
          {totalPage > 0 && (
            <div className="user-footer">
              <>
                <Pagination
                  style={{ position: "absolute", right: 100, marginTop: 30 }}
                  total={totalRows}
                  defaultCurrent={currentPage}
                  pageSize={currentLimit}
                  onChange={(e) => onChange(e)}
                  current={currentPage}
                  // itemRender={itemRender}
                  showQuickJumper
                />
              </>
            </div>
          )}
        </div>
      </div>
      <ModalDelete
        show={isShowModalDelete}
        handleClose={handleClose}
        confirmDeleteUser={confirmDeleteUser}
        dataModal={dataModal}
      />
      <ModalCreateUser
        onHide={onHideModalCreateUser}
        show={isShowModalCreateUser}
        fetchListUsers={fetchListUsers}
        onSubmit={onSubmitCreateUser}
      />
      <ModalEditUser
        onHide={onHideModalEditUser}
        show={isShowModalEditUser}
        userEdit={userEdit}
        fetchListUsers={fetchListUsers}
      />
    </>
  );
};

export default Users;
