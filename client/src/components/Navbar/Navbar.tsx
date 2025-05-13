import { Link } from "@tanstack/react-router";
import styles from "./Navbar.module.css";
import DropDown from "../DropDown/DropDown";
import { useState } from "react";

function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const handleMouseEnter = (menu: string) => setOpenMenu(menu);
  const handleMouseLeave = () => setOpenMenu(null);

  return (
    <nav className={styles.nav}>
      <div>
        <Link to="/">
          <span className="general-text">LQCF Church</span>
        </Link>
      </div>
      <div className={styles.flex}>
        <div
          onMouseEnter={() => handleMouseEnter("who")}
          onMouseLeave={handleMouseLeave}
          className="general-text"
          style={{ position: "relative" }}
        >
          <span>Who We Are</span>
          {openMenu === "who" && (
            <DropDown
              links={[
                { name: "Elders", link: "/elders" },
                { name: "What We Believe", link: "/beliefs" },
                { name: "Current Studies", link: "/current-studies" },
              ]}
            />
          )}
        </div>

        <div
          onMouseEnter={() => handleMouseEnter("ministries")}
          onMouseLeave={handleMouseLeave}
          className="general-text"
          style={{ position: "relative" }}
        >
          <span>Ministries</span>
          {openMenu === "ministries" && (
            <DropDown
              links={[
                { name: "Men's Study", link: "/mens-study" },
                { name: "Women's Study", link: "/womens-study" },
                { name: "Identity Youth", link: "/identity-youth" },
                { name: "Prayer Chain", link: "/prayer-chain" },
              ]}
            />
          )}
        </div>

        <Link to="/school">
          <span className="general-text">School</span>
        </Link>
        <Link to="/giving">
          <span className="general-text">Giving</span>
        </Link>
        <Link to="/events">
          <span className="general-text">Events</span>
        </Link>
        <Link to="/prayer">
          <span className="general-text">Prayer</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
