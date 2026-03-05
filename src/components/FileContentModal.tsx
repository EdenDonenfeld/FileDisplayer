import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { DocItem } from "./FileViewer";
import { TextContentViewer } from "./TextContentViewer";
import type { UseTextSearchResult } from "../hooks/useTextSearch";

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
    <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
      <DocViewer
        documents={docs}
        pluginRenderers={DocViewerRenderers}
        config={viewerConfig}
      />
    </div>
  );
}
