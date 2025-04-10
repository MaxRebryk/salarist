import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../../redux/sallary/operations";
import { selectWorkers } from "../../redux/sallary/selectors";
import WorkersTable from "../../components/AdminPage/WorkersTable/WorkersTable";
import FineModal from "../../components/AdminPage/FineModal/FineModal";

const AdminPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const workers = useSelector(selectWorkers);
  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);
  return (
    <>
      <WorkersTable workers={workers} setShowModal={setShowModal} />
      {showModal && <FineModal />}
    </>
  );
};

export default AdminPage;
