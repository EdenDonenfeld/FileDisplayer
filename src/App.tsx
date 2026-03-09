import { FileViewer } from "./components/FileViewer";
import { Stack, Typography } from "@mui/material";

function App() {
  return (
    <div className="flex flex-col max-w-7xl mx-auto p-8 gap-8">
      <div className="flex flex-col">
        <Typography variant="h4" sx={{ mb: 2 }}>
          Local Files
        </Typography>
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          <FileViewer fileUrl="/files/hello.txt" title="hello.txt" />
          <FileViewer fileUrl="/files/first_pdf.pdf" title="first_pdf.pdf" />
          <FileViewer fileUrl="/files/logo.png" title="logo.png" />
          <FileViewer fileUrl="/files/vite.svg" title="vite.svg" />
          <FileViewer
            fileUrl="/files/corgi-smiling.gif"
            title="corgi-smiling.gif"
          />
          <FileViewer fileUrl="/files/script.py" title="script.py" />
          <FileViewer fileUrl="/files/data.js" title="data.js" />
          <FileViewer fileUrl="/files/index.css" title="index.css" />
          <FileViewer fileUrl="/files/hook.ts" title="hook.ts" />
          <FileViewer fileUrl="/files/code.sh" title="code.sh" />
          <FileViewer fileUrl="/files/index.html" title="index.html" />
          <FileViewer fileUrl="/files/page.html" title="page.html" />
          <FileViewer fileUrl="/files/component.tsx" title="component.tsx" />
          <FileViewer
            fileUrl="/files/csv-example.csv"
            title="csv-example.csv"
          />
          <FileViewer fileUrl="/files/names-csv.csv" title="names-csv.csv" />
        </Stack>
      </div>
      <div className="flex flex-col">
        <Typography variant="h4" sx={{ mb: 2 }}>
          Public Files
        </Typography>
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          <FileViewer
            fileUrl="https://jsonplaceholder.typicode.com/todos/1"
            title="json"
          />
          <FileViewer
            fileUrl="https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png"
            title="png"
          />
          <FileViewer
            fileUrl="https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf"
            title="pdf"
          />
        </Stack>
      </div>
      <div className="flex flex-col">
        <Typography variant="h4" sx={{ mb: 2 }}>
          Not Supported Files
        </Typography>
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          <FileViewer fileUrl="/files/document.docx" title="docx" />
          <FileViewer fileUrl="/files/presentation.pptx" title="pptx" />
          <FileViewer fileUrl="/files/names.xlsx" title="xlsx" />
          <FileViewer
            fileUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/dash/BigBuckBunnyVideo.mp4"
            title="mp4"
          />
          <FileViewer fileUrl="/files/home.zip" title="zip" />
        </Stack>
      </div>
    </div>
  );
}

export default App;
