import { createFileRoute } from "@tanstack/react-router";
import beliefs from "../../public/beliefs";
export const Route = createFileRoute("/beliefs")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main>
      <ul>
        {beliefs.map(({ title, statement, citations }, idx) => (
          <>
            <li key={idx} className="mt-8">
              <h2 className="sub-header">{title}</h2>
              <p className="general-text mt-0">{statement}</p>
              <p className="general-text bold">{citations}</p>
            </li>
            <hr className="mx-auto w-4/5"></hr>
          </>
        ))}
      </ul>
    </main>
  );
}
