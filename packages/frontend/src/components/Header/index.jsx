import React from "react";
import s from "./styles.module.css";
import { GoMarkGithub } from "react-icons/go";

const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.headerContent}>
        <h1>El Viajero</h1>
        <div className={s.grow} />
        <a
          className={s.githubLink}
          target="_blank"
          href="https://github.com/NelsonGaldeman/fernet-viajero"
        >
          <GoMarkGithub size="3vh" color="#b7aeb4" />
        </a>
      </div>
    </header>
  );
};

export default Header;
