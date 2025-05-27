import { useState } from "react";
import StudyTypes from "../../types/StudyTypes.d";
import customFetch from "../../utils/customFetch";

interface PDFUploadTypes {
  studies: StudyTypes[];
  setStudies: React.Dispatch<React.SetStateAction<StudyTypes[]>>;
}
function PDFUpload({ studies, setStudies }: PDFUploadTypes) {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('asdf')
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("studyName", form.studyName);
    formData.append("date", form.date ? form.date : "");
    formData.append("pdf", form.pdf!);
    const options: RequestInit = {
      method: "POST",
      body: formData,
      // headers: {
      //   Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      // },
    };

    try {
      const data = await customFetch("/api/pdf", options);
      if (!studies.some((study) => study.name === form.studyName)) {
        setStudies([
          ...studies,
          {
            id: Math.floor(Math.random() * (1000 - 100) + 100),
            name: form.studyName,
          },
        ]);
      }
      console.log(data)
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form action="POST" onSubmit={handleSubmit}>
      <input
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        type="text"
        name="title"
        id="title"
        required
        placeholder="Title"
      />
      <input
        onChange={(e) => setForm({ ...form, studyName: e.target.value })}
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
      />
      <input type="button" value="Upload" className="button" />
    </form>
  );
}

export default PDFUpload;
