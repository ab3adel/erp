import { useLocation, useNavigate } from "react-router-dom";
import { CurvedTabList } from "./components/List";
import { CurvedTab } from "./components/Tab";

export const CurvedTabs = ({ tabs }: CurvedTabsProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <CurvedTabList
      onChange={(_, value) => {
        navigate(value);
      }}
      value={location.pathname}
      scrollButtons
    >
      {tabs.map((tab) => (
        <CurvedTab
          key={tab.value}
          label={tab.label}
          value={tab.value}
          disableRipple
        />
      ))}
    </CurvedTabList>
  );
};

type CurvedTabsProps = {
  tabs: Array<{ label: string; value: string }>;
};
