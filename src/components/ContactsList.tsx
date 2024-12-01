import {
  Paper,
  Box,
  TextField,
  List,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import { ConversationInfo } from "../types/user";
import { useState } from "react";

interface ContactsListProps {
  contacts: ConversationInfo[] | null;
  onClickContact: (conversationId: number) => void;
}

const ContactsList = ({ contacts, onClickContact }: ContactsListProps) => {
  const [searchField, setSearchField] = useState("");

  return (
    <Paper
      elevation={3}
      sx={{
        width: 300,
        overflow: "auto",
        borderRight: 1,
        borderColor: "divider",
      }}
    >
      <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search contacts"
          value={searchField}
          onChange={(e) => {
            setSearchField(e.currentTarget.value);
          }}
        />
      </Box>
      <List>
        {(contacts || [])
          .filter((cnt) =>
            cnt.user.name.toLowerCase().includes(searchField.toLowerCase())
          )
          .map((contact: ConversationInfo) => (
            <li
              className="flex mx-2 my-8"
              key={contact.id}
              onClick={() => onClickContact(contact.conversationId)}
            >
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText
                primary={contact.user.name}
                secondary={""}
                secondaryTypographyProps={{ noWrap: true }}
              />
            </li>
          ))}
      </List>
    </Paper>
  );
};

export default ContactsList;
