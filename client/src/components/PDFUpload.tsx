import { useState, useRef } from "react";
import StudyTypes from "../types/StudyTypes.d";
import customFetch from "../utils/customFetch";
import { logError } from "../utils/axiom";
interface PDFUploadTypes {
  studies: StudyTypes[];
}
function PDFUpload({ studies }: PDFUploadTypes) {
  const [form, setForm] = useState<{
    title: string;
    studyName: string;
    date: string;
    pdf: File | null;
  }>({
    title: "",
    studyName: "",
    date: "",
    pdf: null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("studyName", form.studyName);
    formData.append("date", form.date ? form.date : "");
    formData.append("pdf", form.pdf!);
    const options: RequestInit = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    };

    try {
      await customFetch("pdf", options);
      if (!studies.some((study) => study.name === form.studyName)) {
      }
      setForm({ title: "", studyName: "", date: "", pdf: null });
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // <-- This clears the file input
      }
    } catch (e) {
      logError(e as Error, `/api/pdf`);
    }
  };

  return (
    <form action="POST" onSubmit={handleSubmit}>
      <input
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        value={form.title}
        type="text"
        name="title"
        id="title"
        required
        placeholder="Title"
      />
      <input
        onChange={(e) => setForm({ ...form, studyName: e.target.value })}
        value={form.studyName}
        type="text"
        name="studyName"
        placeholder="Study Name"
        id="studyName"
        required
        list="studyNameList"
      />
      <datalist id="studyNameList">
        {studies.map(({ id, name }) => (
          <option key={id} value={name}>
            {name}
          </option>
        ))}
      </datalist>
      <input
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        value={form.date}
        type="date"
        name="date"
        id="date"
      />
      <input
        onChange={(e) =>
          setForm({
            ...form,
            pdf: e.target.files && e.target.files[0] ? e.target.files[0] : null,
          })
        }
        type="file"
        name="pdf"
        id="pdf"
        required
        accept=".pdf"
        ref={fileInputRef}
      />
      <input type="submit" value="Upload" className="button" />
    </form>
  );
}

export default PDFUpload;
