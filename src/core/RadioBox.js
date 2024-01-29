import React, { Fragment, useState } from "react";

const RadioBox = ({ prices, handleFilters }) => {
  const handleChange = (event) => {
    handleFilters(event.target.value);
    setValues(event.target.value);
  };
  const [values, setValues] = useState(0);
  return prices.map((p, i) => (
    <div key={i}>
      <input
        type="radio"
        onChange={handleChange}
        name={p}
        value={`${p._id}`}
        className="mr-2 ml-4"
      />
      <label className="form-check-label">{p.name}</label>
    </div>
  ));
};

export default RadioBox;
