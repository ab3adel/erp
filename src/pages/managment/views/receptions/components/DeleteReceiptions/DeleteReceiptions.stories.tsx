import type { Meta, StoryObj } from "@storybook/react";
import DeleteReceiptions from "./DeleteReceiptions";
import { action } from "@storybook/addon-actions";
// import { action } from "@storybook/addon-actions";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title:
    "pages/managment/views/receptions/components/DeleteReceiptions/DeleteReceiptions",
  component: DeleteReceiptions,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof DeleteReceiptions>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    numberToDelete: 3,
    open: true,
    onCancelClick: action("canceled"),
    confirmButtonProps: { onClick: action("confirmed") },
  },
};
