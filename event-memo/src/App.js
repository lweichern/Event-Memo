import React, { useState, useEffect } from "react";
import Events from "./components/Events";
import Form from "./components/Form";
import { nanoid } from "nanoid";
import Instructions from "./components/Instructions";
import Sort from "./components/Sort";
import { useSelector } from "react-redux";
import Login from "./components/Login";
import SignOut from "./components/SignOut";
import UserDetails from "./components/UserDetails";
import Popup from "./components/Popup";
import { AnimatePresence } from "framer-motion";

export default function App() {
  // get from local storage
  const [events, setEvents] = useState(
    JSON.parse(localStorage.getItem("eventlist")) || []
  );

  // Event details
  const [eventTask, setEventTask] = useState("");
  const [eventDate, setEventDate] = useState(todayDate);
  const [eventNoOfPersons, setEventNoOfPersons] = useState("");
  const [eventAssignedTo, setEventAssignedTo] = useState("Bob");
  const [eventLocation, setEventLocation] = useState("");
  const [dragId, setDragId] = useState();
  const loginUser = useSelector((state) => state.user.loginUser);
  const [openPopup, setOpenPopup] = useState(false);
  const [currentEventId, setCurrentEventId] = useState("");

  // variable to check if a user is logged in
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  function datePadding(number) {
    if (number.toString().length === 1) {
      return "0" + number;
    } else {
      return number;
    }
  }

  function todayDate() {
    return `${new Date().getFullYear()}-${datePadding(
      new Date().getMonth() + 1
    )}-${datePadding(new Date().getDate())}`;
  }

  useEffect(
    // store to local storage
    function () {
      localStorage.setItem("eventlist", JSON.stringify(events));
    },
    [events]
  );

  function handleEventInput(event) {
    setEventTask(event.target.value);
  }

  function handleEventLocation(event) {
    setEventLocation(event.target.value);
  }

  function handleEventNoOfPersons(event) {
    setEventNoOfPersons(event.target.value);
  }

  function handleEventAssignedTo(event) {
    setEventAssignedTo(event.target.value);
  }

  function handleEventDate(event) {
    setEventDate(event.target.value);
  }

  // Submit function
  function handleSubmit(event) {
    event.preventDefault();

    const newEvent = {
      id: nanoid(),
      task: eventTask,
      date: eventDate,
      isComplete: false,
      location: eventLocation,
      noOfPersons: eventNoOfPersons,
      assignedTo: eventAssignedTo,
      order: events.length + 1,
    };

    // Reset each input after submit
    setEventTask("");
    setEventAssignedTo("Bob");
    setEventLocation("");
    setEventNoOfPersons(0);
    setEventDate(todayDate);

    setEvents((prevEvents) => [...prevEvents, newEvent]);
  }

  // Toggle completion status
  function toggleComplete(id) {
    setEvents((prevEvents) =>
      prevEvents.map((event) => {
        return event.id === id
          ? { ...event, isComplete: !event.isComplete }
          : event;
      })
    );
  }

  // Delete function
  const deleteEventItem = (id) => (event) => {
    console.log(event);
    event.stopPropagation();
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  // Sort functions
  function sortEventByComplete() {
    const newArray = [];

    events.map((event) => {
      event.isComplete ? newArray.unshift(event) : newArray.push(event);
    });

    setEvents(newArray);
  }

  function sortEventByIncomplete() {
    const newArray = [];

    events.map((event) => {
      event.isComplete ? newArray.unshift(event) : newArray.push(event);
    });

    setEvents(newArray.reverse());
  }

  function sortEventByEarliestDate() {
    const newArrayByDate = events.sort((a, b) => {
      return Date.parse(a.date) - Date.parse(b.date);
    });

    const newArray = [...newArrayByDate];

    setEvents(newArray);
  }

  function sortEventByLatestDate() {
    const newArrayByDate = events.sort((a, b) => {
      return Date.parse(a.date) - Date.parse(b.date);
    });

    const newArray = [...newArrayByDate];

    setEvents(newArray.reverse());
  }

  function sortByAlphabeticalOrder() {
    const newArray = events.sort((a, b) => a.task.localeCompare(b.task));

    const newArray2 = [...newArray];

    setEvents(newArray2);
  }

  function handleDrag(event) {
    setDragId(event.target.id);
  }

  function handleDrop(ev) {
    const dragevents = events.find((event) => event.id === dragId);
    const dropevents = events.find((event) => event.id === ev.target.id);

    console.log(ev.target.id);

    const dragEventOrder = dragevents.order;
    const dropEventOrder = dropevents.order;

    const neweventsOrder = events.map((event) => {
      if (event.id === dragId) {
        event.order = dropEventOrder;
      }

      if (event.id === ev.target.id) {
        event.order = dragEventOrder;
      }

      return event;
    });

    setEvents(neweventsOrder);
  }

  function updateEventOrder() {
    setEvents((prevEvents) =>
      prevEvents.map((event, index) => {
        return {
          ...event,
          order: index + 1,
        };
      })
    );
  }

  function handleSortChange(event) {
    switch (event.target.value) {
      case "earliestDate":
        sortEventByEarliestDate();
        break;

      case "latestDate":
        sortEventByLatestDate();
        break;

      case "complete":
        sortEventByComplete();
        break;

      case "incomplete":
        sortEventByIncomplete();
        break;

      case "alphabetical":
        sortByAlphabeticalOrder();
        break;
    }

    updateEventOrder();
  }

  const handlePopup = (id) => {
    setOpenPopup(!openPopup);
    setCurrentEventId(id);
  };

  // Filter the events assigned to different individuals upon login
  const filteredEventElements = events.filter(
    (item) => item.assignedTo === loginUser
  );

  const eventElements = filteredEventElements
    .sort((a, b) => a.order - b.order)
    .map((eventItem) => (
      <Events
        key={eventItem.id}
        task={eventItem.task}
        date={eventItem.date}
        location={eventItem.location}
        noOfPersons={eventItem.noOfPersons}
        assignedTo={eventItem.assignedTo}
        isComplete={eventItem.isComplete}
        handleToggle={toggleComplete}
        id={eventItem.id}
        deleteEvent={deleteEventItem}
        handleDrag={handleDrag}
        handleDrop={handleDrop}
        order={eventItem.order}
        handlePopup={handlePopup}
      />
    ));

  return (
    <main>
      {isLoggedIn ? (
        <>
          <SignOut />
          <Instructions />
          <div className="eventlist-container">
            <h1 className="header-title">Eventlist</h1>
            <Form
              eventTask={eventTask}
              eventDate={eventDate}
              eventLocation={eventLocation}
              eventNoOfPersons={eventNoOfPersons}
              eventAssignedTo={eventAssignedTo}
              handleSubmit={handleSubmit}
              handleEventInput={handleEventInput}
              handleEventDate={handleEventDate}
              handleEventLocation={handleEventLocation}
              handleEventNoOfPersons={handleEventNoOfPersons}
              handleEventAssignedTo={handleEventAssignedTo}
            />
            <Sort handleChange={handleSortChange} />
            <AnimatePresence>
              <div className="events-container">{eventElements}</div>
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {openPopup && (
              <Popup
                handlePopup={handlePopup}
                id={currentEventId}
                allEvents={events}
              />
            )}
          </AnimatePresence>
        </>
      ) : (
        <>
          <UserDetails />
          <Login />
        </>
      )}
    </main>
  );
}
