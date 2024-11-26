import { Box, Typography, Paper } from "@mui/material";
import { IUser } from "../types/user";
import { IMessage } from "../types/messages";

interface ChatWindowProps {
  messages?: IMessage[];
  currentUser: IUser;
  contact?: IUser;
}

const ChatWindow = ({ messages, currentUser }: ChatWindowProps) => {
  return (
    <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
      {/* <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
        <Typography variant="h6">{contact?.name}</Typography>
      </Box> */}
      <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
        {(messages || []).map((message) => (
          <Box key={message.id}>
            <Paper
              elevation={1}
              sx={{
                p: 2,
                maxWidth: "70%",
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

      {/* Message Input */}
      {/* <Box
        component="form"
        onSubmit={handleSendMessage}
        sx={{ p: 2, borderTop: 1, borderColor: "divider" }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton type="submit" edge="end" color="primary">
                <SendIcon />
              </IconButton>
            ),
          }}
        />
      </Box> */}
    </Box>
  );
};

export default ChatWindow;
