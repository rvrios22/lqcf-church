import { createFileRoute } from "@tanstack/react-router";
import HeroImg from "../components/HeroImg";
import whatsGoingOnData from "../../public/whatsGoingOnData";
import WhatsGoingOnSquare from "../components/WhatsGoingOnSquare";
import customFetch from "../utils/customFetch";
import { useEffect, useState } from "react";
import type PastorMessage from "../types/PastorMessage";
export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [message, setMessage] = useState<PastorMessage>();
  useEffect(() => {
    const fetchPastorMessage = async () => {
      console.log("asdfa");
      const message = await customFetch("/api/pastorMessage");
      setMessage(message);
    };
    fetchPastorMessage();
  }, []);
  return (
    <>
      <HeroImg name="lqcfHome" text="La Quinta Christian Fellowship Church" />
      <p className="general-text">
        La Quinta Christian Fellowship Church is a non-denominational
        evangelical church committed to seeing redeemed, transformed individuals
        and community through the story of God's salvation. We gladly invite you
        to join us for Sunday morning worship service.
      </p>
      <p className="bible-text">
        Blessed be the God and Father of our Lord Jesus Christ, who has blessed
        us with every spiritual blessing in the heavenly places in Christ, just
        as He chose us in Him before the foundation of the world, that we would
        be holy and blameless before Him. In love He predestined us to adoption
        as sons through Jesus Christ to Himself, according to the kind intention
        of His will, to the praise of the glory of His grace, which He freely
        bestowed on us in the Beloved. Ephesians 1:3-6
      </p>
      <section className="mx-auto w-[90%] px-4 md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3">
        {whatsGoingOnData.map(({ title, desc, link, name, alt }, idx) => (
          <WhatsGoingOnSquare
            key={idx}
            title={title}
            desc={desc}
            name={name}
            link={link}
            alt={alt}
          />
        ))}
      </section>
      <section className="mb-4">
        <h3 className="sub-header">From Our Pastors Hearts</h3>
        {message && (
          <>
            <p className="general-text">{message.message}</p>
            <p className="bold w-[90%] text-right">- {message.author}</p>
          </>
        )}
      </section>
    </>
  );
}
