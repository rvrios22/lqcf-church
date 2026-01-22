"use client";

import { useState, useEffect } from "react";
import { addToast, Button, Form, Input, Textarea } from "@heroui/react";
import { useForm } from "@formspree/react";
// import { logError } from "../utils/axiom";

function PrayerForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORM_SPREE!);
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
      // logError(new Error("something went wrong"), "Prayer Form");
    }
  }, [state.succeeded, state.errors]);
  return (
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
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
      />
      <Button type="submit" value="Submit" className="general-text button">
        Submit
      </Button>
    </Form>
  );
}

export default PrayerForm;
