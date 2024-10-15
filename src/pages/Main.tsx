import { Box } from "@mui/material";
import Page from "../components/Page";
import ChatWindow from "../components/ChatWindow";
import ContactsList from "../components/ContactsList";
import { useBoundStore } from "../store";
import { useContacts } from "../hooks/user.hooks";
import { useEffect } from "react";
import { cable } from "../../socket"

const Main = () => {
  const { user, isLoadingUser } = useBoundStore();
  const authenticatedUser = !isLoadingUser && !!user.id;
  const { data } = useContacts({
    enabled: !!user.id,
  });

  useEffect(() => {
    if (authenticatedUser) {
      cable.subscriptions.create(
        { channel: "ConversationsChannel" },
        { received: (message) => console.log(message) }
      );
    }
  }, []);

  return (
    <Page title="Your chats">
      <Box className={"flex flex-grow"}>
        <ContactsList contacts={data} />
        <ChatWindow />
      </Box>
    </Page>
  );
};

export default Main;
