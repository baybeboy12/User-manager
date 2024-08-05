import { Routes, Route } from "react-router-dom";
import Login from "../components/Login/Login";
import Registry from "../components/Registry/Registry";
import Users from "../components/users/Users";
import PrivateRoutes from "./PrivateRoutes";
const AppRoutes = (props) => {
  return (
    <>
      <Routes>
        <Route
          path="/projects"
          element={<PrivateRoutes component={<Users />} />}
        />
        <Route
          path="/users"
          element={<PrivateRoutes component={<Users />} />}
        />
        <Route path="/registry" element={<Registry />} />

        <Route path="/login" element={<Login />} />
        <Route path="/home">Home</Route>

        <Route path="*">404 not found</Route>
      </Routes>
    </>
  );
};
export default AppRoutes;
