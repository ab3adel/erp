import type { Meta, StoryObj } from "@storybook/react";
import TableSaveCancelActions from "./TableSaveCancelActions";
import { action } from "@storybook/addon-actions";
// import { action } from "@storybook/addon-actions";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "shared/components/TableSaveCancelActions/TableSaveCancelActions",
  component: TableSaveCancelActions,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TableSaveCancelActions>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {},
};
