import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Tooltip,
} from "@mui/material";
import {
  CloseRounded,
  CloudDownloadOutlined,
  ContentCopyRounded,
  CodeRounded,
  LanguageRounded,
} from "@mui/icons-material";
import { useMemo, useState } from "react";
import { FileContentModal } from "./FileContentModal";
import { ActionButton } from "./ActionButton";
import { TextSearchBar } from "./TextSearchBar";
import { useTextSearch } from "../hooks/useTextSearch";
import { useFileContent } from "../hooks/useFileContent";

const librarySupportedTypes = new Set([
  "bmp",
  "gif",
  "jpg",
  "jpeg",
  "pdf",
  "png",
  "tiff",
]);

function getDocumentType(fileExtension: string | undefined): string {
  if (!fileExtension) return "txt";
  if (librarySupportedTypes.has(fileExtension)) {
    return fileExtension;
  }
  return "txt";
}

function getFileLabel(fileUrl: string, title?: string) {
  if (title) return title;
  const parts = fileUrl.split("?")[0]?.split("#")[0]?.split("/") ?? [];
  return parts[parts.length - 1] || fileUrl;
}

export type DocItem = {
  uri: string;
  fileType: string;
};

export type FileViewerProps = {
  fileUrl: string;
  title?: string;
  extension?: string;
};

export function FileViewer({ fileUrl, title, extension }: FileViewerProps) {
  const [open, setOpen] = useState(false);
  const [isCopied, setIsCopied] = useState<boolean | undefined>();
  const [isDownloaded, setIsDownloaded] = useState<boolean | undefined>();
  const [isHtmlRawView, setIsHtmlRawView] = useState(false);

  const { docs, isHtml, isTextBased, label } = useMemo(() => {
    const fileExtension = extension
      ? extension.split(".").pop()?.toLowerCase()
      : fileUrl.split("?")[0]?.split("#")[0]?.split(".").pop()?.toLowerCase();

    const baseDocumentType = getDocumentType(fileExtension);
    const htmlCheck = fileExtension === "html" || fileExtension === "htm";

    const checkIsTextBased = htmlCheck
      ? isHtmlRawView
      : baseDocumentType === "txt";

    return {
      label: getFileLabel(fileUrl, title),
      isHtml: htmlCheck,
      isTextBased: checkIsTextBased,
      docs: [{ uri: fileUrl, fileType: baseDocumentType }],
    };
  }, [fileUrl, title, extension, isHtmlRawView]);

  const fetchUri = open && isTextBased ? docs[0]?.uri : undefined;
  const { content, isLoading, isError, isBinary } = useFileContent(fetchUri);

  const textSearch = useTextSearch(content);

  if (!fileUrl) {
    return null;
  }

  const handleCopyContent = async () => {
    try {
      if (isTextBased && !isError) {
        await navigator.clipboard.writeText(content ?? "");
      } else {
        await navigator.clipboard.writeText(fileUrl);
      }
      setIsCopied(true);
      setTimeout(() => setIsCopied(undefined), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      setIsCopied(false);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = label;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);

      setIsDownloaded(true);
      setTimeout(() => setIsDownloaded(undefined), 2000);
    } catch (err) {
      console.error("Failed to download file: ", err);
      setIsDownloaded(false);
    }
  };

  return (
    <>
      <Button
        sx={{ textTransform: "none" }}
        size="small"
        variant="contained"
        color="inherit"
        onClick={() => setOpen(true)}
      >
        <Typography fontSize="14px" color="textPrimary">
          {label}
        </Typography>
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="lg"
        PaperProps={{
          sx: { maxHeight: "90vh", width: "80vw" },
        }}
      >
        <DialogTitle>
          <div className="flex flex-row justify-between items-center flex-wrap gap-2">
            <div className="flex flex-row items-center gap-2">
              <Typography>{label}</Typography>
              {isHtml && (
                <Tooltip
                  title={isHtmlRawView ? "עבור לתצוגת Web" : "עבור לתצוגת קוד"}
                >
                  <IconButton
                    onClick={() => setIsHtmlRawView(!isHtmlRawView)}
                    size="small"
                  >
                    {isHtmlRawView ? (
                      <LanguageRounded fontSize="small" />
                    ) : (
                      <CodeRounded fontSize="small" />
                    )}
                  </IconButton>
                </Tooltip>
              )}
            </div>
            <div className="flex flex-row gap-1 items-center flex-wrap">
              {isTextBased && !isError && (
                <TextSearchBar {...textSearch} placeholder="חפש בקובץ" />
              )}

              <ActionButton
                title={
                  isTextBased && !isError ? "העתק תוכן" : "העתק קישור לקובץ"
                }
                isSuccess={isCopied}
                handleAction={handleCopyContent}
                actionIcon={
                  <ContentCopyRounded color="inherit" fontSize="small" />
                }
              />
              <ActionButton
                title="הורד קובץ"
                isSuccess={isDownloaded}
                handleAction={handleDownload}
                actionIcon={
                  <CloudDownloadOutlined color="inherit" fontSize="small" />
                }
              />
            </div>
          </div>
        </DialogTitle>

        <DialogContent className="flex flex-col p-2 overflow-hidden" dividers>
          <FileContentModal
            docs={docs}
            isTextBased={isTextBased}
            isLoading={isLoading}
            isError={isError}
            isHtml={isHtml}
            isBinary={isBinary}
            textSearch={isTextBased ? textSearch : undefined}
          />
        </DialogContent>
        <DialogActions>
          <IconButton
            color="primary"
            size="small"
            onClick={() => setOpen(false)}
          >
            <CloseRounded />
          </IconButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
