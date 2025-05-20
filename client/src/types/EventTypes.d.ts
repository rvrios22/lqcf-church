interface EventTypes {
  id: number;
  title: string;
  description: string;
  date: string;
  events?: EventTypes[]
  setEvents?: React.Dispatch<React.SetStateAction<EventTypes[]>>
}

export default EventTypes