import React from "react";
import { faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Instructions() {
  function closeHandle() {
    document
      .getElementsByClassName("instructions-container")[0]
      .classList.remove("show-animation");

    document
      .getElementsByClassName("instructions-container")[0]
      .classList.add("close-animation");

    document
      .getElementsByClassName("info-icon")[0]
      .classList.remove("close-animation");

    document
      .getElementsByClassName("info-icon")[0]
      .classList.add("show-animation");
  }

  function showHandle() {
    document
      .getElementsByClassName("instructions-container")[0]
      .classList.remove("close-animation");

    document
      .getElementsByClassName("instructions-container")[0]
      .classList.add("show-animation");

    document
      .getElementsByClassName("info-icon")[0]
      .classList.remove("show-animation");

    document
      .getElementsByClassName("info-icon")[0]
      .classList.add("close-animation");
  }

  return (
    <>
      <FontAwesomeIcon
        icon={faInfoCircle}
        onClick={showHandle}
        className="info-icon"
      />
      <div className="instructions-container">
        <h1>Instructions</h1>
        <FontAwesomeIcon
          icon={faTimes}
          onClick={closeHandle}
          className="close-btn"
        />
        <ul>
          <li>- Enter event details desired.</li>
          <li>- Hit the submit button or "Enter" key to add task.</li>
          <li>- Click on the info icon to see event details.</li>
          <li>- Click on the trash can icon to delete an event.</li>
          <li>
            - Double click on a task to toggle it to complete/ incomplete.
          </li>
          <li>- Drag and drop the tasks to rearrange.</li>
        </ul>
      </div>
    </>
  );
}
