import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectIsRefreshing } from "../redux/auth/selectors";
import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  component: React.FC;
  redirectTo?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  redirectTo = "/",
}) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const location = useLocation();

  if (isRefreshing) {
    return null;
  }

  return isLoggedIn ? (
    <Component />
  ) : (
    <Navigate to={redirectTo} state={{ from: location }} replace />
  );
};

export default PrivateRoute;
