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
import { useQuery } from "@apollo/client";
import { accountTags } from "./graphql/queries/getAccountsTags";
import { Tag } from "@/shared/models/models";
import { useGenericMutation } from "@/shared";
import { deleteTag } from "./graphql/mutations/deleteTag";

interface TagDropdownProps {
  anchorEl: HTMLElement | null;
  open: boolean;
}
export const TagsSelect: React.FC<TagDropdownProps> = ({ anchorEl, open }) => {
  const [inputValue, setInputValue] = useState("");
  const { data } = useQuery<{
    tags: Tag[];
  }>(accountTags);
  const filterdTags =
    inputValue.trim() === ""
      ? data?.tags
      : data?.tags.filter((tag) =>
          tag.name.toLowerCase().includes(inputValue.toLowerCase())
        );

  const [deleteFn] = useGenericMutation<unknown, { id: number }>(deleteTag, {
    refetchQueries: ["accountTags"],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleTagDelete = (tag: Tag) => {
    deleteFn({
      variables: {
        id: Number(tag.id),
      },
    });
  };

  const isTagSelected = (tag: Tag) => {
    return filterdTags?.some((selectedTag) => selectedTag.id === tag.id);
  };

  return (
    <Popper
      open={Boolean(anchorEl) && open}
      anchorEl={anchorEl}
      sx={{ zIndex: 2 }}
    >
      <Paper
        sx={{
          width: "250px",
          overflow: "auto",
          py: 2,
          px: 1,
        }}
      >
        <InputBase
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search"
          sx={{ mx: 1 }}
          startAdornment={
            <SearchIcon
              sx={{
                color: "text.secondary",
                mr: 1,
              }}
            />
          }
        />
        <Divider />
        <Box
          sx={{
            maxHeight: "150px",
            overflow: "auto",
          }}
        >
          {filterdTags?.map((tag) => (
            <MenuItem
              key={tag.id}
              selected={isTagSelected(tag)}
              sx={{ bgcolor: "white !important", px: 0 }}
            >
              <List disablePadding sx={{ width: "100%", px: 0 }}>
                <ListItem>
                  <Box
                    sx={{
                      width: "13px",
                      height: "13px",
                      borderRadius: "50%",
                      backgroundColor: tag.color,
                      marginRight: "8px",
                    }}
                  />
                  <ListItemText
                    primary={tag.name}
                    sx={{
                      width: "70px",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={() => handleTagDelete(tag)}>
                      <DeleteIcon sx={{ color: "text.secondary" }} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </MenuItem>
          ))}
        </Box>
        {filterdTags?.length === 0 && (
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
