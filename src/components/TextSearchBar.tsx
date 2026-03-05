import {
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { UseTextSearchResult } from "../hooks/useTextSearch";
import debounce from "lodash/debounce";
import { useEffect, useMemo, useState } from "react";

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
  const [localQuery, setLocalQuery] = useState(searchQuery);

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const debouncedSetSearch = useMemo(
    () =>
      debounce((newVal: string) => {
        setSearchQuery(newVal);
      }, 500),
    [setSearchQuery],
  );

  useEffect(() => {
    return () => {
      debouncedSetSearch.cancel();
    };
  }, [debouncedSetSearch]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = e.target.value;
    setLocalQuery(value);
    debouncedSetSearch(value);
  };

  return (
    <div className="flex flex-row items-center gap-1">
      <TextField
        size="small"
        variant="outlined"
        placeholder={placeholder}
        value={localQuery}
        onChange={handleInputChange}
        error={!!regexError}
        helperText={regexError}
        className="w-64"
        inputProps={{
          sx: {
            "&::placeholder": {
              textAlign: "right",
              fontSize: "14px",
            },
          },
        }}
        InputProps={{
          style: {
            fontSize: 14,
          },
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip
                title={useRegex ? "עבור למצב רגיל" : "עבור למצב רגקס"}
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
