import {
  AppBar,
  Avatar,
  Grid,
  IconButton,
  TextField,
  Typography,
  Tooltip,
} from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import { Message, MessageStruct } from "./components";
import SendIcon from "@mui/icons-material/Send";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import moment from "moment";
import MoreVert from "@mui/icons-material/MoreVert";

export const Chat: FunctionComponent = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [messageList, setMessageList] = useState<MessageStruct[]>([]);

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/messages");
      const messages = data.messages;
      setMessageList(messages);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/messages", {
        content: userInput,
      });
      const newMessage = data.message;
      setMessageList((old) => old.concat([newMessage]));
      setUserInput("");
    } catch (error) {
      console.error(error);
    }
  };

  const mapMessages = () => {
    const first = messageList[0] ?? null;
    if (!first) {
      return <></>;
    }

    let lastDate = moment(first.createdAt);
    return messageList.map((message, i) => {
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
        xl={3}
        sx={{
          border: "1px solid black",
          margin: "auto",
          background:
            "linear-gradient(rgba(187, 156, 192, 0.9), rgba(103, 114, 157, 0.5));",
        }}
      >
        <Grid item xs={12}>
          <AppBar
            position="relative"
            sx={{
              width: "100%",
              background: "inherit",
              display: "flex",
              flexDirection: "row",
              padding: 2,
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
            maxHeight: "500px",
            overflow: "auto",
            scrollbarWidth: "none",
          }}
        >
          {mapMessages()}
        </Grid>
        <Grid item xs={12} sx={{ padding: 0 }}>
          <AppBar
            position="relative"
            sx={{
              width: "100%",
              background: "inherit",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              padding: 3,
              justifyContent: "center",
            }}
          >
            <Tooltip title="Attach an image" arrow>
              <IconButton size="large" sx={{ color: "white" }}>
                <AddPhotoAlternateIcon />
              </IconButton>
            </Tooltip>
            <TextField
              sx={{
                background: "white",
                borderRadius: "5%",
              }}
              type="text"
              value={userInput}
              multiline
              onChange={({ target }) => setUserInput(target.value)}
            />
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
          </AppBar>
        </Grid>
      </Grid>
    </Grid>
  );
};
