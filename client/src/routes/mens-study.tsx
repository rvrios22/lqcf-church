import { createFileRoute } from "@tanstack/react-router";
import { queryClient } from "../components/Providers";
import HeroImg from "../components/HeroImg";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import PDFModal from "../components/PDFModal";
import PDFUpload from "../components/PDFUpload/PDFUpload";
import StudyTypes from "../types/StudyTypes.d";
import PDFTypes from "../types/PDFTypes";
import { useUser } from "../hooks/useUser";
import customFetch from "../utils/customFetch";
export const Route = createFileRoute("/mens-study")({
  component: RouteComponent,
  // 👇 loader prefetches data into React Query's cache
  loader: async () => {
    const [studies, initialPDF] = await Promise.all([
      queryClient.ensureQueryData({
        queryKey: ["study"],
        queryFn: () => customFetch<StudyTypes[]>("study"),
      }),
      queryClient.ensureQueryData({
        queryKey: ["pdf", import.meta.env.VITE_MEN_STUDY_NAME],
        queryFn: async () =>
          customFetch<PDFTypes[]>(`pdf/${import.meta.env.VITE_MEN_STUDY_NAME}`),
      }),
    ]);
    return { studies, initialPDF };
  },
});

function RouteComponent() {
  const loaderData = Route.useLoaderData();
  console.log(loaderData);
  const { studies, initialPDF } = loaderData;
  const [pdfs, setPdfs] = useState<PDFTypes[]>(initialPDF);
  const { user } = useUser();
  return (
    <>
      <HeroImg name="mensStudy" text="Men's Study" />
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
        chosen people, the church.
      </p>
      <PDFModal
        pdfs={pdfs}
        setPdfs={setPdfs}
        studies={studies}
        env={import.meta.env.VITE_MEN_STUDY_NAME}
      />
      <p className="general-text">
        Our men's ministry is led by Pastor Curtis Claire. We meet at 7:30 AM in
        the sanctuary of the church every 2nd and 4th Saturday of each month.
        Please see our{" "}
        <Link to="/events">
          <span className="underline">events</span>
        </Link>{" "}
        page to verify our meeting dates each month as well as the topic of our
        study.
      </p>
      {user && <PDFUpload studies={studies} />}
    </>
  );
}
