import { createView } from "@/pages/relationships/views/accounts/graphql/mutations/createView";
import { deleteView } from "@/pages/relationships/views/accounts/graphql/mutations/deleteView";
import { useGenericMutation } from "@/shared";
import { useMutation } from "@apollo/client";
import {
  GridColDef,
  GridColumnVisibilityModel,
  GridFilterModel,
} from "@mui/x-data-grid-pro";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";

export const useCurvedTabs = ({
  localStorageKey,
  tabs = [],
  canDelete,
  canDrag,
}: Params) => {
  const [value, setValue] = useLocalStorage<
    {
      id?: number;
      value: string;
      label: string;
      columnVisibiltyModel?: GridColumnVisibilityModel;
      filterModel?: GridFilterModel;
      columns?: GridColDef[];
      primary?: boolean;
    }[]
  >(localStorageKey, tabs);
  const { pathname } = useLocation();
  const [mutateFn] = useMutation<
    unknown,
    {
      name: string;
      module: string;
      is_shared: boolean;
      created_by: number;
      query: string;
    }
  >(createView);
  const userId = localStorage.getItem("token")
    ? localStorage.getItem("token")?.split("|")[0]
    : "";
  const [deleteFn] = useGenericMutation<unknown, { id: number }>(deleteView);

  useEffect(() => {
    const value = localStorage.getItem(localStorageKey);
    if (!value && tabs.length > 0 && (canDelete || canDrag)) {
      setValue(tabs);
    }
  }, []);

  // orderTab
  const orderTab = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    const newTabs = [...value];
    const [removed] = newTabs.splice(oldIndex, 1);
    newTabs.splice(newIndex, 0, removed);
    setValue(newTabs);
  };

  // delete a tab
  const deleteTab = (index: number, id?: number) => {
    const newTabs = [...value];
    newTabs.splice(index, 1);
    setValue(newTabs);
    if (id) {
      deleteFn({
        variables: {
          id,
        },
      });
    }
  };
  // add a tab
  const createTab = (
    label: string,
    columnVisibiltyModel: GridColumnVisibilityModel,
    columns: GridColDef[],
    filterModel?: GridFilterModel,
    is_shared?: boolean
  ) => {
    const newTabs = [...value];
    mutateFn({
      variables: {
        created_by: Number(userId),
        is_shared: is_shared || false,
        module: localStorageKey,
        name: label.toLowerCase().replace(/\s/g, "-"),
        query: JSON.stringify({
          columnVisibiltyModel,
          columns,
          filterModel,
        }),
      },
      refetchQueries: ["UserViews"],
    });
    newTabs.push({
      value:
        "/" +
        pathname.split("/")[1] +
        "/customview/" +
        `?tab=${label.toLowerCase().replace(/\s/g, "-")}`,
      label,
      columnVisibiltyModel,
      columns,
      filterModel,
    });

    setValue(newTabs);
  };
  // get custom views
  const getCustomViews = () => {
    const customViews = value.filter((tab) => tab.value.includes("customview"));
    return customViews;
  };

  //get column visibilty model by tab param
  const getColumnVisibiltyModelByTabParam = (tabParam: string) => {
    const customViews = getCustomViews();
    const customView = customViews.find((view) => view.label === tabParam);
    return customView?.columnVisibiltyModel;
  };

  //get column visibilty model by tab param
  const getGridFilterModelByTabParam = (tabParam: string) => {
    const customViews = getCustomViews();
    const customView = customViews.find(
      (view) => view.label === tabParam.split("-").join(" ")
    );
    return customView?.filterModel;
  };

  // get columns by tab param
  const getColumnsByTabParam = (tabParam: string) => {
    const customViews = getCustomViews();
    const customView = customViews.find((view) =>
      view.value.includes(tabParam)
    );
    return customView?.columns;
  };

  return {
    value: canDrag || canDelete ? value : tabs,
    orderTab,
    deleteTab,
    createTab,
    getCustomViews,
    getColumnVisibiltyModelByTabParam,
    getColumnsByTabParam,
    getGridFilterModelByTabParam,
  };
};

type Params = {
  localStorageKey: string;
  tabs?: {
    id?: number;
    value: string;
    label: string;
    columnVisibiltyModel?: GridColumnVisibilityModel;
    columns?: GridColDef[];
    filterModel?: GridFilterModel;
    primary?: boolean;
  }[];
  canDrag?: boolean;
  canDelete?: boolean;
};
