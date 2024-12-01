import { Box, Typography, Paper, IconButton, TextField } from "@mui/material";
import { IUser } from "../types/user";
import { IMessage } from "../types/messages";
import { useEffect, useRef, useState } from "react";
import { useCreateMessage } from "../hooks/user.hooks";
import { Send } from "@mui/icons-material";

interface ChatWindowProps {
  messages?: IMessage[];
  currentUser: IUser;
  contact?: IUser;
  conversationId: number;
}

const ChatWindow = ({
  messages,
  currentUser,
  conversationId,
}: ChatWindowProps) => {
  const [newMessage, setNewMessage] = useState("");
  const {
    mutateAsync: createNewMessage,
    isSuccess,
    isError,
  } = useCreateMessage();

  const handleSendMessage = async () => {
    if (newMessage !== "") {
      await createNewMessage({
        content: newMessage,
        conversationId,
      });
    }
  };

  useEffect(() => {
    if (isSuccess && !isError) {
      setNewMessage("");
    }
  }, [isSuccess, isError]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: '100%' }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column-reverse",
          flexGrow: 1,
          height: "80vh",
          overflow: "auto",
          p: 2,
        }}
      >
        {(messages || []).map((message) => (
          <Box key={message.id}>
            <Paper
              elevation={1}
              sx={{
                p: 2,
                maxWidth: "70%",
                marginTop: '10px',
                marginBottom: '10px',
                float: message.userId === currentUser.id ? 'right' : 'left',
                bgcolor:
                  message.userId === currentUser.id
                    ? "primary.light"
                    : "background.paper",
              }}
            >
              <Typography variant="body1">{message.content}</Typography>
              <Typography
                variant="caption"
                sx={{ display: "block", mt: 1, textAlign: "right" }}
              >
                {message.timestamp}
              </Typography>
            </Paper>
          </Box>
        ))}
      </Box>

      {conversationId && (
        <TextField
          fullWidth
          size="small"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton
                edge="end"
                color="primary"
                disabled={newMessage === ""}
                onClick={handleSendMessage}
              >
                <Send />
              </IconButton>
            ),
          }}
        />
      )}
    </Box>
  );
};

export default ChatWindow;
