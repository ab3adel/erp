import dayjs from "dayjs";

export const shortcutsItems = [
  {
    label: "Today",
    getValue: () => {
      const today = dayjs();
      return [today.startOf("day"), null];
    },
  },
  {
    label: "Yesterday",
    getValue: () => {
      const today = dayjs();
      return [today.subtract(1, "day").startOf("day"), null];
    },
  },
  {
    label: "This Week",
    getValue: () => {
      const today = dayjs();
      return [today.startOf("week"), today.endOf("week")];
    },
  },
  {
    label: "Last 7 Days",
    getValue: () => {
      const today = dayjs();
      return [today.subtract(7, "day"), today];
    },
  },
  {
    label: "Last 30 Days",
    getValue: () => {
      const today = dayjs();
      return [today.subtract(30, "day"), today];
    },
  },
  {
    label: "Last 90 Days",
    getValue: () => {
      const today = dayjs();
      return [today.subtract(90, "day"), today];
    },
  },
  {
    label: "Last 12 Months",
    getValue: () => {
      const today = dayjs();
      return [today.subtract(12, "month"), today];
    },
  },
  { label: "Custom", getValue: () => [null, null] },
];
