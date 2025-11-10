import { Outlet, createRootRoute } from "@tanstack/react-router";
import "../css/global.css";
import "../css/reset.css";
import { useWindowDimensions } from "../hooks/useWindowDimensions";
import Navbar from "../components/Navbar/Navbar";
import MobileNavbar from "../components/MobileNavbar/MobileNavbar";
import Footer from "../components/Footer";
import Providers from "../components/Providers";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {

  return (
    <Providers>
      <div style={{ minHeight: "80vh" }}>
        <Navbar />
        <Outlet />
      </div>
      <Footer />
    </Providers>
  );
}
