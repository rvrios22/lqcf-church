import PrayerForm from "@/components/PrayerForm";

export default function Page() {
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
      <PrayerForm />
    </>
  );
}
