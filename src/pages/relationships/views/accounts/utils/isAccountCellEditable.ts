export const isAccountCellEditable = (type: string, cell: string) => {
  const typeInteractiveCells: Record<string, string[]> = {
    farmer: [],
    buyer: [
      "government_id",
      "unit_of_measurement",
      "subscription_type",
      "marital_status",
      "members_in_household",
      "date_of_birth",
      "total_children",
      "read_literate",
      "write_literate",
      "education_level",
      "gender",
    ],
    agent: [
      "government_id",
      "subscription_type",
      "marital_status",
      "members_in_household",
      "date_of_birth",
      "total_children",
      "read_literate",
      "write_literate",
      "education_level",
      "gender",
    ],
    plot: [
      "government_id",
      "subscription_type",
      "marital_status",
      "members_in_household",
      "date_of_birth",
      "total_children",
      "read_literate",
      "write_literate",
      "education_level",
      "gender",
    ],
  };

  const interactiveCells = typeInteractiveCells[type];
  if (interactiveCells && interactiveCells.includes(cell)) {
    return false;
  }
  return true;
};
