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
        <ol>
          <li>Enter task and date desired</li>
          <li>Hit the submit button or "Enter" key to add task</li>
          <li>Click on the trash can icon to delete tasks</li>
          <li>Double click on a task to toggle it to complete/not complete</li>
          <li>Drag and drop the tasks to rearrange</li>
        </ol>
      </div>
    </>
  );
}
