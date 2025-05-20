import EventTypes from "../../types/EventTypes";
import styles from "./Event.module.css";

function Event({
  id,
  title,
  description,
  date,
  events,
  setEvents,
}: EventTypes) {
  const handleDelete = async (id: number) => {
    const options = {
      method: "DELETE",
      headers: {
        // Authorization: `Bearer ${sessionStorage.getItem("token")}`,
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
      console.error(e);
    }
  };
  return (
    <section className={styles.section}>
      <h2 className="sub-header">{title}</h2>
      <p className="general-text">{description}</p>
      <p className="general-text">{date}</p>
      <button onClick={() => handleDelete(id)}>Delete</button>
    </section>
  );
}

export default Event;
