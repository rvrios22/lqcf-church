import { createFileRoute } from "@tanstack/react-router";
import HeroImg from "../components/HeroImg";
import whatsGoingOnData from "../../public/whatsGoingOnData";
import WhatsGoingOnSquare from "../components/WhatsGoingOnSquare";
import customFetch from "../utils/customFetch";
import { useUser } from "../hooks/useUser";
import type PastorMessage from "../types/PastorMessage";
import { queryClient } from "../components/Providers";
import PastorsHeartEditor from "../components/PastorsHeartEditor";
export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: async () => {
    const message = await queryClient.ensureQueryData({
      queryKey: ["pastorMessage"],
      queryFn: () => customFetch<PastorMessage>("pastorMessage"),
    });
    return message;
  },
});

function RouteComponent() {
  const { user } = useUser();
  const data = Route.useLoaderData() ?? {
    message: "",
    author: "",
    coramDeo: "",
  };
  const { message, author, coramDeo } = data;

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
        {user ? (
          <PastorsHeartEditor
            message={message}
            author={author}
            coramDeo={coramDeo}
            id={1}
          />
        ) : (
          message && (
            <>
              <h3 className="sub-header">From Our Pastors Hearts</h3>
              <p className="general-text text-left whitespace-pre-line">
                {message}
              </p>
              <p className="w-[90%] text-right font-black">- {author}</p>
              <p className="general-text text-left whitespace-pre-line">
                <span className="font-bold">Coram Deo: </span>
                {coramDeo}
              </p>
            </>
          )
        )}
      </section>
    </>
  );
}
