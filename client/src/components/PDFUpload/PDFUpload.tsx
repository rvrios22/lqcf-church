function PDFUpload() {
  return (
    <form action="POST">
      <input type="text" name="title" id="title" required placeholder="Title" />
      <input type="text" name="studyName" id="studyName" required list="studyName"/>
      <datalist id="studyName">
        
      </datalist>
      <input type="date" name="date" id="date" />
      <input type="file" name="pdf" id="pdf" required />
    </form>
  );
}

export default PDFUpload;
