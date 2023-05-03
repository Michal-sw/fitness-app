import { ReactElement } from "react";
import useAuth from "../../core/providers/AuthContext";
import Login from "./Login";

const PrivateRoute = ({ children }: { children: ReactElement }) => {
  const { authenticated } = useAuth();

  return authenticated ? children : <Login />;
};

export default PrivateRoute;
