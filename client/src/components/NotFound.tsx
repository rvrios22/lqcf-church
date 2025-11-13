import { Link } from "@tanstack/react-router";
function NotFound() {
  return (
    <div>
      <h1 className="sub-header">Oops</h1>
      <p className="general-text">
        Looks like something went wrong. We will look into the issue. Please
        navigate back to our{" "}
        <Link to="/">
          <span className="underline">homepage</span>
        </Link>
      </p>
    </div>
  );
}

export default NotFound;
