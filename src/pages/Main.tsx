import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Page from "../components/Page";
import ChatWindow from "../components/ChatWindow";
import ContactsList from "../components/ContactsList";
import { useBoundStore } from "../store";
import { useContacts, useMessages } from "../hooks/user.hooks";
import { IMessage } from "../types/messages";

const Main = () => {
  const { user, messages } = useBoundStore();
  const [selectedConversation, setSelectedConversation] = useState<number>();
  const [shouldFetch, setShouldFetch] = useState(true);
  const [filteredMessages, setFilteredMessages] = useState<{
    [key: number]: IMessage[];
  }>({});

  const { data: contacts = [] } = useContacts({
    enabled: !!user.id,
  });

  const { data: conversationMessages = [] } = useMessages({
    conversationId: selectedConversation as number,
    enabled: !!selectedConversation && shouldFetch,
  });

  const handleConversation = (conversationId: number) => {
    setShouldFetch(!filteredMessages[conversationId]);
    setSelectedConversation(conversationId);
  };

  useEffect(() => {
    if (
      conversationMessages?.length &&
      !filteredMessages?.[selectedConversation as number]
    ) {
      setFilteredMessages((prevInputValues) => ({
        ...prevInputValues,
        [selectedConversation as number]: (conversationMessages || []).concat(
          prevInputValues?.[selectedConversation as number] || []
        ),
      }));
    }
  }, [selectedConversation, conversationMessages]);

  useEffect(() => {
    if (messages && messages.length) {
      const latestMessage = messages.pop();
      const filteredMessagesCopy = [latestMessage, ...filteredMessages[latestMessage?.conversationId as number]]

      setFilteredMessages((prevInputValues) => ({
        ...prevInputValues,
        [latestMessage?.conversationId as number]: filteredMessagesCopy as IMessage[]
      }));
    }
  }, [selectedConversation, messages]);

  return (
    <Page title="Your chats">
      <Box className={"flex flex-grow"}>
        <ContactsList contacts={contacts} onClickContact={handleConversation} />
        <ChatWindow
          messages={filteredMessages?.[selectedConversation as number]}
          currentUser={user}
          conversationId={selectedConversation as number}
        />
      </Box>
    </Page>
  );
};

export default Main;
