import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { DocItem } from "./FileViewer";

const viewerConfig = {
  header: {
    disableHeader: true,
  },
};

type FileContentModalProps = {
  docs: DocItem[];
  isTextBased: boolean;
};

export function FileContentModal({ docs, isTextBased }: FileContentModalProps) {
  return (
    <div
      className={`h-[70vh] text-sm text-gray-800 ${isTextBased && "font-mono whitespace-pre-wrap"}`}
      dir={isTextBased ? "ltr" : "auto"}
    >
      <DocViewer
        documents={docs}
        pluginRenderers={DocViewerRenderers}
        config={viewerConfig}
      />
    </div>
  );
}
