import { useState } from "react";
import EventTypes from "@/types/EventTypes";
import sortEvents from "@/utils/sortEvents";
import dateFormat from "../utils/dateFormat";
import { logError } from "@/utils/axiom";
import { Button, Input, Textarea } from "@heroui/react";
function Event({
  _id,
  title,
  desc,
  date,
  events,
  setEvents,
}: EventTypes) {
  const [isEventEditable, setIsEventEditable] = useState<boolean>(false);
  const [updatedEventData, setUpdatedEventData] = useState({
    title,
    desc,
    date,
  });
//   const { user } = useUser();

  

  const readJSX = (
    <>
      <h2 className="sub-header ml-0 text-left">{title}</h2>
      <p className="general-text my-0 ml-0 text-left">{desc}</p>
      <p className="general-text mt-0 ml-0 text-left text-sm">
        {dateFormat(date)}
      </p>
      {/* {user && (
        <Button color="danger" onPress={() => handleDelete(id)}>
          Delete
        </Button>
      )}
      {user && (
        <Button
          color="warning"
          onPress={() => setIsEventEditable(!isEventEditable)}
        >
          Edit
        </Button>
      )} */}
    </>
  );
  const editJSX = (
    <form onSubmit={(e) => handleEdit(e, id)}>
      <Input
        type="text"
        name="title"
        id="title"
        value={updatedEventData.title}
        onChange={(e) =>
          setUpdatedEventData({ ...updatedEventData, title: e.target.value })
        }
      />
      <Input
        type="date"
        name="date"
        id="date"
        value={updatedEventData.date}
        onChange={(e) =>
          setUpdatedEventData({ ...updatedEventData, date: e.target.value })
        }
      />
      <Textarea
        name="desc"
        id="desc"
        value={updatedEventData.desc}
        onChange={(e) =>
          setUpdatedEventData({
            ...updatedEventData,
            desc: e.target.value,
          })
        }
      />
      <Button type="submit" color="success">
        Edit
      </Button>
      <Button
        color="danger"
        onPress={() => setIsEventEditable(!isEventEditable)}
      >
        Cancel
      </Button>
    </form>
  );
  return (
    <figure className="mx-auto my-0.5 w-[90%] border-b-1 last-of-type:border-b-0">
      {isEventEditable ? editJSX : readJSX}
    </figure>
  );
}

export default Event;
