import { FileViewer } from "./components/FileViewer";
import { Stack, Typography } from "@mui/material";

function App() {
  return (
    <div className="max-w-7xl mx-auto p-8 gap-4">
      <div className="flex flex-col mb-10">
        <Typography variant="h4" sx={{ mb: 2 }}>
          Local Files
        </Typography>
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          <FileViewer fileUrl="/files/hello.txt" title="hello.txt" />
          <FileViewer fileUrl="/files/script.py" title="script.py" />
          <FileViewer fileUrl="/files/first_pdf.pdf" title="first_pdf.pdf" />
          <FileViewer fileUrl="/files/logo.png" title="logo.png" />
          <FileViewer fileUrl="/files/document.docx" title="document.docx" />
          <FileViewer
            fileUrl="/files/presentation.pptx"
            title="presentation.pptx"
          />
          <FileViewer fileUrl="/files/data.js" title="data.js" />
          <FileViewer fileUrl="/files/index.css" title="index.css" />
          <FileViewer fileUrl="/files/vite.svg" title="vite.svg" />
          <FileViewer fileUrl="/files/hook.ts" title="hook.ts" />
          <FileViewer fileUrl="/files/code.sh" title="code.sh" />
        </Stack>
      </div>
      <div className="flex flex-col">
        <Typography variant="h4" sx={{ mb: 2 }}>
          Public Files
        </Typography>
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          <FileViewer
            fileUrl="https://jsonplaceholder.typicode.com/todos/1"
            title="mock json"
          />
          <FileViewer
            fileUrl="https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png"
            title="mock png"
          />
          <FileViewer
            fileUrl="https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf"
            title="mock pdf"
          />
        </Stack>
      </div>
    </div>
  );
}

export default App;
