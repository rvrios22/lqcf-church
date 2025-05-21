import EventTypes from "../types/EventTypes"

const sortEvents = (events: EventTypes[]): EventTypes[] => {
    return [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export default sortEvents