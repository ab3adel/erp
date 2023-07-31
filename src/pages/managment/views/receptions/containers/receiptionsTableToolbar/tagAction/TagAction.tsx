import { TagsSelect } from "@/shared/components/tags/TagsSelect";
import { Button } from "@mui/material";
import { useLogic } from "./TagActions.logic";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import TagICon from '@/assets/images/tag.svg'

const TagAction = () => {
  const {
    anchorEl,
    handleTagButtonClick,
    selectedRow,
    handleDeleteTag,
    handleAddTag,
    isInEditMode,
  } = useLogic();

  return (
    <>
      <Button
        style={{ display: isInEditMode ? "none" : undefined }}
        variant="text"
        startIcon={<img src={TagICon} />}
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
