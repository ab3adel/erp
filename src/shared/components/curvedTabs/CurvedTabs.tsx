import { CurvedTabList } from "./components/List";
import { CurvedTab } from "./components/Tab";

export const CurvedTabs = ({ onChange, value, tabs }: CurvedTabsProps) => {
  return (
    <CurvedTabList onChange={onChange} value={value} scrollButtons>
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
  value: string;
  onChange: (_: React.SyntheticEvent, newValue: string) => void;
  tabs: Array<{ label: string; value: string }>;
};
