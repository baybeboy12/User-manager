/* eslint-disable */
import "./App.scss";
import Nav from "./components/Navigation/Nav";
import { BrowserRouter } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Fragment, useEffect, useState } from "react";
import _ from "lodash";
import AppRoutes from "./routes/AppRoutes";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  const [account, setAccount] = useState({});
  // useEffect(() => {
  //   let session = sessionStorage.getItem("account");
  //   if (session) {
  //     setAccount(JSON.parse(session));
  //   }
  // }, []);
  return (
    <Fragment>
      <Provider store={store}>
        <BrowserRouter>
          <div className="app-header">
            <Nav />
          </div>
          <div className="app-container">
            <AppRoutes />
          </div>
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </BrowserRouter>
      </Provider>
    </Fragment>
  );
}

export default App;
