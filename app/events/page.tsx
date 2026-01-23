"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Event from "@/components/Event";
import EventTypes from "@/types/EventTypes";
import { useEffect, useState } from "react";

export default function Page() {
  const eventsData = useQuery(api.events.getEvents);
  const [events, setEvents] = useState<EventTypes[]>([]);

  useEffect(() => {
    setEvents(eventsData || []);
  }, [eventsData]);
  console.log(events);
  return (
    <main className="min-h-[60vh]">
      <h1 className="sub-header">Upcoming Events:</h1>
      {events &&
        events.map(({ _id, title, desc, date }: EventTypes) => (
          <Event
            key={_id}
            _id={_id}
            title={title}
            desc={desc}
            date={date}
            events={events}
            setEvents={setEvents}
          />
        ))}
      {/* {user && <AddEventForm events={events} setEvents={setEvents} />} */}
    </main>
  );
}
