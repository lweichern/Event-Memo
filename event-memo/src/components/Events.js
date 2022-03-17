import React from "react";
import { faTrash, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";

export default function Events(props) {
  // Change background of event cards according to completion status
  const styles = {
    background: !props.isComplete ? "rgb(233, 110, 110)" : "rgb(110, 233, 116)",
  };
  return (
    <motion.div
      className="event-item"
      style={styles}
      onDoubleClick={() => props.handleToggle(props.id)}
      draggable={true}
      onDragStart={props.handleDrag}
      id={props.id}
      onDragOver={(ev) => ev.preventDefault()}
      onDrop={props.handleDrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      layout
    >
      <h3 className="event-task" id={props.id}>
        {props.task}
      </h3>
      <h4 className="event-date" id={props.id}>
        {props.date}
      </h4>

      <FontAwesomeIcon
        icon={faInfoCircle}
        className="event-info-icon"
        onClick={() => props.handlePopup(props.id)}
      />
      <FontAwesomeIcon
        icon={faTrash}
        className="trash-icon"
        onClick={props.deleteEvent(props.id)}
        id={props.id}
      />
    </motion.div>
  );
}
