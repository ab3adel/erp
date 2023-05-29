import { useFormik } from "formik";
import {
  TextField, FormControlLabel,
  RadioGroup,
  Radio
} from "@mui/material";

export const CreateViewForm = ({
  onSubmit,
}: {
  onSubmit: (formValues: Form) => void;
}) => {
  const formik = useFormik<Form>({
    initialValues: {
      label: "",
      type: "personal",
    },
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      id="save_view_form"
      style={{ padding: 7 }}
    >
      <TextField
        id="label"
        name="label"
        fullWidth
        placeholder="Enter label"
        value={formik.values.label}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        sx={{ mb: 2 }}
      />
      <RadioGroup
        aria-label="type"
        name="type"
        value={formik.values.type}
        onChange={formik.handleChange}
      >
        <FormControlLabel
          value="personal"
          control={<Radio />}
          label="Personal"
        />
        <FormControlLabel value="shared" control={<Radio />} label="Shared" />
      </RadioGroup>
    </form>
  );
};

type Form = {
  label: string;
  type: "personal" | "shared";
};
