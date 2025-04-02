import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import LoginForm from "../../components/LoginPage/LoginForm/LoginForm";
import css from "./LoginPage.module.css";
import {
  selectIsRefreshing,
  selectIsLoggedIn,
} from "../../redux/auth/selectors";

const LoginPage: React.FC = () => {
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();

  const redirectPath = location.state?.from?.pathname || "/staff";

  if (isRefreshing) return null;

  if (isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <>
      <h1 className={css.header}>Login Page</h1>
      <LoginForm />
    </>
  );
};

export default LoginPage;
