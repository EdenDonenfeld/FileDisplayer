import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { DocItem } from "./FileViewer";
import { TextContentViewer } from "./TextContentViewer";
import type { UseTextSearchResult } from "../hooks/useTextSearch";
import { ErrorOutlineOutlined } from "@mui/icons-material";
import { Typography } from "@mui/material";

const viewerConfig = {
  header: {
    disableHeader: true,
  },
};

type FileContentModalProps = {
  docs: DocItem[];
  isTextBased: boolean;
  isLoading: boolean;
  isError: boolean;
  isHtml: boolean;
  isBinary: boolean;
  textSearch?: UseTextSearchResult;
};

export function FileContentModal({
  docs,
  isTextBased,
  isLoading,
  isError,
  isHtml,
  isBinary,
  textSearch,
}: FileContentModalProps) {
  if (isTextBased && isError) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 h-full bg-slate-50 rounded-md gap-2 text-red-500 p-8 text-center">
        <ErrorOutlineOutlined fontSize="large" color="inherit" />
        <Typography color="inherit" variant="body1">
          לא ניתן להציג את תוכן הקובץ
        </Typography>
        <Typography color="textSecondary" variant="body2">
          ייתכן שהקובץ גדול מדי לתצוגה מקדימה, או שאינו נתמך. באפשרותך להוריד
          אותו
        </Typography>
      </div>
    );
  }

  if (isTextBased && textSearch) {
    return (
      <div className="flex flex-col flex-1 min-h-0 overflow-hidden relative">
        {isBinary && (
          <div
            dir="rtl"
            className="bg-slate-100 py-2 text-sm text-center rounded-sm"
          >
            תצוגה קובץ בינארי (4KB ראשונים): בשביל תצוגה מלאה ניתן להוריד את
            הקובץ
          </div>
        )}
        <TextContentViewer
          parts={textSearch.parts}
          currentMatchIndex={textSearch.currentMatchIndex}
          isLoading={isLoading}
        />
      </div>
    );
  }

  if (isHtml && !isTextBased) {
    return (
      <iframe
        className="flex flex-col overflow-auto h-[70vh]"
        src={docs[0]?.uri}
        title="HTML Web View"
      />
    );
  }

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-auto">
      <DocViewer
        documents={docs}
        pluginRenderers={DocViewerRenderers}
        config={viewerConfig}
      />
    </div>
  );
}
