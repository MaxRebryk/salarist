import * as React from "react";
import css from "./AppBar.module.css";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";

export default function AppBar() {
  const isLoggedIn: boolean = useSelector(selectIsLoggedIn);

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
            <li>
              <a className={css.navhref} href="/staff">
                Staff
              </a>
            </li>
            <li>
              <a className={css.navhref} href="/admin">
                Admin
              </a>
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
