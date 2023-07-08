import { TagsSelect } from "@/shared/components/tags/TagsSelect";
import { Button } from "@mui/material";
import { useLogic } from "./TagActions.logic";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

const TagAction = () => {
  const {
    anchorEl,
    handleTagButtonClick,
    selectedRow,
    handleDeleteTag,
    handleAddTag,
  } = useLogic();

  return (
    <>
      <Button
        variant="text"
        startIcon={<LocalOfferIcon />}
        onClick={handleTagButtonClick}
      >
        TAG
      </Button>
      <TagsSelect
        anchorEl={anchorEl}
        open={Boolean(selectedRow)}
        selectedTags={selectedRow?.tags}
        onRemoveTag={handleDeleteTag}
        onSelectTag={handleAddTag}
        type="Lot"
      />
    </>
  );
};

export default TagAction;
