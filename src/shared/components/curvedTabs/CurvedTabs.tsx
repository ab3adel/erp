import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
import { useLocation, useNavigate } from "react-router-dom";
import { CurvedTabList } from "./components/List";
import { CurvedTab } from "./components/Tab";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Fade } from "@mui/material";
import React, { ReactNode, useState } from "react";
import DragIndicatorOutlined from "@mui/icons-material/DragIndicatorOutlined";
import { useCurvedTabs } from "./hooks/useCurvedTabs";
import { GenericDialog } from "..";

const DragHandle = SortableHandle<{ hover: boolean }>(
  ({ hover }: { hover: boolean }) => (
    <Fade in={hover}>
      <DragIndicatorOutlined
        sx={{
          position: "absolute",
          color: "#008E8F80",
          left: "5px",
          cursor: "move",
        }}
      />
    </Fade>
  )
);

const SortableCurvedTab = SortableElement<SortableCurvedTabProps>(
  ({
    label,
    value,
    canDrag,
    canDelete,
    onDelete,
    ...props
  }: SortableCurvedTabProps) => {
    const [hover, setHover] = useState(false);
    const { pathname } = useLocation();

    return React.cloneElement(
      <CurvedTab
        key={value}
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          if (hover) setHover(false);
        }}
        label={
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            {canDrag && <DragHandle hover={hover} />}
            {label}
            {canDelete &&
              pathname !== value &&
              value.includes("customview") && (
                <Fade in={hover}>
                  <CloseIcon
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete();
                    }}
                    sx={{
                      position: "absolute",
                      zIndex: 2,
                      color: "#008E8F80",
                      right: "5px",
                    }}
                  />
                </Fade>
              )}
          </Box>
        }
        value={value}
        disableRipple
      />,
      props
    );
  }
);

export const CurvedTabs = ({
  tabs,
  canDelete = true,
  canDrag = true,
  localStorageKey = "",
}: CurvedTabsProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState<number>();
  const {
    orderTab,
    value: sortedTabs,
    deleteTab,
  } = useCurvedTabs({
    localStorageKey,
    tabs,
    canDelete,
    canDrag,
  });

  const handleDeleteTab = () => {
    deleteTab(selectedTab || 0);
    setSelectedTab(undefined);
  };

  const SortableCurvedTabList = SortableContainer<{
    children: ReactNode;
  }>(({ children }: { children?: ReactNode }) => (
    <CurvedTabList
      onChange={(_, value) => {
        navigate(value);
      }}
      value={location.pathname + location.search}
      scrollButtons
    >
      {children}
    </CurvedTabList>
  ));

  return (
    <SortableCurvedTabList axis="x" onSortEnd={orderTab} useDragHandle>
      {sortedTabs.map((tab, index) => (
        <SortableCurvedTab
          key={tab.value + tab.label}
          index={index}
          value={tab.value}
          label={tab.label}
          canDrag={canDrag}
          canDelete={canDelete}
          onDelete={() => setSelectedTab(index)}
        />
      ))}
      <GenericDialog
        open={selectedTab !== undefined}
        onClose={() => setSelectedTab(undefined)}
        onSubmit={handleDeleteTab}
        dialog={{
          title: "Delete Tab",
          submitButton: {
            label: "Delete",
          },
        }}
      >
        <Box>
          Are you sure you want to delete the tab{" "}
          <b>{sortedTabs[selectedTab || 0]?.label}</b>?
        </Box>
      </GenericDialog>
    </SortableCurvedTabList>
  );
};

type CurvedTabsProps = {
  tabs: Array<{ label: string; value: string }>;
  canDrag?: boolean;
  canDelete?: boolean;
  localStorageKey?: string;
};

type SortableCurvedTabProps = Record<string, any> & {
  value: string;
  label: string;
  canDrag?: boolean;
  canDelete?: boolean;
  onDelete: () => void;
};
