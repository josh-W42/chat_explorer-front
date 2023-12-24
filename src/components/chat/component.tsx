import {
  AppBar,
  Avatar,
  Grid,
  IconButton,
  TextField,
  Typography,
  Tooltip,
  Box,
} from "@mui/material";
import { FunctionComponent } from "react";
import { Message, MessageStruct } from "./components";
import SendIcon from "@mui/icons-material/Send";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import moment from "moment";
import MoreVert from "@mui/icons-material/MoreVert";
import { ChatVars } from "./types";

interface Props {
  userInput: string;
  messages: MessageStruct[];
  setVar: (state: ChatVars, val: unknown) => void;
  handleSubmit: () => Promise<void>;
}

export const ChatComponent: FunctionComponent<Props> = ({
  userInput,
  messages,
  setVar,
  handleSubmit,
}) => {
  const mapMessages = () => {
    const first = messages[0] ?? null;
    if (!first) {
      return <></>;
    }

    let lastDate = moment(first.createdAt);
    return messages.map((message, i) => {
      const messageDate = moment(message.createdAt);

      if (i == 0) {
        return (
          <div key={message.id}>
            <Typography
              variant="caption"
              fontStyle={"italic"}
              fontWeight={"bolder"}
              fontSize={"12pt"}
            >
              {messageDate.format("MMM Do YYYY, h:mm A")}
            </Typography>
            <Message messageData={message} />
          </div>
        );
      }

      if (messageDate.day() !== lastDate.day()) {
        lastDate = messageDate;
        return (
          <div key={message.id}>
            <Typography
              variant="caption"
              fontStyle={"italic"}
              fontWeight={"bolder"}
              fontSize={"12pt"}
            >
              {messageDate.format("MMM Do YYYY, h:mm A")}
            </Typography>
            <Message messageData={message} />
          </div>
        );
      }

      return (
        <div key={message.id}>
          <Message key={message.id} messageData={message} />
        </div>
      );
    });
  };

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sm={8}
        md={6}
        lg={4}
        sx={{
          border: "1px solid black",
          margin: "auto",
          maxHeight: "100vh",
          height: "100vh",
          overflow: "hidden",
          background:
            "linear-gradient(rgba(187, 156, 192, 0.9), rgba(103, 114, 157, 0.5));",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            height: "10vh",
            maxHeight: "10vh",
          }}
        >
          <AppBar
            position="relative"
            sx={{
              width: "100%",
              background: "inherit",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
            elevation={0}
          >
            <Avatar />
            <Typography variant="h6" color={"black"} component={"h1"}>
              Who you're talking to
            </Typography>
            <IconButton>
              <MoreVert />
            </IconButton>
          </AppBar>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            padding: 2,
            background: "inherit",
            maxHeight: "80vh",
            height: "80vh",
            overflow: "auto",
            scrollbarWidth: "none",
          }}
        >
          {mapMessages()}
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ padding: 0, height: "10vh", maxHeight: "10vh" }}
        >
          <AppBar
            position="relative"
            sx={{
              width: "100%",
              background: "inherit",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              height: "inherit",
            }}
          >
            <Box sx={{ margin: "auto" }}>
              <Tooltip title="Attach an image" arrow>
                <IconButton size="large" sx={{ color: "white" }}>
                  <AddPhotoAlternateIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Box sx={{ marginY: "auto" }}>
              <TextField
                sx={{
                  background: "white",
                  borderRadius: "5%",
                }}
                type="text"
                value={userInput}
                multiline
                minRows={3}
                onChange={({ target }) =>
                  setVar(ChatVars.userInput, target.value)
                }
              />
            </Box>
            <Box
              sx={{
                margin: "auto",
              }}
            >
              <Tooltip title="Ctrl-Enter" arrow>
                <IconButton
                  size="large"
                  sx={{ color: "white" }}
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  <SendIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </AppBar>
        </Grid>
      </Grid>
    </Grid>
  );
};
