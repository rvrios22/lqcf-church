import { useState } from "react";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import PDFTypes from "../../types/PDFTypes";
import StudyTypes from "../../types/StudyTypes.d";
import dateFormat from "../../utils/dateFormat";
import styles from "./PDFModal.module.css";
import customFetch from "../../utils/customFetch";

interface PDFModalTypes {
  pdfs: PDFTypes[];
  setPdfs: React.Dispatch<React.SetStateAction<PDFTypes[]>>;
  setIsModalShowing: React.Dispatch<React.SetStateAction<boolean>>;
  studies: StudyTypes[];
  env: string;
}

function PDFModal({
  pdfs,
  setPdfs,
  setIsModalShowing,
  studies,
  env,
}: PDFModalTypes) {
  const { height, width } = useWindowDimensions();
  const [study, setStudy] = useState<string>(env);
  const fetchPDFs = async (study: string) => {
    try {
      const data = await customFetch(`/api/pdf/${study}`);
      setPdfs(data);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div
      style={{ height: height * 0.6, width: width * 0.8 }}
      className={styles.container}
    >
      <img
        src="./close.svg"
        alt="close"
        className={styles.close}
        height={25}
        onClick={() => setIsModalShowing(false)}
      />
      <div className={styles.flex}>
        <h2 className="sub-header">Title</h2>
        <select
          className={styles.select}
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
        >
          <div key={id} className={styles.flex}>
            <span className="general-text">{title}</span>
            <span className="general-text">
              {date ? dateFormat(date) : "N/A"}
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}

export default PDFModal;
