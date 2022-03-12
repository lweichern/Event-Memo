import React from "react";
import { faTasks, faCalendar } from "@fortawesome/free-solid-svg-icons";

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
        type="date"
        onChange={props.handleTodoDate}
        value={props.todoDate}
        className="input-date"
      />
      <input type="submit" className="submit-btn" />
    </form>
  );
}
