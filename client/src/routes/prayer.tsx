import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

export const Route = createFileRoute("/prayer")({
  component: RouteComponent,
});

function RouteComponent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const formRef = useRef<HTMLFormElement | null>(null);
  const buttonRef = useRef<HTMLInputElement | null>(null);

  const Toast = Swal.mixin({
    toast: true,
    position: "center",
    showConfirmButton: false,
    timer: 4000,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        formRef.current!,
        import.meta.env.VITE_PUBLIC_KEY
      );
      Toast.fire({
        title:
          "Thank you for your request. We will keep you in prayer and reach out if we see fit. God bless!",
        background: "#F5F6F7",
        color: "black",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      Toast.fire({
        title:
          "So sorry, there's seems to be an issue in our system. Feel free to call our church or email us and we will pray for you. Thank you.",
        icon: "error",
        background: "#F5F6F7",
        color: "black",
      });
      console.error(err);
    } finally {
      buttonRef.current!.blur();
    }
  };
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
      <form ref={formRef} onSubmit={handleSubmit}>
        <label className="general-text" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          required
          name="user_name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <label className="general-text" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          required
          name="user_email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <label className="general-text" htmlFor="request">
          Prayer Request
        </label>
        <textarea
          id="request"
          required
          name="message"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
        ></textarea>
        <input
          type="submit"
          value="Submit"
          className="general-text button"
          ref={buttonRef}
        />
      </form>
    </>
  );
}
