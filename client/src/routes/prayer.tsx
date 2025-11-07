import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { addToast, Button, Form, Input, Textarea } from "@heroui/react";
import { useForm } from "@formspree/react";
import { logError } from "../utils/axiom";

export const Route = createFileRoute("/prayer")({
  component: RouteComponent,
});

function RouteComponent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [state, handleSubmit] = useForm(import.meta.env.VITE_FORM_SPREE);
  const variant = "bordered";

  useEffect(() => {
    if (state.succeeded) {
      addToast({
        title: "Thank you",
        description:
          "We will keep you in prayer and reach out if we see fit. God bless!",
      });
      setFormData({ name: "", email: "", message: "" });
    }

    if (state.errors) {
      addToast({
        title: "Something went wrong",
        description:
          "There's seems to be an issue in our system. Feel free to call our church or email us and we will pray for you.",
        color: "danger",
      });
      logError(new Error("something went wrong"), "Prayer Form");
    }
  }, [state.succeeded, state.errors]);

  return (
    <>
      <h1 className="sub-header">Why Should We Pray?</h1>
      <p className="general-text">
        God commands that we join with other faithful Christians to pray over
        those who are seeking prayer.
      </p>
      <p className="bible-text">
        "Is any sick among you? Let him call for the elders of the church; and
        let them pray over him, anointing him with oil in the name of the Lord:
        And the prayer of faith shall save the sick, and the Lord shall raise
        him up; and if he have committed sins, they shall be forgiven him.”{" "}
        <span className="citation">James 5:14-15</span>
      </p>
      <h2 className="sub-header">Are You In Need of Prayer?</h2>
      <p className="general-text">
        Please full out our form to send us your prayer request and we will pray
        for you.
      </p>
      <Form
        onSubmit={handleSubmit}
        className="mx-auto mt-4 mb-8 w-[90%] rounded-3xl border-2 border-gray-200 p-4 shadow-sm lg:w-[70%]"
      >
        <Input
          label="Name"
          variant={variant}
          type="text"
          id="name"
          isRequired
          name="user_name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <Input
          label="Email"
          variant={variant}
          type="email"
          id="email"
          isRequired
          name="user_email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <Textarea
          id="request"
          isRequired
          variant={variant}
          label="Prayer Request"
          placeholder="How can we pray for you?"
          name="message"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
        />
        <Button type="submit" value="Submit" className="general-text button">
          Submit
        </Button>
      </Form>
    </>
  );
}
