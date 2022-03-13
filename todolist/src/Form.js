import React from "react";
import { faTasks, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { users } from "./Users";

export default function Form(props) {
  return (
    <form onSubmit={props.handleSubmit} className="form-input">
      <input
        type="text"
        value={props.todoTask}
        placeholder="Enter items..."
        onChange={props.handleTodoInput}
        className="input-name"
        required
      />
      <input
        type="text"
        value={props.todoLocation}
        placeholder="Enter Location"
        onChange={props.handleTodoLocation}
        className="input input-location"
      />
      <input
        type="number"
        value={props.todoNoOfPersons}
        onChange={props.handleTodoNoOfPersons}
        className="input input-persons"
        min="0"
      />
      <select
        type="text"
        value={props.todoAssignedTo}
        placeholder="Enter Assigned Person"
        onChange={props.handleTodoAssignedTo}
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
        onChange={props.handleTodoDate}
        value={props.todoDate}
        className="input-date"
      />
      <input type="submit" className="submit-btn" />
    </form>
  );
}