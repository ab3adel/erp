import CoffeeTerms from "./CoffeeTermsTab";
import UnitOfMeasure from "./UnitsOfMeasureTab";
import AccountTypes from "./AccountTypesTab";
import Locations from "./LocationsTab";
import YieldEstimations from "./YieldEstimationsTab";
import HarvestSeasons from "./HarvestSeasonsTab";
import Certifications from "./CertificationsTab";
import KeywordConfiguration from "./KeywordConfigurationTab";
import React from "react";

const tabs = {
  "coffee-terms": CoffeeTerms,
  "units-of-measure": UnitOfMeasure,
  "account-types": AccountTypes,
  "locations": Locations,
  "yield-estimations": YieldEstimations,
  "harvest-seasons": HarvestSeasons,
  "certifications": Certifications,
  "keyword-configuration": KeywordConfiguration,
};

type TabKey = keyof typeof tabsNames;

const WizardTab = ({ tabKey }: { tabKey: TabKey }) => {
  const Tab = React.memo(tabs[tabKey]);
  return <Tab key={tabKey} />;
};

const tabsNames = {
  "coffee-terms": "Coffee Terms",
  "units-of-measure": "Unit of Measure",
  "account-types": "Account Types",
  "locations": "Locations",
  "yield-estimations": "Yield Estimations",
  "harvest-seasons": "Harvest Seasons",
  "certifications": "Certifications",
  "keyword-configuration": "Keyword Configuration",
};

const tabNames = Object.entries(tabsNames).map(([key, name]) => ({
  key: key as TabKey,
  name,
}));

const orderedTabs = [
  "coffee-terms",
  "units-of-measure",
  "account-types",
  "locations",
  "yield-estimations",
  "harvest-seasons",
  "certifications",
  "keyword-configuration",
];

const getNextTab = (key: string) => {
  const nextIndex = orderedTabs.findIndex((tab) => tab === key);

  return nextIndex < orderedTabs.length
    ? orderedTabs[nextIndex + 1]
    : orderedTabs[nextIndex];
};

const firstTabName = orderedTabs[0];

export { WizardTab, tabNames, firstTabName, getNextTab };
