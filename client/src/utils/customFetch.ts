import { logError } from "./axiom";

const customFetch = async <T = any>(
  endPoint: string,
  options?: RequestInit,
): Promise<T> => {
  try {
    const response: Response = await fetch(`/api/${endPoint}`, options);
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const data = await response.json();
    return data as T;
  } catch (e) {
    logError(e as Error, endPoint);
    throw e;
  }
};

export default customFetch;
