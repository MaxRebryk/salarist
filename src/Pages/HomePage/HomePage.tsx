import css from "./HomePage.module.css";

const HomePage: React.FC = () => {
  return (
    <section className={css.mainSection}>
      <h1 className={css.mainHeader}>
        Loui <br />
        Sallarist
      </h1>
    </section>
  );
};

export default HomePage;
