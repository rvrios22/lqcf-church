import { useState } from "react";
import EventTypes from "../../types/EventTypes";
import styles from "./Event.module.css";
import customFetch from "../../utils/customFetch";
import sortEvents from "../../utils/sortEvents";
import { useUser } from "../../hooks/useUser";
import dateFormat from "../../utils/dateFormat";
import { logError } from "../../utils/axiom";
function Event({
  id,
  title,
  description,
  date,
  events,
  setEvents,
}: EventTypes) {
  const [isEventEditable, setIsEventEditable] = useState<boolean>(false);
  const [updatedEventData, setUpdatedEventData] = useState({
    title,
    description,
    date,
  });
  const { user } = useUser();

  const handleDelete = async (id: number) => {
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    };
    try {
      const response = await fetch(`/api/event/${id}`, options);
      if (!response.ok) return;
      // const data = await response.json();
      if (events && setEvents) {
        setEvents(events.filter((e) => e.id !== id));
      }
    } catch (e) {
      logError(e as Error, `/api/event/${id}`);
    }
  };

  const handleEdit = async (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    e.preventDefault();
    const options: RequestInit = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(updatedEventData),
    };
    try {
      const data = await customFetch<EventTypes>(`/api/event/${id}`, options);
      const updatedEvents = events?.map((event) =>
        event.id === id ? { ...event, ...data } : event
      );
      if (updatedEvents && setEvents) {
        const sortedEvents = sortEvents(updatedEvents);
        setEvents(sortedEvents);
      }
      setIsEventEditable(false);
    } catch (e) {
      logError(e as Error, `/api/event/${id}`);
    }
  };

  const readJSX = (
    <>
      <h2 className="sub-header">{title}</h2>
      <p className="general-text">{description}</p>
      <p className="general-text">{dateFormat(date)}</p>
      {user && <button onClick={() => handleDelete(id)}>Delete</button>}
      {user && (
        <button onClick={() => setIsEventEditable(!isEventEditable)}>
          Edit
        </button>
      )}
    </>
  );
  const editJSX = (
    <form onSubmit={(e) => handleEdit(e, id)}>
      <input
        type="text"
        name="title"
        id="title"
        value={updatedEventData.title}
        onChange={(e) =>
          setUpdatedEventData({ ...updatedEventData, title: e.target.value })
        }
      />
      <input
        type="date"
        name="date"
        id="date"
        value={updatedEventData.date}
        onChange={(e) =>
          setUpdatedEventData({ ...updatedEventData, date: e.target.value })
        }
      />
      <textarea
        name="description"
        id="description"
        value={updatedEventData.description}
        onChange={(e) =>
          setUpdatedEventData({
            ...updatedEventData,
            description: e.target.value,
          })
        }
      ></textarea>
      <input type="submit" value="Edit" className="button" />
      <button onClick={() => setIsEventEditable(!isEventEditable)}>
        Cancel
      </button>
    </form>
  );
  return (
    <section className={styles.section}>
      {isEventEditable ? editJSX : readJSX}
    </section>
  );
}

export default Event;
