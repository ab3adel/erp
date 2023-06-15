import { useFormik } from "formik";
import {
  TextField,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
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
        variant="filled"
        label="Name"
        value={formik.values.label}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        sx={{ mb: 2 }}
      />
      <FormLabel required sx={{ color: "grey.600" }}>
        Visible to
      </FormLabel>
      <RadioGroup
        aria-label="type"
        name="type"
        value={formik.values.type}
        onChange={formik.handleChange}
      >
        <FormControlLabel
          value="personal"
          control={<Radio />}
          label="Only me"
        />
        <FormControlLabel value="shared" control={<Radio />} label="Team" />
      </RadioGroup>
    </form>
  );
};

type Form = {
  label: string;
  type: "personal" | "shared";
};
