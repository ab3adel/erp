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
import React, { ReactNode, useMemo, useState } from "react";
import DragIndicatorOutlined from "@mui/icons-material/DragIndicatorOutlined";
import { useCurvedTabs } from "./hooks/useCurvedTabs";
import {
  GridColDef,
  GridColumnVisibilityModel,
  GridFilterModel,
} from "@mui/x-data-grid-pro";

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

  // check if the current subString of pathname matches one of the tabs value and the `linkToRelativePaths` passed then this value should be selected
  const tabsValue = useMemo(
    () =>
      tabs.find((item) => location.pathname.indexOf(item.value) != -1)
        ?.linkToRelativePaths
        ? tabs.find((item) => location.pathname.indexOf(item.value) != -1)
            ?.value
        : location.pathname + location.search,
    [location.pathname, location.search, tabs]
  );

  const SortableCurvedTabList = SortableContainer<{
    children: ReactNode;
  }>(({ children }: { children?: ReactNode }) => (
    <CurvedTabList
      onChange={(_, value) => {
        navigate(value);
      }}
      value={tabsValue}
      variant="scrollable"
      scrollButtons={false}
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
          canDrag={canDrag && !tab.primary}
          canDelete={canDelete}
          onDelete={() => {
            deleteTab(index, tab.id);
          }}
        />
      ))}
    </SortableCurvedTabList>
  );
};

type CurvedTabsProps = {
  tabs: Array<{
    id?: number;
    label: string;
    value: string;
    columnVisibiltyModel?: GridColumnVisibilityModel;
    filterModel?: GridFilterModel;
    columns?: GridColDef[];
    primary?: boolean;
    linkToRelativePaths?: boolean;
  }>;
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
