import { createFileRoute } from "@tanstack/react-router";
import Event from "../components/Event/Event";
import EventTypes from "../types/EventTypes";
import AddEventForm from "../components/AddEventForm/AddEventForm";
import { useState } from "react";
import customFetch from "../utils/customFetch";
import { useUser } from "../hooks/useUser";

export const Route = createFileRoute("/events")({
  component: RouteComponent,
  loader: () => customFetch("/api/event"),
});

function RouteComponent() {
  const { user } = useUser();
  const e = Route.useLoaderData();
  const [events, setEvents] = useState<EventTypes[]>(e);
  return (
    <>
      <h1 className="sub-header">Upcoming Events:</h1>
      {events.map(({ id, title, description, date }: EventTypes) => (
        <Event
          key={id}
          id={id}
          title={title}
          description={description}
          date={date}
          events={events}
          setEvents={setEvents}
        />
      ))}
      {user && <AddEventForm events={events} setEvents={setEvents} />}
    </>
  );
}
