import {
  Button,
  Dropdown,
  Navbar as Header,
  NavbarMenu,
  NavbarMenuItem,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  NavbarMenuToggle,
} from "@heroui/react";
import { Link } from "@tanstack/react-router";
import styles from "./Navbar.module.css";
import DropDown from "../DropDown/DropDown";
import { useState } from "react";
import { useUser } from "../../hooks/useUser";

function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { user } = useUser();
  const handleMouseEnter = (menu: string) => setOpenMenu(menu);
  const handleMouseLeave = () => setOpenMenu(null);

  return (
    // <nav className={styles.nav}>
    //   <div>
    //     <Link to="/">
    //       <span className="general-text">LQCF Church</span>
    //       {user && (
    //         <span style={{ marginLeft: "1em" }} className="general-text">
    //           {user.username}
    //         </span>
    //       )}
    //     </Link>
    //   </div>
    //   <div className={styles.flex}>
    //     <div
    //       onMouseEnter={() => handleMouseEnter("who")}
    //       onMouseLeave={handleMouseLeave}
    //       className="general-text"
    //       style={{ position: "relative" }}
    //     >
    //       <span>Who We Are</span>
    //       {openMenu === "who" && (
    //         <DropDown
    //           links={[
    //             { name: "Elders", link: "/elders" },
    //             { name: "What We Believe", link: "/beliefs" },
    //             { name: "Current Studies", link: "/current-studies" },
    //           ]}
    //         />
    //       )}
    //     </div>

    //     <div
    //       onMouseEnter={() => handleMouseEnter("ministries")}
    //       onMouseLeave={handleMouseLeave}
    //       className="general-text"
    //       style={{ position: "relative" }}
    //     >
    //       <span>Ministries</span>
    //       {openMenu === "ministries" && (
    //         <DropDown
    //           links={[
    //             { name: "Men's Study", link: "/mens-study" },
    //             { name: "Women's Study", link: "/womens-study" },
    //             { name: "Identity Youth", link: "/identity-youth" },
    //             { name: "Prayer Chain", link: "/prayer-chain" },
    //           ]}
    //         />
    //       )}
    //     </div>

    //     <Link to="/school">
    //       <span className="general-text">School</span>
    //     </Link>
    //     <Link to="/giving">
    //       <span className="general-text">Giving</span>
    //     </Link>
    //     <Link to="/events">
    //       <span className="general-text">Events</span>
    //     </Link>
    //     <Link to="/prayer">
    //       <span className="general-text">Prayer</span>
    //     </Link>
    //   </div>
    // </nav>
    <Header
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      isBordered
      maxWidth="full"
    >
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link to="/">
            <p className="text-inherit lg:text-2xl">LQCF Church</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end" className="hidden gap-4 sm:flex">
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="bg-transparent p-0 data-[hover=true]:bg-transparent lg:text-lg"
                endContent={<img src="./chevron-down.svg" />}
                radius="sm"
                variant="light"
              >
                Who We Are
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu>
            <DropdownItem key="elders" href="/elders">
              Elders
            </DropdownItem>
            <DropdownItem key="beliefs" href="/beliefs">
              Who We Are
            </DropdownItem>
            <DropdownItem key="current-studies" href="/current-studies">
              Current Studies
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="bg-transparent p-0 data-[hover=true]:bg-transparent lg:text-lg"
                endContent={<img src="./chevron-down.svg" />}
                radius="sm"
                variant="light"
              >
                Ministries
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu>
            <DropdownItem key="mens-study" href="/mens-study">
              Men's Study
            </DropdownItem>
            <DropdownItem key="womens-study" href="/womens-study">
              Women's Study
            </DropdownItem>
            <DropdownItem key="prayer-chain" href="/prayer-chain">
              Prayer Chain
            </DropdownItem>
            <DropdownItem key="identity-youth" href="/identity-youth">
              Identity Youth
            </DropdownItem>
            <DropdownItem key="school" href="/school">
              LQCF School
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <NavbarItem>
          <Link to="/giving">
            <span className="lg:text-lg">Giving</span>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/events">
            <span className="lg:text-lg">Events</span>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/prayer">
            <span className="lg:text-lg">Prayer</span>
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* mobile menu */}
      <NavbarMenu className="items-center justify-center">
        <NavbarMenuItem>
          <Link to="/">Home</Link>
        </NavbarMenuItem>

        <NavbarMenuItem>
          <Link to="/" className="w-full"></Link>
        </NavbarMenuItem>

        <NavbarMenuItem></NavbarMenuItem>
      </NavbarMenu>
    </Header>
  );
}

export default Navbar;
