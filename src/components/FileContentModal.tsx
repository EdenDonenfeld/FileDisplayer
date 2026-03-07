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
  textSearch?: UseTextSearchResult;
};

export function FileContentModal({
  docs,
  isTextBased,
  textSearch,
}: FileContentModalProps) {
  if (textSearch && textSearch.isError) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 h-full bg-slate-50 rounded-md gap-2 text-red-500 p-8 text-center">
        <ErrorOutlineOutlined fontSize="large" color="inherit" />
        <Typography color="inherit" variant="body1">
          לא ניתן להציג את תוכן הקובץ
        </Typography>
        <Typography color="textSecondary" variant="body2">
          ייתכן שהקובץ גדול מדי לתצוגה מקדימה, או שהוא מכיל תוכן לא קריא.
          באפשרותך להוריד את הקובץ.
        </Typography>
      </div>
    );
  }

  if (isTextBased && textSearch) {
    return (
      <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
        <TextContentViewer
          parts={textSearch.parts}
          currentMatchIndex={textSearch.currentMatchIndex}
          isLoading={textSearch.isLoading}
        />
      </div>
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
