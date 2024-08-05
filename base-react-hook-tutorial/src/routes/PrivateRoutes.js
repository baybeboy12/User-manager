import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userFetchToken } from "../redux/userSlice";
import { isEmpty } from "lodash";
const PrivateRoutes = (props) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.userInit);
  let navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      if (window.location.pathname === "/login") {
        dispatch(userFetchToken());
        console.log("checkAuth", dispatch(userFetchToken()));
      }
    };

    checkAuth();
  }, [dispatch]);

  if (data.isAuthenticate === false || isEmpty(data.user)) {
    navigate("/login");
  } else {
    return props.component;
  }
};
export default PrivateRoutes;
{
  /* <Route path={props.path} component={props.component}></Route> */
}
