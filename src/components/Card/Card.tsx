import React, { useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import "./_index.scss";

type CardProps = {
  strokeColor: string;
  label: string;
  isDisabled?: boolean;
  onToggle?: () => void;
};

const Card = ({ strokeColor, label, isDisabled, onToggle }: CardProps) => {
  const [disabled, setDisabled] = useState(isDisabled);

  useEffect(() => {
    setDisabled(isDisabled);
  }, [isDisabled]);

  const handleToggleState = () => {
    if (onToggle) {
      onToggle();
    }
  };

  return (
    <Box
      className={`clickable-card ${disabled ? "disabled" : ""}`}
      style={{
        width: "8rem",
        height: "5rem",
        border: `solid 3px ${strokeColor}`,
        borderRadius: "10px",
        textAlign: "center",
      }}
      onClick={handleToggleState}
    >
      <Typography>{label}</Typography>
    </Box>
  );
};

export default Card;
