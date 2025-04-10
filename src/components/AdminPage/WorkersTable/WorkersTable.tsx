import * as React from "react";
import css from "./WorkersTable.module.css";
export interface IWorkersTableProps {
  workers: Worker[];
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function WorkersTable({
  workers,
  setShowModal,
}: IWorkersTableProps) {
  const handleFineAddclick = () => {
    setShowModal(true);
  };

  return (
    <div>
      <ul className={css.list}>
        {workers.map((worker) => {
          return (
            <li className={css.listItem} key={worker._id}>
              <div className={css.textDiv}>
                <p className={css.listText}>Ім'я: {worker.name}</p>
                <p className={css.listText}>
                  Номер телефону: {worker.phoneNumber}
                </p>
                <p className={css.listText}>Посада: {worker.userType}</p>
                <p className={css.listText}>Зарплата: {worker.sallary} грн</p>
                <p className={css.listText}>Штрафи: {worker.fine} грн</p>
                <p className={css.listText}>Робочі дні: {worker.workDays}</p>
              </div>
              <div className={css.buttonDiv}>
                <button className={css.fineButton} onClick={handleFineAddclick}>
                  Додати Штраф
                </button>
                <button className={css.changeInfoButton}>
                  Змінити Інформацію
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
