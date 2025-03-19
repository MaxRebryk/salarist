import css from "../MainButtons/MainButtons.module.css";

type MainButtonsProps = {
  fullClick: () => void;
  halfClick: () => void;
};

const MainButtons: React.FC<MainButtonsProps> = ({ fullClick, halfClick }) => {
  return (
    <>
      <div className={css.mainButtonsDiv}>
        <button onClick={fullClick} className={css.fullButton}>
          Повна Зміна
        </button>
        <button onClick={halfClick} className={css.halfButton}>
          Підстраховка
        </button>
      </div>
    </>
  );
};

export default MainButtons;
