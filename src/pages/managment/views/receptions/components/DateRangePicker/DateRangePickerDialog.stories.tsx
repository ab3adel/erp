import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import DateRangePickerDialog from "./DateRangePickerDialog";
// import { action } from "@storybook/addon-actions";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title:
    "pages/managment/views/receptions/components/DateRangePickerDialog/DateRangePickerDialog",
  component: DateRangePickerDialog,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof DateRangePickerDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    open: true,
    confirmButtonProps: { onClick: action("Confirmed") },
    value: [new Date().toString(), new Date().toString()],
    onChange: action("changed"),
    onCancelClick: action("canceled"),
  },
};
