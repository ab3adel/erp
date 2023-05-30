import React, { useState } from "react";
import {
  InputBase,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Popper,
  MenuItem,
  Typography,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

interface Tag {
  id: string;
  label: string;
  color: string;
}

interface TagDropdownProps {
  tags: Tag[];
  onDelete: (tag: Tag) => void;
  onSearch: (query: string) => void;
  anchorEl: HTMLElement | null;
}
export const TagsSelect: React.FC<TagDropdownProps> = ({
  tags,
  onDelete,
  onSearch,
  anchorEl,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onSearch(e.target.value);
  };

  const handleTagDelete = (tag: Tag) => {
    onDelete(tag);
  };

  const isTagSelected = (tag: Tag) => {
    return tags.some((selectedTag) => selectedTag.id === tag.id);
  };

  return (
    <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} sx={{ zIndex: 2 }}>
      <Paper
        sx={{
          width: "200px",
          p: 2,
        }}
      >
        <InputBase
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search"
          startAdornment={
            <SearchIcon
              sx={{
                color: "text.primary",
                mr: 1,
              }}
            />
          }
        />
        <Divider />
        {tags.map((tag) => (
          <MenuItem
            key={tag.id}
            selected={isTagSelected(tag)}
            onClick={() => handleTagDelete(tag)}
            sx={{ bgcolor: "white !important", px: 0 }}
          >
            <List disablePadding sx={{ width: "100%" }}>
              <ListItem>
                <Box
                  sx={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: tag.color,
                    marginRight: "8px",
                  }}
                />
                <ListItemText primary={tag.label} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => handleTagDelete(tag)}>
                    <DeleteIcon sx={{ color: "text.secondary" }} />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </MenuItem>
        ))}
        {tags.length === 0 && (
          <Box width="100%" my={1} textAlign="center">
            <Button fullWidth startIcon={<AddIcon />}>
              Create new tag
            </Button>
            <Typography variant="body2" sx={{ p: 2 }}>
              No tags found.
            </Typography>
          </Box>
        )}
      </Paper>
    </Popper>
  );
};
