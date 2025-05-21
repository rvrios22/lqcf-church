import { useState } from "react";
import EventTypes from "../../types/EventTypes";
import customFetch from "../../utils/customFetch";
import sortEvents from "../../utils/sortEvents";
interface AddEventFormTypes {
  events?: EventTypes[];
  setEvents?: React.Dispatch<React.SetStateAction<EventTypes[]>>;
}

function AddEventForm({ events, setEvents }: AddEventFormTypes) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    description: "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    };
    try {
      const data = await customFetch<EventTypes>("/api/event", options);
      if (events && setEvents) {
        const sortedEvents = sortEvents([...events, data]);
        setEvents(sortedEvents);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setFormData({ title: "", date: "", description: "" });
    }
  };
  return (
    <section>
      <h2 className="sub-header">Add Event</h2>
      <form action="" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          value={formData.title}
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          required
        />
        <input
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          value={formData.date}
          type="date"
          name="date"
          id="date"
          required
        />
        <textarea
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          value={formData.description}
          name="description"
          id="description"
          placeholder="Description"
          required
        ></textarea>
        <input type="submit" value="Submit" className="button" />
      </form>
    </section>
  );
}

export default AddEventForm;
