import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer'

const supportedTypes = new Set(
  DocViewerRenderers.flatMap((r) => (r as { fileTypes?: string[] }).fileTypes ?? [])
)

function getDocumentType(fileExtension: string | undefined): string {
  return fileExtension && supportedTypes.has(fileExtension) ? fileExtension : 'txt'
}

export interface FileViewerProps {
  fileUrl: string
  title?: string
}

export function FileViewer({ fileUrl, title }: FileViewerProps) {
  if (!fileUrl) {
    return (
      <div className="p-8 text-center text-slate-500">
        No file selected for viewing.
      </div>
    )
  }

  const fileExtension = fileUrl.split('.').pop()?.toLowerCase()
  const documentType = getDocumentType(fileExtension)

  const docs = [{ 
    uri: fileUrl, 
    fileType: documentType 
  }]

  return (
    <div className="mb-8 border border-slate-200 rounded-lg overflow-hidden">
      {title && (
        <h3 className="m-0 py-4 px-5 text-lg bg-slate-50 border-b border-slate-200">
          {title}
        </h3>
      )}
      <DocViewer
        documents={docs}
        pluginRenderers={DocViewerRenderers}
        config={{
          header: {
            disableHeader: false,
          },
        }}
        style={{ minHeight: '500px', color: 'black' }}
        
      />
    </div>
  )
}