import { useState } from "react";

import PDFTypes from "../types/PDFTypes";
import StudyTypes from "../types/StudyTypes.d";
import dateFormat from "../utils/dateFormat";
import customFetch from "../utils/customFetch";
import { logError } from "../utils/axiom";

interface PDFModalTypes {
  pdfs: PDFTypes[];
  setPdfs: React.Dispatch<React.SetStateAction<PDFTypes[]>>;
  studies: StudyTypes[];
  env: string;
}

function PDFModal({ pdfs, setPdfs, studies, env }: PDFModalTypes) {
  const [study, setStudy] = useState<string>(env);
  const fetchPDFs = async (study: string) => {
    try {
      const data = await customFetch(`/api/pdf/${study}`);
      setPdfs(data);
    } catch (e) {
      logError(e as Error, `/api/pdf/${study}`);
    }
  };
  return (
    <div className="mx-auto my-4 min-h-[60vh] w-[90%] overflow-y-auto rounded-xl border-1 bg-white shadow-md">
      <div className="flex justify-between border-b px-4 py-2">
        <h2 className="sub-header">Title</h2>
        <select
          // className={styles.select}
          className="max-w-[50%] truncate"
          value={study}
          onChange={(e) => {
            setStudy(e.target.value);
            fetchPDFs(e.target.value);
          }}
        >
          {studies.map(({ id, name }) => (
            <option key={id}>{name}</option>
          ))}
        </select>
        <h2 className="sub-header">Date</h2>
      </div>
      {pdfs.map(({ id, title, pdfPath, date }) => (
        <a
          key={id}
          href={`/api/static/${pdfPath.split("/public")[1]}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-between border-b-1 px-4 last-of-type:border-b-0"
        >
          <span className="general-text text-left">{title}</span>
          <span className="general-text text-right">
            {date ? dateFormat(date) : "N/A"}
          </span>
        </a>
      ))}
    </div>
  );
}

export default PDFModal;
