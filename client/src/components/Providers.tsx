import { HeroUIProvider, ToastProvider } from "@heroui/react";
import {
  useRouter,
  type NavigateOptions,
  type ToOptions,
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { UserProvider } from "../context/UserContext";
export const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 60 } },
});

declare module "@react-types/shared" {
  interface RouterConfig {
    href: ToOptions["to"];
    routerOptions: Omit<NavigateOptions, keyof ToOptions>;
  }
}

function Providers({ children }: { children: React.ReactNode }) {
  let router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider
        navigate={(to, options) => router.navigate({ to, ...options })}
        useHref={(to) => router.buildLocation({ to }).href}
      >
        <ToastProvider
          toastProps={{
            hideIcon: true,
          }}
          placement="bottom-center"
        />
        <UserProvider>{children}</UserProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </HeroUIProvider>
    </QueryClientProvider>
  );
}

export default Providers;
