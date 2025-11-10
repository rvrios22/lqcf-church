import { createFileRoute } from "@tanstack/react-router";
import HeroImg from "../components/HeroImg";
import { useState } from "react";
import PDFModal from "../components/PDFModal";
import PDFUpload from "../components/PDFUpload";
import StudyTypes from "../types/StudyTypes.d";
import PDFTypes from "../types/PDFTypes";
import { useUser } from "../hooks/useUser";
import { queryClient } from "../components/Providers";
import customFetch from "../utils/customFetch";
import EventTypes from "../types/EventTypes";
import getDatesFromEvents from "../utils/getDatesFromEvents";
import dateFormat from "../utils/dateFormat";
export const Route = createFileRoute("/womens-study")({
  component: RouteComponent,
  loader: async () => {
    const [studies, initialPDFs, events] = await Promise.all([
      queryClient.ensureQueryData({
        queryKey: ["study"],
        queryFn: () => customFetch<StudyTypes[]>("study"),
      }),
      queryClient.ensureQueryData({
        queryKey: ["pdf", import.meta.env.VITE_WOMEN_STUDY_NAME],
        queryFn: async () =>
          customFetch<PDFTypes[]>(
            `pdf/${import.meta.env.VITE_WOMEN_STUDY_NAME}`,
          ),
      }),
      queryClient.ensureQueryData({
        queryKey: ["event"],
        queryFn: async () => customFetch<EventTypes[]>("event"),
      }),
    ]);
    return { studies, initialPDFs, events };
  },
});

function RouteComponent() {
  const loaderData = Route.useLoaderData();
  const { studies, initialPDFs, events } = loaderData;
  const [pdfs, setPdfs] = useState<PDFTypes[]>(initialPDFs);
  const { user } = useUser();

  const dates = getDatesFromEvents(events, "women");
  return (
    <>
      <HeroImg name="womensStudy" text="Women's Study" />
      <h1 className="sub-header">Women's Study</h1>
      <img
        src="/api/static/imgs/womensStudySubHeader.webp"
        alt="Women's Group"
        className="max-w[600px] m-auto h-[30vh] max-h-[450px] w-4/5 rounded-2xl object-cover object-top shadow-md"
        width={600}
        height={450}
      />
      <p className="general-text">
        Women joining together in the Word, fellowship, encouragement, and
        prayer; to glorify God and enjoy Him forever! The call of this ministry
        is to bring us women into union with Christ, through the Holy Spirit by
        the reading, studying, and discussion of Holy Scriptures. Each gathering
        we magnify God in His Holiness and come to a proper view and position of
        self, in comparison to Christ Jesus our Lord and Savior. We glorify God
        in each of these studies, while building confidence and familiarity in
        the Scriptures, as well as, empowering one another in prayer, and
        creating a strong sisterhood in Christ. Each aspect of the ministry
        helps to equip and build confidence in sharing the Gospel and prayer
        with those we encounter. <br></br>Bible studies are hosted in a casual
        environment at Jennifer's home, on the 2nd and 4th Friday of each month
        (any variations will be posted in the calendar) at 6:30 pm. Bring your
        Bibles and bring a treat or dish to share (if you can). Beverages,
        plates, and utensils are always provided. <br></br>Our current study is
        on Terms & Definitions. We are going through each block of terms that
        are broken up into: General Terms, Church Service Terms, Theological
        Terms, Commandment/Covenant Terms. The intent of this study is to grow
        in the knowledge of Heavenly Father, His Son Christ Jesus, and to be in
        fellowship with the Holy Spirit. Prayerfully, through each study we will
        have a better understanding of each of the terms, why they are
        important, where to find them in the Bible, and how to apply them to our
        daily worship and praise. Our previous study was in the Attributes of
        God. Each study is unique and created to be a stand-alone study, but
        pairs beautifully with the previous and upcoming studies. This allows
        the opportunity for ladies to join in when their schedule permits. To
        see a list of all of the outlines in this series click.
      </p>
      <PDFModal
        pdfs={pdfs}
        setPdfs={setPdfs}
        studies={studies}
        env={import.meta.env.VITE_WOMEN_STUDY_NAME}
      />
      <p className="general-text">
        Jennifer has a passion for learning and teaching Scripture, and a heart
        for encouraging and leading the women in this ministry. Please feel free
        to contact Jennifer at{" "}
        <a className="underline" href="tel:760-887-6523">
          760-887-6523
        </a>{" "}
        (call or text), or email:{" "}
        <a className="underline" href="mailto:jenniferclaire77@gmail.com">
          jenniferclaire77@gmail.com
        </a>{" "}
        with any questions about this ministry.
      </p>
      <p className="general-text">
        Our women will be meeting on {""}
        {dates.map(({ date }, idx) =>
          // handles case where there is only one entry in array so it does not add "and"
          idx === dates.length - 1 && dates.length !== 1 ? (
            <span key={date}> and {dateFormat(date)}</span>
          ) : (
            <span key={date}>{dateFormat(date)}</span>
          ),
        )}{" "}
        at Jennifer's home.
      </p>
      {user && <PDFUpload studies={studies} />}
    </>
  );
}
