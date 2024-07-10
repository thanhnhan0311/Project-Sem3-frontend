import React from "react";
import "./checkbox.css";

export default function InputCheckBox({ checked, onChange }) {
  return (
    <div className="checkbox-wrapper-13">
      <input checked={checked} onChange={onChange} id="c1-13" type="checkbox" />
    </div>
  );
}
