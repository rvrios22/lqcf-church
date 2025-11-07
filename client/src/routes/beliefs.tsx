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
          <div key={idx}>
            <li>
              <h2 className="sub-header mb-2 border-b-1 border-gray-400">
                {title}
              </h2>
              <p className="general-text mt-0">{statement}</p>
              <p className="general-text text-sm font-bold">{citations}</p>
            </li>
            <hr className="mx-auto mb-4 w-4/5 last-of-type:hidden"></hr>
          </div>
        ))}
      </ul>
    </main>
  );
}
