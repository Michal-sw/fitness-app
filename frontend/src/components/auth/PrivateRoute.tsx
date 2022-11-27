import useAuth from "../../hooks/useAuth";
import AccesDenied from "../../views/AccessDenied";
import { ReactNode } from "react";

const PrivateRoute = ({ children }: { children: ReactNode}) => {
 const { isAuthenticated } = useAuth();

 return isAuthenticated ? children : <AccesDenied/>;
};

export default PrivateRoute;