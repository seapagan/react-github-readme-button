import React from "react";

import "./ModalBG.scss";

const ModalBG = ({ children }) => {
  return (
    <div className="wrapper">
      <div className="inner">{children}</div>
    </div>
  );
};

export default ModalBG;
