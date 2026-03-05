import { FileViewer } from "./components/FileViewer";
import { Stack, Typography } from "@mui/material";

function App() {
  return (
    <div className="max-w-7xl mx-auto p-8">
      <Typography variant="h4" sx={{ mb: 2 }}>
        Files
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
  );
}

export default App;
