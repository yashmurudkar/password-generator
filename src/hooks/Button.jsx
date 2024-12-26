import React from "react";

function Button({ text, customClass, onClick }) {
  return (
    <div className={customClass} onClick={onClick}>
      {text}
    </div>
  );
}

export default Button;
