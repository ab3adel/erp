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
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import SearchIcon from "@mui/icons-material/Search";
import { useQuery } from "@apollo/client";
import { accountTags } from "./graphql/queries/getAccountsTags";
import { Tag } from "@/shared/models/models";
import { useGenericMutation } from "@/shared";
import { deleteTag } from "./graphql/mutations/deleteTag";
import { createTag } from "./graphql/mutations/createTag";

function randomColor() {
  const red = Math.floor(Math.random() * 106) + 150;
  const green = Math.floor(Math.random() * 106) + 150;
  const blue = Math.floor(Math.random() * 106) + 150;
  const hex = `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
  return hex;
}

interface TagDropdownProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onSelectTag: (tag: Tag) => void;
  onRemoveTag: (tag: Tag) => void;
  selectedTags?: Tag[];
  type: "Account" | "Lot";
}
export const TagsSelect: React.FC<TagDropdownProps> = ({
  anchorEl,
  open,
  selectedTags,
  onRemoveTag,
  onSelectTag,
  type
}) => {
  const [inputValue, setInputValue] = useState("");
  const { data } = useQuery<{
    tags: Tag[];
  }>(accountTags, {
    variables: {
      type: type,
    },
  });
  const filterdTags =
    inputValue.trim() === ""
      ? data?.tags
      : data?.tags.filter((tag) =>
          tag.name.toLowerCase().includes(inputValue.toLowerCase())
        );
  const [color, setColor] = useState("#fff");

  const [createAccountTag] = useGenericMutation<
    unknown,
    {
      name: string;
      color: string;
      group: "Account" | "Lot";
    }
  >(createTag, {
    refetchQueries: ["accountTags"],
  });

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

  const handleAddTag = () => {
    createAccountTag({
      variables: {
        color,
        name: inputValue,
        group: type,
      },
    });
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
          sx={{ mx: 1, flexWrap: selectedTags?.length ? "wrap" : "nowrap" }}
          startAdornment={
            <Box display="flex" alignItems="center">
              <SearchIcon
                sx={{
                  color: "text.secondary",
                  mr: 1,
                }}
              />
              <Box
                display="flex"
                flexWrap="wrap"
                columnGap={0.5}
                rowGap={0.5}
                alignItems="center"
              >
                {selectedTags?.map((value) => (
                  <Chip
                    size="small"
                    label={
                      <Box display="flex" alignItems="center">
                        <Box
                          sx={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            backgroundColor: value.color,
                            marginRight: "4px",
                          }}
                        />
                        {value.name}
                      </Box>
                    }
                    onDelete={() => {
                      onRemoveTag(value);
                    }}
                  />
                ))}
              </Box>
            </Box>
          }
        />
        <Divider />
        <Box
          sx={{
            maxHeight: "150px",
            overflow: "auto",
          }}
        >
          {filterdTags
            ?.filter((tag) => !selectedTags?.some((t) => tag.id === t.id))
            ?.map((tag) => (
              <MenuItem
                key={tag.id}
                selected={isTagSelected(tag)}
                sx={{ bgcolor: "white !important", px: 0 }}
              >
                <List disablePadding sx={{ width: "100%", px: 0 }}>
                  <ListItem
                    onClick={() => {
                      onSelectTag(tag);
                    }}
                  >
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
                      <IconButton
                        edge="end"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTagDelete(tag);
                        }}
                      >
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
            <Button
              fullWidth
              size="small"
              onClick={handleAddTag}
              startIcon={
                <Box
                  sx={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: color,
                    marginRight: "4px",
                  }}
                />
              }
            >
              Create new tag
            </Button>
            <Box
              display="flex"
              mt={2}
              justifyContent="space-between"
              alignItems="center"
            >
              {Array.from([1, 2, 3, 4, 5, 6, 7, 8]).map((item) => {
                const color = randomColor();
                return (
                  <Box
                    onClick={() => {
                      setColor(color);
                    }}
                    key={item}
                    sx={{
                      width: "14px",
                      height: "14px",
                      borderRadius: "50%",
                      backgroundColor: color,
                    }}
                  />
                );
              })}
            </Box>
          </Box>
        )}
      </Paper>
    </Popper>
  );
};
