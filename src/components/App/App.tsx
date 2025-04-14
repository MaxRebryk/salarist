import { lazy, Suspense, useEffect } from "react";
import css from "./App.module.css";
import { Route, Routes } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { refreshUser } from "../../redux/auth/operations";
import { selectIsRefreshing } from "../../redux/auth/selectors";
import PrivateRoute from "../PrivateRoute";
import RestrictedRoute from "../RestrictedRoute";
import { InfinitySpin } from "react-loader-spinner";
import Layout from "../Layout/Layout";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const NotFoundPage = lazy(
  () => import("../../pages/NotFoundPage/NotFoundPage")
);
const StaffPage = lazy(() => import("../../pages/StaffPage/StaffPage"));

const AdminPage = lazy(() => import("../../pages/AdminPage/AdminPage"));

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) {
    return (
      <div className={css.loader}>
        <InfinitySpin width="200" color="#0000CD" />
      </div>
    );
  } else {
    return (
      <>
        <Layout>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/staff"
                element={
                  <PrivateRoute redirectTo="/login" component={StaffPage} />
                }
              />
              <Route
                path="/admin"
                element={
                  <PrivateRoute redirectTo="/login" component={AdminPage} />
                }
              />
              <Route path="*" element={<NotFoundPage />} />
              <Route
                path="/login"
                element={
                  <RestrictedRoute redirectTo="/staff" component={LoginPage} />
                }
              />
            </Routes>
          </Suspense>
        </Layout>
      </>
    );
  }
};

export default App;
