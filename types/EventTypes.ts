interface EventTypes {
  _id: string;
  title: string;
  desc: string;
  date: string;
  _creationTime?: number;
  events?: EventTypes[];
  setEvents?: React.Dispatch<React.SetStateAction<EventTypes[]>>;
}

export default EventTypes;
