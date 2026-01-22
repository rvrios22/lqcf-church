import studies from "@/public/data/studies";

export default function Page() {
  return (
    <main>
      <ul>
        {studies.map(({ study, desc }, idx) => (
          <li key={idx}>
            <h2
              className="sub-header mb-2 border-b-1 border-gray-400"
              style={{ marginBottom: 0 }}
            >
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
