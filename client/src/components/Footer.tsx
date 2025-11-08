function Footer() {
  return (
    <footer className="bg-teal-500 py-4 text-white [text-shadow:1px_1px_1px_rgb(0,0,0)] md:grid md:grid-cols-3 md:pr-4">
      <div>
        {" "}
        <h3 className="sub-header">Service Times:</h3>
        <p className="general-text">Sunday Bible Study: 9:00AM</p>
        <p className="general-text">Sunday Service: 10:00AM</p>
        <p className="general-text">Wednesday Service: 6:30PM</p>
      </div>
      <div>
        <h3 className="sub-header">Church Address:</h3>
        <p className="general-text">
          50800 Calle Paloma<br></br>La Quinta CA 92253
        </p>
        <h3 className="sub-header">Mailing Address:</h3>
        <p className="general-text">P.O. Box 676 La Quinta CA 92247</p>
        <h3 className="sub-header">Contact Us:</h3>
        <p className="general-text">
          <a href="tel:760-564-9195">760-564-9195</a>
        </p>
        <p className="general-text">
          <a href="mailto:lqcf@verizon.net">lqcf@verizon.net</a>
        </p>
      </div>
      <img
        className="mx-auto max-h-[400px] w-4/5 max-w-[500px] rounded-2xl shadow-md md:w-full"
        loading="lazy"
        src="/api/static/imgs/churchMap.webp"
        alt="A location of the church"
      />
    </footer>
  );
}

export default Footer;
