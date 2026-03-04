import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { useMemo, useState } from 'react'

const supportedTypes = new Set(
  DocViewerRenderers.flatMap((r) => (r as { fileTypes?: string[] }).fileTypes ?? []),
)

function getDocumentType(fileExtension: string | undefined): string {
  return fileExtension && supportedTypes.has(fileExtension) ? fileExtension : 'txt'
}

function getFileLabel(fileUrl: string, title?: string) {
  if (title) return title
  const parts = fileUrl.split('?')[0]?.split('#')[0]?.split('/') ?? []
  return parts[parts.length - 1] || fileUrl
}

export interface FileViewerProps {
  fileUrl: string
  title?: string
  buttonVariant?: 'text' | 'outlined' | 'contained'
}

export function FileViewer({ fileUrl, title, buttonVariant = 'outlined' }: FileViewerProps) {
  const [open, setOpen] = useState(false)

  const { docs, isTextBased, label } = useMemo(() => {
    const fileExtension = fileUrl.split('?')[0]?.split('#')[0]?.split('.').pop()?.toLowerCase()
    const documentType = getDocumentType(fileExtension)

    return {
      label: getFileLabel(fileUrl, title),
      isTextBased: documentType === 'txt',
      docs: [
        {
          uri: fileUrl,
          fileType: documentType,
        },
      ],
    }
  }, [fileUrl, title])

  if (!fileUrl) {
    return null
  }

  return (
    <>
      <Button variant={buttonVariant} onClick={() => setOpen(true)}>
        {label}
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="lg">
        <DialogTitle>{label}</DialogTitle>
        <DialogContent dividers>
          <Box
            sx={{
              height: '70vh',
              ...(isTextBased
                ? {
                    fontFamily:
                      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                    whiteSpace: 'pre-wrap',
                    '& *': { whiteSpace: 'inherit' },
                  }
                : null),
            }}
            dir={isTextBased ? 'ltr' : 'auto'}
          >
            <DocViewer
              documents={docs}
              pluginRenderers={DocViewerRenderers}
              config={{
                header: {
                  disableHeader: true,
                },
              }}
              style={{ height: '100%', color: 'black' }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}