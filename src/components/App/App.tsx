import { lazy, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AdminPage from "../../Pages/AdminPage/AdminPage";
const HomePage = lazy(() => import("../../Pages/HomePage/HomePage"));
const LoginPage = lazy(() => import("../../Pages/LoginPage/LoginPage"));
const NotFoundPage = lazy(
  () => import("../../Pages/NotFoundPage/NotFoundPage")
);
const StaffPage = lazy(() => import("../../Pages/StaffPage/StaffPage"));
const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/staff" element={<StaffPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
