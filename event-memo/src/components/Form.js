import React from "react";
import { faTasks, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { users } from "../Users";

export default function Form(props) {
  return (
    <form onSubmit={props.handleSubmit} className="form-input">
      <div className="input-container">
        <input
          type="text"
          value={props.eventTask}
          placeholder="Enter items..."
          onChange={props.handleEventInput}
          className="input input-name"
          required
        />
        <input
          type="text"
          value={props.eventLocation}
          placeholder="Enter Location"
          onChange={props.handleEventLocation}
          className="input input-location"
          required
        />
        <input
          type="number"
          value={props.eventNoOfPersons}
          onChange={props.handleEventNoOfPersons}
          className="input input-persons"
          min="0"
          placeholder="No of People Attending"
          required
        />
        <select
          type="text"
          value={props.eventAssignedTo}
          placeholder="Enter Assigned Person"
          onChange={props.handleEventAssignedTo}
          className="input input-assigned-to"
        >
          {users.map((user) => {
            return (
              <option key={user.name} value={user.name}>
                {user.name}
              </option>
            );
          })}
        </select>
        <input
          type="date"
          onChange={props.handleEventDate}
          value={props.eventDate}
          className="input input-date"
        />
      </div>
      <div>
        <input type="submit" className="submit-btn" />
      </div>
    </form>
  );
}
