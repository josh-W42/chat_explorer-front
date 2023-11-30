import {
  AppBar,
  Avatar,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import { Message } from "./components";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

interface Message {
  content: string;
}

export const Chat: FunctionComponent = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [messageList, setMessageList] = useState<Message[]>([]);

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

  const getMessageComponents = () => {
    return messageList.map((message) => {
      return (
        <Message
          key={Math.floor(Math.random() * 1000)}
          content={message.content}
        />
      );
    });
  };

  return (
    <Container sx={{ border: "1px solid black", width: "25%" }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <AppBar
            position="relative"
            sx={{
              width: "100%",
              background: "inherit",
              display: "flex",
              flexDirection: "row",
            }}
            elevation={0}
          >
            <Avatar />
            <Typography variant="h6" color={"black"} component={"h1"}>
              Who you're talking to
            </Typography>
          </AppBar>
        </Grid>
        <Grid item xs={12} sx={{ padding: 0 }}>
          {getMessageComponents()}
        </Grid>
        <Grid item xs={12} sx={{ padding: 0 }}>
          <AppBar
            position="relative"
            sx={{
              width: "100%",
              background: "inherit",
              display: "flex",
              flexDirection: "row",
            }}
            elevation={0}
          >
            <TextField
              type="text"
              value={userInput}
              onChange={({ target }) => setUserInput(target.value)}
            />
            <IconButton
              size="large"
              onClick={() => {
                handleSubmit();
              }}
            >
              <SendIcon />
            </IconButton>
          </AppBar>
        </Grid>
      </Grid>
    </Container>
  );
};
