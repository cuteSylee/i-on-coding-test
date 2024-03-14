import React from "react";
import "../css/Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__container">
        <div className="footer__logo">
          <span className="footer__logo__text">METAPLANTS</span>
        </div>
        <div className="footer__copyright">
          <span className="footer__copyright__text">
            ©2024 by metaplants. Proudly created with Metaflyer.io
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
