import React, { useEffect, useState } from "react";
import { faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";

export default function Popup({ handlePopup, id, allEvents }) {
  const [currentEvent, setCurrentEvent] = useState({});

  console.log(id);
  useEffect(() => {
    const findEvent = allEvents.find((event) => event.id === id);

    setCurrentEvent(findEvent);
  }, [id]);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 800, opacity: 0 }}
      className="popup-container"
    >
      <div className="popup-details">
        <div className="event-title-close-btn">
          <h1>Event Details</h1>
          <FontAwesomeIcon
            icon={faTimes}
            className="popup-close-btn"
            onClick={() => handlePopup("")}
          />
        </div>

        <h3>Task: {currentEvent.task}</h3>
        <h3>Date: {currentEvent.date}</h3>
        <h3>Location: {currentEvent.location}</h3>
        <h3>Number of People: {currentEvent.noOfPersons}</h3>
        <h3>
          Completion Status:{" "}
          {currentEvent.isComplete ? "Complete" : "Incomplete"}
        </h3>
        <h3>Assigned To: {currentEvent.assignedTo}</h3>
      </div>
    </motion.div>
  );
}
