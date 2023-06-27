import type { Meta, StoryObj } from "@storybook/react";
import ApproveReceiptions from "./ApproveReceiptions";
import { action } from "@storybook/addon-actions";
// import { action } from "@storybook/addon-actions";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title:
    "pages/managment/views/receptions/components/ApproveReceiptions/ApproveReceiptions",
  component: ApproveReceiptions,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ApproveReceiptions>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    type: "selection",
    totalWeight: 3567.98,
    confirmButtonProps: {
      onClick: action("confirmed"),
    },
    onCancelClick: action("canceled"),
  },
};
