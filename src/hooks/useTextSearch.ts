import { useCallback, useEffect, useMemo, useState } from "react";

export type SearchPart = { text: string; match: boolean };

export type UseTextSearchResult = {
  content: string | null;
  isLoading: boolean;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  useRegex: boolean;
  setUseRegex: (value: boolean) => void;
  regexError: string | null;
  parts: SearchPart[];
  matchCount: number;
  currentMatchIndex: number;
  handleNext: () => void;
  handlePrev: () => void;
};

export function useTextSearch(
  fileUri: string | undefined,
): UseTextSearchResult {
  const [content, setContent] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [useRegex, setUseRegex] = useState(false);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);

  useEffect(() => {
    if (!fileUri) {
      setContent(null);
      return;
    }
    let cancelled = false;
    setContent(null);
    fetch(fileUri)
      .then((r) => r.text())
      .then((text) => {
        if (!cancelled) setContent(text);
      })
      .catch(() => {
        if (!cancelled) setContent("");
      });
    return () => {
      cancelled = true;
    };
  }, [fileUri]);

  const { parts, matchCount, regexError } = useMemo(() => {
    if (!content || !searchQuery.trim()) {
      return {
        parts: [{ text: content ?? "", match: false }],
        matchCount: 0,
        regexError: null as string | null,
      };
    }
    try {
      const pattern = useRegex
        ? searchQuery
        : searchQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(pattern, "gi");
      const parts: SearchPart[] = [];
      let lastIndex = 0;
      let m: RegExpExecArray | null;
      while ((m = regex.exec(content)) !== null) {
        if (m.index > lastIndex) {
          parts.push({ text: content.slice(lastIndex, m.index), match: false });
        }
        parts.push({ text: m[0], match: true });
        lastIndex = m.index + m[0].length;
      }
      if (lastIndex < content.length) {
        parts.push({ text: content.slice(lastIndex), match: false });
      }
      return {
        parts,
        matchCount: parts.filter((p) => p.match).length,
        regexError: null,
      };
    } catch (err) {
      return {
        parts: [{ text: content, match: false }],
        matchCount: 0,
        regexError: err instanceof Error ? err.message : "Invalid regex",
      };
    }
  }, [content, searchQuery, useRegex]);

  useEffect(() => {
    setCurrentMatchIndex(0);
  }, [searchQuery, useRegex]);

  const handleNext = useCallback(() => {
    setCurrentMatchIndex((prev) => (prev + 1) % Math.max(matchCount, 1));
  }, [matchCount]);

  const handlePrev = useCallback(() => {
    setCurrentMatchIndex(
      (prev) => (prev - 1 + matchCount) % Math.max(matchCount, 1),
    );
  }, [matchCount]);

  return {
    content,
    isLoading: fileUri != null && content === null,
    searchQuery,
    setSearchQuery,
    useRegex,
    setUseRegex,
    regexError,
    parts,
    matchCount,
    currentMatchIndex,
    handleNext,
    handlePrev,
  };
}
