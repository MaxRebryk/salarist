import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../../redux/sallary/operations";
import {
  selectWorkers,
  selectLoading,
  selectError,
} from "../../redux/sallary/selectors";
import WorkersTable from "../../components/AdminPage/WorkersTable/WorkersTable";
import FineModal from "../../components/AdminPage/FineModal/FineModal";
import { AppDispatch } from "../../redux/store";
import { selectUser } from "../../redux/auth/selectors";
import { Navigate } from "react-router-dom";

const AdminPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const workers = useSelector(selectWorkers);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  if (user.userRole !== "owner") {
    return <Navigate to="/" />;
  }

  if (loading) return <div>Завантаження...</div>;
  if (error) return <div>Помилка завантаження</div>;
  if (!workers || workers.length === 0) return <div>Немає працівників</div>;

  return (
    <>
      <WorkersTable workers={workers} setShowModal={setShowModal} />
      {showModal && <FineModal />}
    </>
  );
};

export default AdminPage;
