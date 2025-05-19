import EventTypes from "../../types/EventTypes";
import styles from './Event.module.css'

function Event({ id, title, description, date }: EventTypes) {
  return (
    <section className={styles.section}>
      <h2 className="sub-header">{title}</h2>
      <p className="general-text">{description}</p>
      <p className="general-text">{date}</p>
    </section>
  );
}

export default Event;
