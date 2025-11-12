import { useState } from "react";
import PastorMessage from "../types/PastorMessage";
import { addToast, Button, Form, Input, Textarea } from "@heroui/react";
import customFetch from "../utils/customFetch";
import { logError } from "../utils/axiom";

function PastorsHeartEditor({ message, author, coramDeo, id }: PastorMessage) {
  const [formData, setFormData] = useState({
    message: message,
    author: author,
    coramDeo: coramDeo,
    id: id,
  });
  const variant = "bordered";
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    };
    try {
      await customFetch<PastorMessage>("pastorMessage/1", options);
      addToast({ title: "message successfully updated" });
    } catch (e) {
      addToast({ title: `Something went wrong: ${e}` });
      logError(e as Error, "/api/pastorMessage");
    }
  };
  return (
    <>
      <h2 className="sub-header">Edit Pastor's Heart</h2>
      <Form onSubmit={handleSubmit}>
        <Textarea
          label="Message"
          variant={variant}
          name="message"
          id="message"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
        />
        <Input
          label="Author"
          variant={variant}
          type="text"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
        />
        <Textarea
          label="Coram Deo"
          variant={variant}
          name="coramDeo"
          id="coramDeo"
          value={formData.coramDeo}
          onChange={(e) =>
            setFormData({ ...formData, coramDeo: e.target.value })
          }
        />
        <Button type="submit" className="general-text button">
          Edit
        </Button>
      </Form>
    </>
  );
}

export default PastorsHeartEditor;
