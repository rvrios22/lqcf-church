import { createFileRoute } from "@tanstack/react-router";
import Event from "../components/Event/Event";
import EventTypes from "../types/EventTypes";
import AddEventForm from "../components/AddEventForm/AddEventForm";
import { useState } from "react";
import customFetch from "../utils/customFetch";
import { useUser } from "../hooks/useUser";
import { queryClient } from "../components/Providers";

export const Route = createFileRoute("/events")({
  component: RouteComponent,
  loader: async () => {
    const events = await queryClient.ensureQueryData({
      queryKey: ["event"],
      queryFn: () => customFetch<EventTypes[]>("event"),
    });
    return events;
  },
});

function RouteComponent() {
  const { user } = useUser();
  const eventData = Route.useLoaderData();
  const [events, setEvents] = useState<EventTypes[]>(eventData);
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
