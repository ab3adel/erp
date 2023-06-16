import type { Meta, StoryObj } from "@storybook/react";
import VerifingEmailDialog from "./VerifingEmailDialog";
import { action } from "@storybook/addon-actions";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title:
    "pages/settings/views/account/views/general/components/VerifingEmailDialog",
  component: VerifingEmailDialog,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof VerifingEmailDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    verifiyEmail: "laura@longmiles.com.",
    open: true,
    confirmButtonProps: { onClick: action("confitmed") },
    onCancel: action("canceled"),
    textfieldProps: {
      value: "123124124",
      onChange: action("confirm code changed"),
    },
  },
};
