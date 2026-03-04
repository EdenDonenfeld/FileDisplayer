import { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import {
  CheckRounded,
  CloseRounded,
  CloudDownloadOutlined,
  ContentCopyRounded,
  ErrorOutlineOutlined,
} from "@mui/icons-material";
import { useMemo, useState } from "react";
import { FileContentModal } from "./FileContentModal";
import { ActionButton } from "./ActionButton";

const supportedTypes = new Set(
  DocViewerRenderers.flatMap(
    (r) => (r as { fileTypes?: string[] }).fileTypes ?? [],
  ),
);

function getDocumentType(fileExtension: string | undefined): string {
  return fileExtension && supportedTypes.has(fileExtension)
    ? fileExtension
    : "txt";
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
};

export function FileViewer({ fileUrl, title }: FileViewerProps) {
  const [open, setOpen] = useState(false);
  const [isCopied, setIsCopied] = useState<boolean | undefined>();
  const [isDownloaded, setIsDownloaded] = useState<boolean | undefined>();

  const { docs, isTextBased, label } = useMemo(() => {
    const fileExtension = fileUrl
      .split("?")[0]
      ?.split("#")[0]
      ?.split(".")
      .pop()
      ?.toLowerCase();
    const documentType = getDocumentType(fileExtension);

    return {
      label: getFileLabel(fileUrl, title),
      isTextBased: documentType === "txt",
      docs: [
        {
          uri: fileUrl,
          fileType: documentType,
        },
      ],
    };
  }, [fileUrl, title]);

  if (!fileUrl) {
    return null;
  }

  const handleCopyContent = async () => {
    try {
      if (isTextBased) {
        const response = await fetch(fileUrl);
        const text = await response.text();
        await navigator.clipboard.writeText(text);
      } else {
        await navigator.clipboard.writeText(fileUrl);
      }

      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(undefined);
      }, 2000);
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

      setTimeout(() => {
        setIsDownloaded(undefined);
      }, 2000);
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
      >
        <DialogTitle>
          <div className="flex flex-row justify-between items-center">
            <Typography>{label}</Typography>
            <div className="flex flex-row gap-1 items-center">
              <ActionButton
                title="העתק תוכן"
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
        <DialogContent sx={{ p: 0 }} dividers>
          <FileContentModal docs={docs} isTextBased={isTextBased} />
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
