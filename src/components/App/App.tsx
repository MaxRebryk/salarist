import { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "../../redux/auth/operations";
import { selectIsRefreshing } from "../../redux/auth/selectors";
import PrivateRoute from "../PrivateRoute";
import RestrictedRoute from "../RestrictedRoute";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const NotFoundPage = lazy(
  () => import("../../pages/NotFoundPage/NotFoundPage")
);
const StaffPage = lazy(() => import("../../pages/StaffPage/StaffPage"));

const AdminPage = lazy(() => import("../../pages/AdminPage/AdminPage"));

const App: React.FC = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) {
    return <div>IsLoadding..</div>;
  } else {
    return (
      <>
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
              path="/login"
              element={
                <RestrictedRoute redirectTo="/staff" component={LoginPage} />
              }
            />
            <Route
              path="/admin"
              element={
                <PrivateRoute redirectTo="/login" component={AdminPage} />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </>
    );
  }
};

export default App;
