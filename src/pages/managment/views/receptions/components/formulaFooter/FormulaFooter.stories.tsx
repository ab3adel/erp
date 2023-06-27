import type { Meta, StoryObj } from "@storybook/react";
import FormulaFooter from "./FormulaFooter";
import { action } from "@storybook/addon-actions";
// import { action } from "@storybook/addon-actions";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title:
    "pages/managment/views/receptions/components/FormulaFooter/FormulaFooter",
  component: FormulaFooter,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof FormulaFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    formulaList: [
      "Total Cost: USD$84,568.45",
      "/",
      "Total Weight: 34,568.45 Kg",
    ],
    result: "Total Average Unit Cost: 2.45 USD/Kg",
  },
};
