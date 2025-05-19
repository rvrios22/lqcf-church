import { createFileRoute } from "@tanstack/react-router";
import Event from "../components/Event/Event";
import EventTypes from "../types/EventTypes";


const fetchEvents = async () => {
  const response = await fetch("/api/event");
  const data = await response.json();
  return data;
};

export const Route = createFileRoute("/events")({
  component: RouteComponent,
  loader: () => fetchEvents(),
});

function RouteComponent() {
  const events = Route.useLoaderData();
  console.log(events);
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
        />
      ))}
    </>
  );
}
