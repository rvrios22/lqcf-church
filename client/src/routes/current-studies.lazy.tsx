import { createLazyFileRoute } from "@tanstack/react-router";
import studies from "../../public/studies";
export const Route = createLazyFileRoute("/current-studies")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main>
      <ul>
        {studies.map(({ study, desc }, idx) => (
          <li key={idx}>
            <h2 className="sub-header" style={{ marginBottom: 0 }}>
              {study}
            </h2>
            <p className="general-text" style={{ marginTop: 0 }}>
              {desc}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
