import { FunctionComponent, useEffect, useState } from "react";
import { ChatComponent } from ".";
import { MessageStruct } from "./components";
import axios from "axios";
import { ChatVars } from "./types";

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

  const setVar = (state: ChatVars, val: unknown) => {
    switch (state) {
      case ChatVars.userInput:
        setUserInput(val as string);
        break;
      case ChatVars.messageList:
        setMessageList(val as MessageStruct[]);
        break;
      default:
        break;
    }
  };

  return (
    <ChatComponent
      messages={messageList}
      setVar={setVar}
      userInput={userInput}
      handleSubmit={handleSubmit}
    />
  );
};
