import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import PDFTypes from "../../types/PDFTypes";
import dateFormat from "../../utils/dateFormat";
import styles from "./PDFModal.module.css";

interface PDFModalTypes {
  pdfs: PDFTypes[];
  setPdfs: React.Dispatch<React.SetStateAction<PDFTypes[]>>;
  setIsModalShowing: React.Dispatch<React.SetStateAction<boolean>>;
}

function PDFModal({ pdfs, setPdfs, setIsModalShowing }: PDFModalTypes) {
  const { height, width } = useWindowDimensions();
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
        <select name="" id=""></select>
        <h2 className="sub-header">Date</h2>
      </div>
      {pdfs.map(({ id, title, pdfPath, date }) => (
        <a
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
