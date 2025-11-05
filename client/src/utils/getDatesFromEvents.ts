import EventTypes from "../types/EventTypes";

const getDatesFromEvents = (events: EventTypes[], route: string) => {
  const regex = new RegExp(`\\b${route}\\b`, "i");
  const dates = events.filter(({ title }) => regex.test(title));
  return dates;
};

export default getDatesFromEvents;
