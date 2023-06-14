import type { Meta, StoryObj } from "@storybook/react";
import PermissionOverview from "./PermissionOverview";
import { modulesImages } from "@/shared/enums/modules-images";
import { Actions } from "@/shared/enums/actions";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title:
    "pages/settings/views/business/views/teams/components/PermissionOverview",
  component: PermissionOverview,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    icon: {
      options: Object.keys(modulesImages), // iterator
      mapping: modulesImages,
      control: {
        type: "select",
      },
    },
    permissionList: {
      control: {
        type: "array",
        of: {
          actions: {
            control: { type: "check", options: Object.values(Actions) },
          },
          label: { control: "text" },
        },
      },
    },
  },
} satisfies Meta<typeof PermissionOverview>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    icon: modulesImages.CoffeeManagment,
    label: "Coffee Management",
    permissionList: [
      { actions: [Actions.read], label: "Management" },
      { actions: [Actions.delete], label: "Management Actions" },
      { actions: [Actions.read, Actions.delete], label: "Sample History" },
      {
        actions: [Actions.delete, Actions.read, Actions.write],
        label: "Sell History",
      },
    ],
  },
};
