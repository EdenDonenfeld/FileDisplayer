import { useEffect, useState } from "react";

const FILE_LIMIT = 5 * 1024 * 1024; // 5MB

export type UseFileContentResult = {
  content: string | null;
  isLoading: boolean;
  isError: boolean;
  isBinary: boolean;
};

export function useFileContent(
  fileUri: string | undefined,
): UseFileContentResult {
  const [content, setContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isBinary, setIsBinary] = useState(false);

  useEffect(() => {
    if (!fileUri) {
      setContent(null);
      setIsError(false);
      setIsBinary(false);
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    setIsError(false);
    setIsBinary(false);
    setContent(null);

    fetch(fileUri)
      .then(async (r) => {
        if (!r.ok) throw new Error("Fetch failed");

        const blob = await r.blob();
        if (blob.size > FILE_LIMIT) {
          throw new Error("File is too large (> 5MB)");
        }

        const text = await blob.text();

        if (text.indexOf("\0") !== -1) {
          const arrayBuffer = await blob.slice(0, 4096).arrayBuffer();
          const bytes = new Uint8Array(arrayBuffer);
          let hexDisplay = "";
          for (let i = 0; i < bytes.length; i += 16) {
            const rowBytes = bytes.slice(i, i + 16);
            const hexRow = Array.from(rowBytes)
              .map((b) => b.toString(16).padStart(2, "0").toUpperCase())
              .join(" ");
            hexDisplay += `${i.toString(16).padStart(8, "0")} | ${hexRow}\n`;
          }
          if (!cancelled) {
            setIsBinary(true);
            return hexDisplay;
          }
        }

        if (text.length > 500000) {
          throw new Error("Text is too long to render safely");
        }

        return text;
      })
      .then((processedText) => {
        if (!cancelled && processedText !== undefined) {
          setContent(processedText);
        }
      })
      .catch((err) => {
        console.error("File load error:", err);
        if (!cancelled) {
          setContent("");
          setIsError(true);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [fileUri]);

  return { content, isLoading, isError, isBinary };
}
