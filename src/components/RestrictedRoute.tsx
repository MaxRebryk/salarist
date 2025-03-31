import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/selectors";
import { Navigate } from "react-router-dom";

interface RestrictedRouteProps {
  component: React.FC;
  redirectTo?: string;
}

const RestrictedRoute: React.FC<RestrictedRouteProps> = ({
  component: Component,
  redirectTo = "/",
}) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to={redirectTo} /> : <Component />;
};

export default RestrictedRoute;
