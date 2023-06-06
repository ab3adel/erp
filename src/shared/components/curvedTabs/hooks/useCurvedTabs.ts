import { GridColDef, GridColumnVisibilityModel } from "@mui/x-data-grid-pro";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";

export const useCurvedTabs = ({ localStorageKey, tabs = [] }: Params) => {
  const [value, setValue] = useLocalStorage<
    {
      value: string;
      label: string;
      columnVisibiltyModel?: GridColumnVisibilityModel;
      columns?: GridColDef[];
    }[]
  >(localStorageKey, tabs);
  const { pathname } = useLocation();

  useEffect(() => {
    const value = localStorage.getItem(localStorageKey);
    if (!value && tabs.length > 0) {
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
  const deleteTab = (index: number) => {
    const newTabs = [...value];
    newTabs.splice(index, 1);
    setValue(newTabs);
  };
  // add a tab
  const createTab = (
    label: string,
    columnVisibiltyModel: GridColumnVisibilityModel,
    columns: GridColDef[]
  ) => {
    const newTabs = [...value];

    console.log(columnVisibiltyModel);
    newTabs.push({
      value:
        "/" +
        pathname.split("/")[1] +
        "/customview/" +
        `?tab=${label.toLowerCase().replace(/\s/g, "-")}`,
      label,
      columnVisibiltyModel,
      columns,
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
  // get columns by tab param
  const getColumnsByTabParam = (tabParam: string) => {
    const customViews = getCustomViews();
    const customView = customViews.find((view) =>
      view.value.includes(tabParam)
    );
    return customView?.columns;
  };

  return {
    value,
    orderTab,
    deleteTab,
    createTab,
    getCustomViews,
    getColumnVisibiltyModelByTabParam,
    getColumnsByTabParam,
  };
};

type Params = {
  localStorageKey: string;
  tabs?: { value: string; label: string }[];
};
