import { Link } from "@tanstack/react-router";
import styles from './DropDown.module.css'

interface DropDownTypes {
  links: { name: string; link: string }[];
}
function DropDown({ links }: DropDownTypes) {
  return (
    <menu className={styles.menu}>
      {links.map(({ name, link }, idx) => (
        <Link to={link} key={idx}>
          <p>{name}</p>
        </Link>
      ))}
    </menu>
  );
}

export default DropDown;
