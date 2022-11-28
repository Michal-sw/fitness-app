import useAuth from "../../hooks/useAuth";
import AccesDenied from "../../views/AccessDenied";
import { ReactElement } from "react";

const PrivateRoute = ({ children }: { children: ReactElement}) => {
 const { isAuthenticated } = useAuth();

 return isAuthenticated ? children : <AccesDenied/>;
};

export default PrivateRoute;