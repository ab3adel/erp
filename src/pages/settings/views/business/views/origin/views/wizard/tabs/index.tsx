import React from "react";
import CoffeeTerms from "./CoffeeTermsTab";
import UnitOfMeasure from "./UnitsOfMeasureTab";
import AccountTypes from "./AccountTypesTab";
import Locations from "./LocationsTab";
import YieldEstimations from "./YieldEstimationsTab";
import HarvestSeasons from "./HarvestSeasonsTab";
import Certifications from "./CertificationsTab";
import KeywordConfiguration from "./KeywordConfigurationTab";

const tabs = {
  "coffee_terms": CoffeeTerms,
  "units_of_measure": UnitOfMeasure,
  "account_types": AccountTypes,
  "locations": Locations,
  "yield_estimations": YieldEstimations,
  "harvest_seasons": HarvestSeasons,
  "certifications": Certifications,
  "keyword_configuration": KeywordConfiguration,
};

type TabKey = keyof typeof tabsNames;

const WizardTab = ({ tabKey }: { tabKey: TabKey }) => {
  const Tab = React.memo(tabs[tabKey]);
  return <Tab key={tabKey} />;
};

const tabsNames = {
  "coffee_terms": "Coffee Terms",
  "units_of_measure": "Unit of Measure",
  "account_types": "Account Types",
  "locations": "Locations",
  "yield_estimations": "Yield Estimations",
  "harvest_seasons": "Harvest Seasons",
  "certifications": "Certifications",
  "keyword_configuration": "Keyword Configuration",
};

const tabNames = Object.entries(tabsNames).map(([key, name]) => ({
  key: key as TabKey,
  name,
}));

const orderedTabs = [
  "coffee_terms",
  "units_of_measure",
  "account_types",
  "locations",
  "yield_estimations",
  "harvest_seasons",
  "certifications",
  "keyword_configuration",
];

const getNextTab = (key: string) => {
  const nextIndex = orderedTabs.findIndex((tab) => tab === key);

  return nextIndex < orderedTabs.length
    ? orderedTabs[nextIndex + 1]
    : orderedTabs[nextIndex];
};

const isLastTab = (key: string) => orderedTabs.slice(-1)[0] === key;

const firstTabName = orderedTabs[0];

export { WizardTab, tabNames, firstTabName, getNextTab, isLastTab };
