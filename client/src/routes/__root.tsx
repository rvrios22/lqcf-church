import { Outlet, createRootRoute } from "@tanstack/react-router";
import "../css/global.css";
import "../css/reset.css";
import { useWindowDimensions } from "../hooks/useWindowDimensions";
import Navbar from "../components/Navbar/Navbar";
import MobileNavbar from "../components/MobileNavbar/MobileNavbar";
import Footer from "../components/Footer/Footer";
import { UserProvider } from "../context/UserContext";
import { useEffect } from "react";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { width } = useWindowDimensions();

  return (
    <>
      <UserProvider>
        {width > 700 ? <Navbar /> : <MobileNavbar />}
        <Outlet />
        <Footer />
      </UserProvider>
    </>
  );
}
