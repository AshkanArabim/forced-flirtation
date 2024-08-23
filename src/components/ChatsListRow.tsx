import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'

// attributes passed from parent, so component can be only presentational
interface Props {
  name: string;
  lastMessage: string;
  profilePicURL: string;
}

export default function ChatsListRow ({name, lastMessage, profilePicURL}: Props) {
  return (
    <ListItem
      secondaryAction={
        <IconButton edge='end' aria-label="delete">
          <DeleteIcon />
        </IconButton>
      }
    >
      {/* probably a combination of "Avatar with text and icon" and "Align list items" */}
      <ListItemAvatar>
        <Avatar alt={`${name}'s profile picture`} src={profilePicURL} />
      </ListItemAvatar>
      <ListItemText 
        primary={name}
        secondary={lastMessage}
      />
      <div>
        {/* TODO: use MUI Material Icons */}
      </div>
    </ListItem>
  )
}
