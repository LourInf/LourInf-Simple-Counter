import React from "react";

const Buttons = ({ handleMain, handleReset, isActive }) => {
  return (
    <div className="btn-group-vertical bt-group sm" role="group">
      <button type="button" className="btn btn-outline-success btn-lg m-2 p-3 fw-bold" onClick={handleMain}>
        {isActive ? "Pause" : "Start"}
      </button>
      <button type="button" className="btn btn-outline-danger btn-lg m-2 p-3 fw-bold" onClick={handleReset}>
        {"Reset"}
      </button>
    </div>
  );
};

export default Buttons;