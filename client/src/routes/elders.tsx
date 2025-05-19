import { createFileRoute } from "@tanstack/react-router";
import elders from "../../public/elders";
import Elder from "../components/Elder/Elder";
export const Route = createFileRoute("/elders")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <h1 className="sub-header">Meet Our Elders</h1>
      {elders.map(({ name, img, bio }, idx) => (
        <Elder key={idx} name={name} img={img} bio={bio} />
      ))}
    </>
  );
}
