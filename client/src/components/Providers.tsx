import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider>
        <ToastProvider />
        {children}
      </HeroUIProvider>
    </QueryClientProvider>
  );
}

export default Providers;
