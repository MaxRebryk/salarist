import { useState } from "react";
import MainButtons from "../../components/StaffPage/MainButtons/MainButtons";
import SallaryTable from "../../components/StaffPage/SallaryTable/SallaryTable";
import css from "../StaffPage/Staff.module.css";

const StaffPage: React.FC = () => {
  const [sallaryInfo, setSallaryInfo] = useState<number>(0);
  const fullClick = () => {
    setSallaryInfo(sallaryInfo + 800);
  };
  const halfClick = () => {
    setSallaryInfo(sallaryInfo + 400);
  };
  return (
    <>
      <div className={css.mainDiv}>
        <SallaryTable sallaryInfo={sallaryInfo} />
        <MainButtons fullClick={fullClick} halfClick={halfClick} />
      </div>
    </>
  );
};

export default StaffPage;
