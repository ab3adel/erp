import React, { useState } from "react";
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Box,
  Container,
  Grid,
  Paper,
  Divider,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddFile from "@mui/icons-material/NoteAdd";
import DeleteIcon from "@mui/icons-material/Delete";

interface Note {
  title: string;
  content: string;
  creationDate: string;
}

const initialNotes: Note[] = [
  {
    title: "Note 1",
    content: "This is the content of note 1",
    creationDate: "2023-05-30",
  },
  {
    title: "Note 2",
    content: "This is the content of note 2",
    creationDate: "2023-05-29",
  },
];

export const AgentNotes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [newNote, setNewNote] = useState<Note>({
    title: "",
    content: "",
    creationDate: "",
  });
  const [openDialog, setOpenDialog] = useState(false);

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
  };

  const handleDeleteNote = (note: Note) => {
    const updatedNotes = notes.filter((n) => n !== note);
    setNotes(updatedNotes);
    setSelectedNote(null);
  };

  const handleAddNote = () => {
    if (newNote.title && newNote.content && newNote.creationDate) {
      setNotes([...notes, newNote]);
      setNewNote({ title: "", content: "", creationDate: "" });
      setOpenDialog(false);
    }
  };

  return (
    <div>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6">My Notes</Typography>
          <Box sx={{ flexGrow: 1, textAlign: "right" }}>
            <IconButton
              sx={{ mr: 1 }}
              color="primary"
              onClick={() => setOpenDialog(true)}
            >
              <AddFile />
            </IconButton>
            <IconButton color="error">
              <DeleteIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Divider />
      <div style={{ display: "flex", position: "relative" }}>
        <Drawer
          variant="permanent"
          anchor="left"
          sx={{
            width: 200,
          }}
          PaperProps={{
            sx: {
              position: "absolute",
              width: 200,
            },
          }}
        >
          <List>
            {notes.map((note) => (
              <ListItem
                key={note.title}
                button
                selected={selectedNote === note}
                onClick={() => handleNoteClick(note)}
              >
                <ListItemText
                  primary={note.title}
                  secondary={note.creationDate}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteNote(note)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Container>
          <Grid container spacing={2} height={"100vh"}>
            <Grid item xs={12} sm={12}>
              <Paper elevation={0}>
                {selectedNote ? (
                  <Box p={2}>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                      {selectedNote.title}
                    </Typography>
                    <Typography variant="body1">
                      {selectedNote.content}
                    </Typography>
                  </Box>
                ) : (
                  <Box p={2}>
                    <Typography variant="h5">No note selected</Typography>
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Note</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            variant="filled"
            value={newNote.title}
            onChange={(e) =>
              setNewNote({
                ...newNote,
                title: e.target.value,
              })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Content"
            variant="filled"
            multiline
            rows={4}
            value={newNote.content}
            onChange={(e) =>
              setNewNote({
                ...newNote,
                content: e.target.value,
              })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Creation Date"
            variant="filled"
            type="date"
            value={newNote.creationDate}
            onChange={(e) =>
              setNewNote({
                ...newNote,
                creationDate: e.target.value,
              })
            }
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddNote} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
