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
import { Link, useRouter } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useUser } from "../hooks/useUser";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { user } = useUser();

  const router = useRouter();
  useEffect(() => {
    const unsubscribe = router.history.subscribe(() => setIsMenuOpen(false));

    return () => unsubscribe();
  }, [router]);
  return (
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
        {user && <NavbarItem>{user.username}</NavbarItem>}
      </NavbarContent>
      <NavbarContent justify="end" className="hidden gap-4 sm:flex">
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="lg:m4-0 overflow-visible bg-transparent p-0 data-[hover=true]:bg-transparent md:mr-4 lg:text-lg"
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
              Our Elders
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
                className="overflow-visible bg-transparent p-0 data-[hover=true]:bg-transparent lg:text-lg"
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
          <Link to="/elders" className="w-full">
            Our Elders
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link to="/beliefs" className="w-full">
            What We Beleive
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link to="/current-studies" className="w-full">
            Current Studies
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link to="/mens-study" className="w-full">
            Men's Study
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link to="/womens-study" className="w-full">
            Women's Study
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link to="/prayer-chain" className="w-full">
            Prayer Chain
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link to="/identity-youth" className="w-full">
            Identity Youth
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link to="/school" className="w-full">
            School
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link to="/events" className="w-full">
            Events
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link to="/giving" className="w-full">
            Giving
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link to="/prayer" className="w-full">
            Prayer
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Header>
  );
}

export default Navbar;
