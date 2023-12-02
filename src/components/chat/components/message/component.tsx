import { Paper, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import moment from "moment";

export interface MessageStruct {
  content: string;
  createdAt: string;
  deletedAt: string | null;
  updatedAt: string;
  id: string;
}

interface Props {
  messageData: MessageStruct;
}

export const Message: FunctionComponent<Props> = ({ messageData }) => {
  const { content, createdAt } = messageData;

  return (
    <Paper
      sx={{
        padding: 1,
        background: "rgba(255, 255, 255, 0.3)",
        margin: "20px 0px",
        display: "flex",
        justifyContent: "space-between",
      }}
      elevation={3}
    >
      <Typography fontSize={"15pt"}>{content}</Typography>
      <Typography fontStyle={"italic"} fontWeight={"bolder"}>
        {moment(createdAt).format("h:mm a")}
      </Typography>
    </Paper>
  );
};
