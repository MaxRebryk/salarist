import css from "../MainButtons/MainButtons.module.css";
const MainButtons: React.FC = () => {
  return (
    <>
      <div className={css.mainButtonsDiv}>
        <button className={css.fullButton}>Повна Зміна</button>
        <button className={css.halfButton}>Підстраховка</button>
      </div>
    </>
  );
};

export default MainButtons;
