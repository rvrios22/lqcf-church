import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import "../css/global.css";
import "../css/reset.css";
import { useWindowDimensions } from "../hooks/useWindowDimensions";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { width, height } = useWindowDimensions();
  console.log(width, height);
  return (
    <React.Fragment>
      <div>Hello "__root"!</div>
      <Outlet />
    </React.Fragment>
  );
}
