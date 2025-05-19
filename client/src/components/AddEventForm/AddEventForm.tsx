function AddEventForm() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
  };
  return (
    <section>
      <h2 className="sub-header">Add Event</h2>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" name="title" id="title" placeholder="Title" />
        <input type="date" name="date" id="date" />
        <textarea
          name="description"
          id="description"
          placeholder="Description"
        ></textarea>
        <input type="submit" value="Submit" className="button" />
      </form>
    </section>
  );
}

export default AddEventForm;
