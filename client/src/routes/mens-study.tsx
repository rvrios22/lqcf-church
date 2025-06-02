import { createFileRoute } from "@tanstack/react-router";
import HeroImg from "../components/HeroImg/HeroImg";
import { useWindowDimensions } from "../hooks/useWindowDimensions";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import PDFModal from "../components/PDFModal/PDFModal";
import PDFUpload from "../components/PDFUpload/PDFUpload";
import fetchStudiesAndPDFs from "../utils/fetchStudiesAndPDFs";
import StudyTypes from "../types/StudyTypes.d";
import PDFTypes from "../types/PDFTypes";
import { useUser } from "../hooks/useUser";
export const Route = createFileRoute("/mens-study")({
  component: RouteComponent,
  loader: () =>
    fetchStudiesAndPDFs<StudyTypes, PDFTypes>(
      "/api/study",
      `/api/pdf/${import.meta.env.VITE_MEN_STUDY_NAME}`
    ),
});

function RouteComponent() {
  const loaderData = Route.useLoaderData();
  const study = loaderData?.[0];
  const pdf = loaderData?.[1];
  const [isModalShowing, setIsModalShowing] = useState<boolean>(false);
  const [studies, setStudies] = useState<StudyTypes[]>(
    Array.isArray(study) ? study : study ? [study] : []
  );
  const [pdfs, setPdfs] = useState<PDFTypes[]>(
    Array.isArray(pdf) ? pdf : pdf ? [pdf] : []
  );
  const { width, initialHeightRef } = useWindowDimensions();
  const { user } = useUser();
  return (
    <>
      <HeroImg
        width={width}
        height={initialHeightRef.current ?? 0}
        img="mensStudyHeader.avif"
        text="Men's Study"
      />
      <h1 className="sub-header">Men's Study</h1>
      <p className="general-text">
        The Book of Revelation cannot be properly interpreted without
        understanding the historic context in which it was written.
        Traditionally ascribed to the hand of the Apostle John during his exile
        on Patmos, it is generally accepted that the book was written during the
        intense persecution of the Christian Faith. <br></br>We know from
        elsewhere in the New Testament that the early Christians were convinced
        that Christ’s Second Coming was near, and undoubtedly this expectation
        was only further fueled during the severe persecution ordered by
        Emperors Nero and especially Domitian, who put Christians to death for
        refusing to worship him as a “god”—after he had proclaimed himself so.{" "}
        <br></br>Given the fact that the early Christians were enduring a
        horrible period of persecution, the main theme of Revelation was to
        provide the 1 st century persecuted Christians (and Christians today)
        with a sense of hope that would encourage them to remain faithful to
        Christ even though at any moment they could endure persecution or even
        be put to death for the Faith. <br></br>Hence, Revelation focuses on the
        ultimate triumph of the Kingdom of God and how the Christians by
        remaining loyal and faithful to Christ, will ultimately reap the rewards
        promised by Christ. <br></br>The vision of the Apostle John recorded in
        Revelation was a reminder from God to the faithful not to give in to
        their enemies, but to remain faithful, hopeful and spiritually strong
        and to be overcomers against all that stands opposed to and against Gods
        chosen people, the church. <br></br>Our men's ministry is led by Pastor
        Curtis Claire. We meet at 7:30 AM in the sanctuary of the church every
        2nd and 4th Saturday of each month. Please see our{" "}
        <Link to="/events">
          <span className="underline">events</span>
        </Link>{" "}
        page to verify our meeting dates each month as well as the topic of our
        study. To see a list of all of the outlines in this series click{" "}
        <span
          className="underline"
          onClick={() => setIsModalShowing(!isModalShowing)}
        >
          here
        </span>
        .
      </p>
      {isModalShowing && (
        <PDFModal
          pdfs={pdfs}
          setPdfs={setPdfs}
          setIsModalShowing={setIsModalShowing}
          studies={studies}
          env={import.meta.env.VITE_MEN_STUDY_NAME}
        />
      )}
      {user && <PDFUpload studies={studies} setStudies={setStudies} />}
    </>
  );
}
