import { useRemoveLotsTagsRelationMutation } from "@/shared/hooks/graphql/mutation/removeLotsTagRelations/useRemoveLotsTagRelations";
import { useUpdateOrInsertLotMutation } from "@/shared/hooks/graphql/mutation/updateOrInsertLot/updateOrInsertLot";
import { Tag } from "@/shared/models/models";
import { useGridApiContext } from "@mui/x-data-grid-pro";
import { useState } from "react";

export const useLogic = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const apiRef = useGridApiContext();

  const selectedRows = apiRef.current.getSelectedRows().values();

  const selectedRow = selectedRows.next().value;

  const [removeTags] = useRemoveLotsTagsRelationMutation();

  const [editLot] = useUpdateOrInsertLotMutation();

  const handleDeleteTag = (tag: Tag) => {
    removeTags({
      variables: {
        ids: [Number(tag.id)],
        lotId: selectedRow.id,
      },
    });
  };

  const handleAddTag = (tag: Tag) => {
    const newTagsList = [tag, ...selectedRow.tags].map((item) => ({
      ...item,
      id: Number(item.id),
      group: "Lot",
      tenant_id: undefined,
    }));

    editLot({
      variables: {
        input: {
          id: Number(selectedRow.id),
          tags: newTagsList,
        },
      },
    });
  };

  const handleTagButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  return {
    anchorEl,
    handleTagButtonClick,
    selectedRow,
    handleDeleteTag,
    handleAddTag,
  };
};
