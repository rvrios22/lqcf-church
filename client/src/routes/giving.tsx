import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/giving")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <h1 className="sub-header">Tithes and Offerings</h1>
      <p className="bible-text">
        “Praise God from whom all blessings flow… Praise God, our portion here
        below!”
      </p>
      <p className="general-text">
        At La Quinta Christian Fellowship, we are called to glorify God in all
        acts of worship, including tithes and offerings. Faithful giving is an
        act of worship and should be given regularly, in love, as well as
        faithfully, with a heart of gratitude and thanksgiving.
      </p>
      <p className="bible-text">
        Now I say this: the one who sows sparingly will also reap sparingly, and
        the one who sows generously will also reap generously. Each one must do
        just as he has decided in his heart, not reluctantly or under
        compulsion, for God loves a cheerful giver. And God is able to make all
        grace overflow to you, so that, always having all sufficiency in
        everything, you may have an abundance for every good deed; as it is
        written: “He scattered abroad, he gave to the poor, His righteousness
        endures forever.” Now He who supplies seed to the sower and bread for
        food will supply and multiply your seed for sowing and increase the
        harvest of your righteousness; you will be enriched in everything for
        all liberality, which through us is producing thanksgiving to God. For
        the ministry of this service is not only fully supplying the needs of
        the saints, but is also overflowing through many thanksgivings to God.
        Because of the proof given by this ministry, they will glorify God for
        your obedience to your confession of the gospel of Christ and for the
        liberality of your contribution to them and to all, while they also, by
        prayer on your behalf, yearn for you because of the surpassing grace of
        God in you. Thanks be to God for His indescribable gift!{" "}
        <span className="citation">2 Corinthians 9:6-15</span>
      </p>
      <h2 className="sub-header">Ways To Give:</h2>
      <p className="general-text">
        Give in person during our Sunday morning service or Wednesday evening
        service
      </p>
      <p className="general-text">
        Mail your offering to: P.O. Box 676 La Quinta, CA 92247
      </p>
      <p className="general-text">
        Give via our online portal below. We use Zeffy, a non-profit
        organization. Zeffy does not charge any online fees so your whole
        donation is given directly to the ministry!
        <span className="citation block text-wrap text-medium">
          If you feel more comfortable giving via Zeffy's site you can can give
          online by clicking{" "}
          <a
            href="https://www.zeffy.com/en-US/donation-form/5da45795-5ea3-42d7-8d39-bb107f0ce0db"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            here
          </a>
        </span>
      </p>
      <div className="no-scrollbar relative h-[90vh] w-full lg:h-[70vh]">
        <iframe
          title="Donation form powered by Zeffy"
          className="absolute top-0 right-0 bottom-0 left-0 h-full w-full border-0"
          src="https://www.zeffy.com/embed/donation-form/5da45795-5ea3-42d7-8d39-bb107f0ce0db"
          allow="payment *"
        ></iframe>
      </div>
    </>
  );
}
