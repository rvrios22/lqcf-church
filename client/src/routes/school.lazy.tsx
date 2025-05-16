import { createLazyFileRoute } from "@tanstack/react-router";
import { useWindowDimensions } from "../hooks/useWindowDimensions";

export const Route = createLazyFileRoute("/school")({
  component: RouteComponent,
});

function RouteComponent() {
  const { height } = useWindowDimensions();
  return (
    <main style={{ height: '50dvh' }}>
      <h1 className="sub-header">La Quinta Christian Fellowship School</h1>
      <p className="general-text">
        La Quinta Christian Fellowship School is a ministry of our church.
        Please come backlater for more details about our school.
      </p>
    </main>
  );
}
