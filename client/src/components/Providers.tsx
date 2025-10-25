import { HeroUIProvider, ToastProvider } from "@heroui/react";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <ToastProvider />
      {children}
    </HeroUIProvider>
  );
}

export default Providers;
