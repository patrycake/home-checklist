import React from "react";

export default function List({ list }) {
  const elmItems = list.map((item) => (
    <div className="column">
      <div className="has-background-info box">
        <h3 className="title is-3">{item.name}</h3>
        <p className="subtitle is-5">{item.description}</p>
        <p>Frequency: {item.frequency}</p>
        {item.completed.map((comp, index) => (
          <label class="checkbox is-primary">
            <input type="checkbox" checked={comp} />
            {index}
          </label>
        ))}
      </div>
    </div>
  ));
  return elmItems;
}
