import MainButtons from "../../components/StaffPage/MainButtons/MainButtons";
import SallaryTable from "../../components/StaffPage/SallaryTable/SallaryTable";
import css from "../StaffPage/Staff.module.css";

const StaffPage: React.FC = () => {
  return (
    <>
      <div className={css.mainDiv}>
        <SallaryTable />
        <MainButtons />
      </div>
    </>
  );
};

export default StaffPage;
