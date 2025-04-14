import css from "./AppBar.module.css";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";
import { User } from "../../redux/auth/slice";
import { AppDispatch } from "../../redux/store";

export default function AppBar() {
  const isLoggedIn: boolean = useSelector(selectIsLoggedIn);
  const user: User = useSelector(selectUser);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className={css.nav}>
      <div className={css.logo}>
        <a className={css.navhref} href="/">
          Loui
        </a>
      </div>
      <ul className={css.ul}>
        {isLoggedIn && (
          <>
            {user.userRole === "worker" && (
              <li>
                <a className={css.navhref} href="/staff">
                  Staff
                </a>
              </li>
            )}

            {user.userRole === "owner" && (
              <li>
                <a className={css.navhref} href="/admin">
                  Admin
                </a>
              </li>
            )}
            <li>
              <button className={css.buttonLogout} onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <>
            <a className={css.navhref} href="/login">
              Sign In
            </a>
          </>
        )}
      </ul>
    </nav>
  );
}
