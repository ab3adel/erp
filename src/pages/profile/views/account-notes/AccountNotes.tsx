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
  Box,
  Container,
  Grid,
  Paper,
  Divider,
  TextField,
  Tooltip,
} from "@mui/material";
import AddFile from "@mui/icons-material/NoteAddOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import SaveIcon from "@mui/icons-material/SaveOutlined";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Account, Note } from "@/shared/models/models";
import { accountProfile } from "../../graphql/queries/accountProfile";
import _ from "lodash";
import { useGenericMutation } from "@/shared";
import { saveAccount } from "@/pages/relationships/views/accounts/graphql/mutations/saveAccount";
import { AccountInput } from "@/pages/relationships/views/accounts/types";

export const AccountNotes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditModeActive, setIsEditModeActive] = useState(false);
  const { id } = useParams();

  const [edit] = useGenericMutation<
    {
      updateOrInsertAccount: {
        id: number;
      };
    },
    Variables
  >(saveAccount, { refetchQueries: ["accountProfile"] });

  useQuery<{ account: Account }, { id: number }>(accountProfile, {
    variables: {
      id: Number(id),
    },
    onCompleted: (data) => {
      setNotes(data.account.notes || []);
    },
  });

  const handleNoteClick = (note: Note) => {
    if (selectedNote === note) {
      setSelectedNote(null);
      setIsEditModeActive(false);
    } else {
      setSelectedNote(note);
      setIsEditModeActive(false);
    }
  };

  const handleDeleteNote = (note: Note) => {
    const updatedNotes = notes.filter((n) => n !== note);
    setNotes(updatedNotes);
    setSelectedNote(null);
    setIsEditModeActive(false);
  };

  const handleAddNote = () => {
    const newNoteData = {
      note_title: `Note title`,
      note_body: `Note content`,
      created_at: new Date(),
      id: _.uniqueId("newNote") as any,
    } as Note;
    setNotes([...notes, newNoteData]);
    setSelectedNote(newNoteData);
    setIsEditModeActive(true);
  };

  const handleNoteTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (selectedNote) {
      setSelectedNote({
        ...selectedNote,
        note_title: event.target.value,
      });
    }
  };

  const handleNoteContentChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (selectedNote) {
      setSelectedNote({
        ...selectedNote,
        note_body: event.target.value,
      });
    }
  };

  const handleSaveNote = () => {
    if (selectedNote) {
      edit({
        variables: {
          input: {
            id: Number(id),
            notes: [
              ...(notes
                .filter((note) => !String(note.id).includes("newNote"))
                .map((note) => ({
                  id: note.id,
                  note_body: note.note_body,
                  note_title: note.note_title,
                })) as Note[]),
              {
                ...(!String(selectedNote.id).includes("newNote") && {
                  id: selectedNote.id,
                }),
                note_title: selectedNote.note_title,
                note_body: selectedNote.note_body,
              } as Note,
            ],
          },
        },
      });
      setIsEditModeActive(false);
    }
  };

  return (
    <div>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6">My Notes</Typography>
          <Box sx={{ flexGrow: 1, textAlign: "right" }}>
            <Tooltip title="Add">
              <IconButton
                sx={{ mr: 1 }}
                color="primary"
                onClick={handleAddNote}
              >
                <AddFile />
              </IconButton>
            </Tooltip>
            {selectedNote && (
              <Tooltip title="Delete">
                <IconButton
                  sx={{ mr: 1 }}
                  onClick={() => handleDeleteNote(selectedNote)}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )}
            {isEditModeActive && (
              <Tooltip title="Delete">
                <IconButton onClick={handleSaveNote}>
                  <SaveIcon />
                </IconButton>
              </Tooltip>
            )}
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
                key={note.note_title}
                button
                selected={selectedNote === note}
                onClick={() => handleNoteClick(note)}
              >
                <ListItemText
                  primary={note.note_title}
                  secondary={note.created_at?.toISOString()?.split("T")?.[0]}
                />
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
                    {isEditModeActive ? (
                      <TextField
                        variant="standard"
                        sx={{ mb: 8 }}
                        value={selectedNote.note_title}
                        onChange={handleNoteTitleChange}
                        fullWidth
                      />
                    ) : (
                      <Typography
                        variant="h5"
                        sx={{ mb: 2 }}
                        onClick={() => setIsEditModeActive(true)}
                      >
                        {selectedNote.note_title}
                      </Typography>
                    )}
                    {isEditModeActive ? (
                      <TextField
                        variant="standard"
                        value={selectedNote.note_body}
                        onChange={handleNoteContentChange}
                        fullWidth
                        multiline
                        rows={6}
                      />
                    ) : (
                      <Typography
                        variant="body1"
                        onClick={() => setIsEditModeActive(true)}
                      >
                        {selectedNote.note_body}
                      </Typography>
                    )}
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
    </div>
  );
};

type Variables = {
  input: AccountInput;
};
