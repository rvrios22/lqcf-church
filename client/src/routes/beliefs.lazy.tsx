import { createLazyFileRoute } from "@tanstack/react-router";
import belifs from "../../public/beliefs";

export const Route = createLazyFileRoute("/beliefs")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main>
      <ul>
        {belifs.map(({ title, statement, citations }, idx) => (
          <li key={idx}>
            <h2 className="sub-header" style={{ marginBottom: 0 }}>
              {title}
            </h2>
            <p className="general-text" style={{ margin: "0 auto" }}>
              {statement}
            </p>
            <p className="general-text bold" style={{ marginTop: 0 }}>
              {citations}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
