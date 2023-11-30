import { Box } from "@mui/material";
import { FunctionComponent } from "react";

interface Props {
  content: string;
}

export const Message: FunctionComponent<Props> = ({ content }) => {
  return (
    <Box
      sx={{
        border: "1px solid black",
        padding: 1,
        borderRadius: "5%",
        background: "#EEF5FF",
        margin: "20px 0px",
      }}
    >
      {content}
    </Box>
  );
};
