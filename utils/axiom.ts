import { Axiom } from "@axiomhq/js";

const axiom = new Axiom({
  token: process.env.NEXT_PUBLIC_AXIOM_TOKEN!,
});

export const logInfo = async (message: string, data?: object) => {
  axiom.ingest(process.env.NEXT_PUBLIC_AXIOM_DATASET!, {
    level: "info",
    message,
    ...data,
  });
};

export const logError = async (error: Error, url: string) => {
  axiom.ingest(process.env.NEXT_PUBLIC_AXIOM_DATASET!, {
    level: "error",
    message: error.message,
    stack: error.stack,
    url,
  });
};
