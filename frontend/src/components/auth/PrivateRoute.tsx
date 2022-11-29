import { ReactElement, useEffect } from "react";
import useAuth from "../../core/providers/AuthContext";
import Login from "./Login";

const PrivateRoute = ({ children }: { children: ReactElement}) => {
 const { authenticated, token } = useAuth();

 useEffect(() => {
  console.log(token);
  console.log(authenticated);
 });

 return authenticated ? children : <Login/>;
};

export default PrivateRoute;