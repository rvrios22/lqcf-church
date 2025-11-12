import { Outlet, createRootRoute } from "@tanstack/react-router";
import Navbar from "../components/Navbar";
import "../css/global.css";
import "../css/reset.css";

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
