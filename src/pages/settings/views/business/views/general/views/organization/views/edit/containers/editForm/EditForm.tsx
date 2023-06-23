import { FunctionComponent } from "react";
import { Grid, TextField, Button, MenuItem, Autocomplete } from "@mui/material";
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
        {/* <TextField
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
        </TextField> */}

        <Autocomplete
          disablePortal
          onChange={(_, value) => {
            form.setFieldValue("country", value?.id);
            form.setFieldValue("city", undefined);
            form.setFieldValue("currency", undefined);
            form.setFieldValue("language", undefined);
          }}
          getOptionLabel={(item) => item.name}
          value={
            countires?.countries.data.find(
              (item) => item.id === form.values["country"]
            ) ?? null
          }
          options={countires?.countries.data ?? []}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label="Country"
              sx={{ maxWidth: "440px" }}
              error={!!form.errors.country}
              helperText={form.errors.country}
            />
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <Autocomplete
          disablePortal
          onChange={(_, value) => form.setFieldValue("city", value?.id)}
          value={
            countires?.countries.data
              .map((item) => item.cities)
              .flat()
              .find((item) => item.id === form.values["city"]) ?? null
          }
          options={
            countires?.countries.data.find(
              (item) => item.id === form.values.country
            )?.cities ?? []
          }
          getOptionLabel={(item) => item.name}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label="City"
              sx={{ maxWidth: "440px" }}
              error={!!form.errors.city}
              helperText={form.errors.city}
            />
          )}
        />

        {/* <TextField
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
        </TextField> */}
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
        {/* <TextField
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
        </TextField> */}

        <Autocomplete
          disablePortal
          onChange={(_, value) => form.setFieldValue("language", value?.id)}
          value={
            countires?.countries.data
              .map((item) => item.languages)
              .flat()
              .find((item) => item.id === form.values["language"]) ?? null
          }
          options={
            countires?.countries.data.find(
              (item) => item.id === form.values.country
            )?.languages ?? []
          }
          getOptionLabel={(item) => item.name}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label="Language"
              sx={{ maxWidth: "440px" }}
              error={!!form.errors.language}
              helperText={form.errors.language}
            />
          )}
        />
      </Grid>

      <Grid item xs={12}>
        {/* <TextField
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
        </TextField> */}

        <Autocomplete
          disablePortal
          onChange={(_, value) => form.setFieldValue("currency", value?.id)}
          value={
            countires?.countries.data
              .map((item) => item.currencies)
              .flat()
              .find((item) => item.id === form.values["currency"]) ?? null
          }
          options={
            countires?.countries.data.find(
              (item) => item.id === form.values.country
            )?.currencies ?? []
          }
          getOptionLabel={(item) => item.name}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label="Currency"
              sx={{ maxWidth: "440px" }}
              error={!!form.errors.currency}
              helperText={form.errors.currency}
            />
          )}
        />
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
