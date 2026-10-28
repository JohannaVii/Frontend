import { Navigate, Outlet } from "react-router-dom";

type PublicOnlyRouteProps = {
    isLoggedIn: boolean
};

const PublicOnlyRoute = ({ isLoggedIn}: PublicOnlyRouteProps) => {
    if (isLoggedIn){
        return <Navigate to="/welcome" replace/>
    };

    return <Outlet/>
};

export default PublicOnlyRoute;