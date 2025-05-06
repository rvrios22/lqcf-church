import { createFileRoute } from "@tanstack/react-router";
import { useWindowDimensions } from "../hooks/useWindowDimensions";
import HeroImg from "../components/HeroImg/HeroImg";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { width, height } = useWindowDimensions();
  return (
    <div>
      <HeroImg
        width={width}
        height={height}
        img="lqcfHome.avif"
        text="La Quinta Christian Fellowship Church"
      />
    </div>
  );
}
