import { FunctionComponent } from "react";
import { Grid, TextField, Button, MenuItem } from "@mui/material";
import { useLogic } from "./EditForm.logic";

const EditForm: FunctionComponent = () => {
  const { countires, form, formHasChanged } = useLogic();

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <TextField
          label="Company Name"
          variant="filled"
          fullWidth
          name="company_name"
          value={form.values.company_name}
          error={!!form.errors.company_name}
          helperText={form.errors.company_name}
          onChange={form.handleChange}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="Country"
          select
          value={form.values.country}
          variant="filled"
          fullWidth
          name="country"
          onChange={(e) => {
            form.setFieldValue("city", undefined);
            form.setFieldValue("currency", undefined);
            form.setFieldValue("language", undefined);
            form.handleChange(e);
          }}
          error={!!form.errors.country}
          helperText={form.errors.country}
        >
          {countires?.countries.data.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="City"
          select
          value={form.values.city}
          variant="filled"
          fullWidth
          name="city"
          onChange={form.handleChange}
          error={!!form.errors.city}
          helperText={form.errors.city}
        >
          {countires?.countries.data
            .find((item) => item.id === form.values.country)
            ?.cities.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
        </TextField>
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="Address 1"
          value={form.values.address_1}
          variant="filled"
          fullWidth
          name="address_1"
          error={!!form.errors.address_1}
          helperText={form.errors.address_1}
          onChange={form.handleChange}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="Address 2"
          value={form.values.address_2}
          variant="filled"
          fullWidth
          helperText={form.errors.address_2 ?? "Optional"}
          name="address_2"
          error={!!form.errors.address_2}
          onChange={form.handleChange}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="Language"
          select
          value={form.values.language}
          variant="filled"
          fullWidth
          helperText={
            form.errors.language ??
            "Default language; can be customized by team members"
          }
          name="language"
          onChange={form.handleChange}
          error={!!form.errors.language}
        >
          {countires?.countries.data
            .find((item) => item.id === form.values.country)
            ?.languages.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
        </TextField>
      </Grid>

      <Grid item xs={12}>
        <TextField
          select
          label="Currency"
          value={form.values.currency}
          variant="filled"
          fullWidth
          helperText={
            form.errors.currency ??
            "Default currency; customizable throughout the platform"
          }
          name="currency"
          onChange={form.handleChange}
          error={!!form.errors.currency}
        >
          {countires?.countries.data
            .find((item) => item.id === form.values.country)
            ?.currencies.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
        </TextField>
      </Grid>

      <Grid item xs={12} mt={1}>
        <Button
          onClick={form.submitForm}
          disabled={form.isSubmitting || formHasChanged}
        >
          save changes
        </Button>
      </Grid>
    </Grid>
  );
};

export default EditForm;
