import {
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { UseTextSearchResult } from "../hooks/useTextSearch";

type TextSearchBarProps = {
  placeholder?: string;
} & UseTextSearchResult;

export function TextSearchBar({
  placeholder = "Search...",
  searchQuery,
  setSearchQuery,
  useRegex,
  setUseRegex,
  regexError,
  matchCount,
  currentMatchIndex,
  handleNext,
  handlePrev,
}: TextSearchBarProps) {
  return (
    <div className="flex flex-row items-center gap-1">
      <TextField
        size="small"
        variant="outlined"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        error={!!regexError}
        helperText={regexError}
        inputProps={{
          sx: {
            "&::placeholder": {
              textAlign: "right",
            },
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip
                title={useRegex ? "מצב רגקס" : "מצב רגיל"}
                placement="bottom"
              >
                <IconButton
                  size="small"
                  onClick={() => setUseRegex(!useRegex)}
                  color={useRegex ? "primary" : "default"}
                  sx={{
                    fontSize: 12,
                    fontFamily: "monospace",
                    minWidth: 32,
                  }}
                >
                  .*
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
      {searchQuery && matchCount > 0 && (
        <div className="flex flex-row items-center gap-0">
          <Typography variant="body2" color="text.secondary">
            {currentMatchIndex + 1} / {matchCount}
          </Typography>
          <Tooltip title="קודם" placement="bottom">
            <IconButton size="small" onClick={handlePrev}>
              <KeyboardArrowUp />
            </IconButton>
          </Tooltip>
          <Tooltip title="הבא" placement="bottom">
            <IconButton size="small" onClick={handleNext}>
              <KeyboardArrowDown />
            </IconButton>
          </Tooltip>
        </div>
      )}
    </div>
  );
}
