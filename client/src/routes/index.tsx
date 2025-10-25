import { createFileRoute } from "@tanstack/react-router";
import { useWindowDimensions } from "../hooks/useWindowDimensions";
import HeroImg from "../components/HeroImg/HeroImg";
import whatsGoingOnData from "../../public/whatsGoingOnData";
import WhatsGoingOnSquare from "../components/WhatsGoingOnSquare/WhatsGoingOnSquare";
import { Button } from "@heroui/react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { width, initialHeightRef } = useWindowDimensions();
  return (
    <>
      <HeroImg
        width={width}
        height={initialHeightRef.current ?? 0}
        img="lqcfHome.avif"
        text="La Quinta Christian Fellowship Church"
      />
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
        bestowed on us in the Beloved.
        <span className="citation">Ephesians 1:3-6</span>
      </p>
      <section
        style={{
          display: width >= 700 ? "grid" : "block",
          gridTemplateColumns: width >= 700 ? "1fr 1fr" : "none",
          padding: width >= 700 ? "1em" : "0",
          gap: "1em",
        }}
      >
        {whatsGoingOnData.map(({ title, desc, link, src }, idx) => (
          <WhatsGoingOnSquare
            key={idx}
            title={title}
            desc={desc}
            src={src}
            link={link}
            height={initialHeightRef.current ?? 0}
            width={width}
          />
        ))}
      </section>
    </>
  );
}
