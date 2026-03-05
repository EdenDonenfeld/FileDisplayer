import { ErrorOutlineOutlined } from "@mui/icons-material";
import { CircularProgress, Typography } from "@mui/material";

export const CustomLoadingRenderer = ({ fileName }: { fileName: string }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-slate-50 gap-4">
      <CircularProgress size={32} />
      <Typography color="textSecondary" variant="body2">
        טוען את {fileName || "הקובץ"}...
      </Typography>
    </div>
  );
};

export const CustomNoRenderer = ({ fileName }: { fileName: string }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-slate-50 gap-2 text-red-500">
      <ErrorOutlineOutlined fontSize="large" color="inherit" />
      <Typography color="inherit" variant="body1">
        לצערי לא ניתן להציג את הקובץ במסך זה
      </Typography>
      <Typography color="textSecondary" variant="body2">
        {fileName}
      </Typography>
    </div>
  );
};
