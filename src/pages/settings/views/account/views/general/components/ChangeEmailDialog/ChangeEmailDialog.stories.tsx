import type { Meta, StoryObj } from "@storybook/react";
import ChangeEmailDialog from "./ChangeEmailDialog";
import { action } from "@storybook/addon-actions";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title:
    "pages/settings/views/account/views/general/components/ChangeEmailDialog",
  component: ChangeEmailDialog,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ChangeEmailDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    open: true,
    onCancel: action("canceled"),
    confirmButtonProps: {
      onClick: action("confirmed"),
    },
    textfieldProps: {
      value: "admin@admin.com",
      onChange: action("email changed"),
    },
  },
};
