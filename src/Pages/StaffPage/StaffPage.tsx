import { useEffect, useState } from "react";
import MainButtons from "../../components/StaffPage/MainButtons/MainButtons";
import SallaryTable from "../../components/StaffPage/SallaryTable/SallaryTable";
import css from "../StaffPage/Staff.module.css";
import { useDispatch, useSelector } from "react-redux";

import { addSallary, getAll, getOne } from "../../redux/sallary/operations";
import { selectWorker } from "../../redux/sallary/selectors";

const StaffPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOne());
  }, [dispatch]);

  const worker = useSelector(selectWorker);

  const fullClick = () => {
    dispatch(addSallary(800));
    console.log("click");
  };
  const halfClick = () => {
    if (worker.userType === "bartender") {
      dispatch(addSallary(400));
    }
  };
  return (
    <div className={css.mainDiv}>
      <h1>{worker?.name}</h1>
      <h2>{worker?.userType}</h2>
      <SallaryTable sallaryInfo={worker?.sallary} fine={worker?.fine} />
      <MainButtons fullClick={fullClick} halfClick={halfClick} />
    </div>
  );
};

export default StaffPage;
