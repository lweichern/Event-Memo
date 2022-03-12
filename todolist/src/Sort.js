import React from "react";

export default function Sort(props) {
  return (
    <>
      <select className="dropdown-element" onChange={props.handleChange}>
        <option className="dropdown-values initial-value" value="">
          --- Sort By ---
        </option>
        <option className="dropdown-values" value="earliestDate">
          Earliest Date
        </option>
        <option className="dropdown-values" value="latestDate">
          Latest Date
        </option>
        <option className="dropdown-values" value="complete">
          Complete Tasks
        </option>
        <option className="dropdown-values" value="incomplete">
          Incomplete Tasks
        </option>
        <option className="dropdown-values" value="alphabetical">
          Alphabetical
        </option>
      </select>
    </>
  );
}
