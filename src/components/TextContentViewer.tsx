import { useEffect, useRef } from "react";
import type { SearchPart } from "../hooks/useTextSearch";

type TextContentViewerProps = {
  parts: SearchPart[];
  currentMatchIndex: number;
  isLoading: boolean;
};

export function TextContentViewer({
  parts,
  currentMatchIndex,
  isLoading,
}: TextContentViewerProps) {
  const matchRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ref = matchRefs.current[currentMatchIndex];
    ref?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [currentMatchIndex]);

  return (
    <div
      className="flex-1 min-h-0 overflow-auto p-4 font-mono text-sm whitespace-pre-wrap break-words"
      dir="ltr"
    >
      {isLoading ? (
        <span className="text-slate-500">Loading...</span>
      ) : (
        parts.map((part, i) =>
          part.match ? (
            <mark
              key={i}
              ref={(el) => {
                const matchIndex = parts
                  .slice(0, i)
                  .filter((p) => p.match).length;
                matchRefs.current[matchIndex] = el;
              }}
              style={{
                backgroundColor:
                  parts.slice(0, i).filter((p) => p.match).length ===
                  currentMatchIndex
                    ? "#ffeb3b"
                    : "rgba(255, 235, 59, 0.4)",
              }}
            >
              {part.text}
            </mark>
          ) : (
            <span key={i}>{part.text}</span>
          ),
        )
      )}
    </div>
  );
}
