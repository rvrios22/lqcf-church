import { useQuery } from "@tanstack/react-query";

export const useCustomQuery = <T>(queryKey: string[], endPoint: string) => {
  return useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const response = await fetch(`/api/${endPoint}`);
      if (!response.ok) {
        throw new Error(`HTTP Error, ${response.status}`);
      }
      return response.json() as T;
    },
  });
};
