import { useEffect, useState } from "react";
import css from "../SallaryTable/SallaryTable.module.css";

type SallaryTableProps = {
  sallaryInfo: number;
};

const SallaryTable: React.FC<SallaryTableProps> = ({ sallaryInfo }) => {
  const [date, setDate] = useState(
    new Date().toLocaleDateString("uk-UA", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );
  useEffect(() => {
    const dateText = new Date().toLocaleDateString("uk-UA", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    setDate(dateText);
  }, []);

  return (
    <>
      <div className={css.sallaryDiv}>
        <h1>Дата: {date}</h1>
        <h2>Поточна Заробітна Плата:</h2>
        <h2>{sallaryInfo} грн</h2>
      </div>
    </>
  );
};

export default SallaryTable;
