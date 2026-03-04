import { CheckRounded, ErrorOutlineOutlined } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import React from "react";

type ActionButtonProps = {
  isSuccess: boolean | undefined;
  actionIcon: React.ReactNode;
  handleAction: () => void;
  title?: string;
};

export function ActionButton({
  isSuccess,
  actionIcon,
  handleAction,
  title,
}: ActionButtonProps) {
  return (
    <Tooltip title={title} placement="bottom" disableHoverListener={!title}>
      <IconButton onClick={isSuccess === undefined ? handleAction : undefined}>
        {isSuccess ? (
          <CheckRounded color="success" fontSize="small" />
        ) : isSuccess === false ? (
          <ErrorOutlineOutlined color="error" fontSize="small" />
        ) : (
          actionIcon
        )}
      </IconButton>
    </Tooltip>
  );
}
