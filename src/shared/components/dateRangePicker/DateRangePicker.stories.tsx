import type { Meta, StoryObj } from "@storybook/react";
import DateRangePicker from "./DateRangePicker";
import { action } from "@storybook/addon-actions";
// import { action } from "@storybook/addon-actions";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "shared/components/dateRangePicker/DateRangePicker",
  component: DateRangePicker,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    onChange: action("Changed Range"),
    value: [" Mon Jun 26 2023 00:00:00 GMT+0300 (غرينتش+03:00)", null],
  },
};
