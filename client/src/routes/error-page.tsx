import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { logError } from "../utils/axiom";

export const Route = createFileRoute("/error-page")({
  component: RouteComponent,
});

function RouteComponent() {
  useEffect(() => {
    logError()
  }, [])
  return (
    <div>
      <h1 className="sub-header">Oops</h1>
      <p className="general-text">
        Looks like something went wrong. We will look into the issue. Please
        navigate back to our <Link to="/">homepage</Link>
      </p>
    </div>
  );
}
