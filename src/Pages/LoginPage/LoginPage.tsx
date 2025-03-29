import LoginForm from "../../components/LoginPage/LoginForm/LoginForm";
import css from "./LoginPage.module.css";

const LoginPage: React.FC = () => {
  return (
    <>
      <h1 className={css.header}>Login Page</h1>
      <LoginForm />
    </>
  );
};

export default LoginPage;
