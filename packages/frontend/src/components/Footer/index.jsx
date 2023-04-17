import React from "react";
import s from "./styles.module.css";

const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className={s.footerContent}>
        <h3 className={s.message}>
          Hecho con 🫶 por{" "}
          <a target="_blank" href="https://twitter.com/neeel_eth">
            neeel.eth
          </a>,&nbsp;
          <a target="_blank" href="https://twitter.com/olcortesb">
            olcortesb
          </a>
            &nbsp;y&nbsp;
          <a target="_blank" href="https://github.com/JavierBalonga">
            javi
          </a>
        </h3>
      </div>
    </footer>
  );
};

export default Footer;
