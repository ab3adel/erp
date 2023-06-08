import { FunctionComponent } from "react";
import { Grid, TextField, Button, MenuItem } from "@mui/material";

interface EditFormProps {}

const EditForm: FunctionComponent<EditFormProps> = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <TextField
          label="Company Name"
          value="Long Miles Burundi"
          variant="filled"
          fullWidth
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="Country"
          select
          value="Burundi"
          variant="filled"
          fullWidth
        >
          <MenuItem value="Burundi">Burundi</MenuItem>
        </TextField>
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="City"
          select
          value="Bujumbura"
          variant="filled"
          fullWidth
        >
          <MenuItem value="Bujumbura">Bujumbura</MenuItem>
        </TextField>
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="Address 1"
          value="42, Chaussé P.L. Rwagasore, B.P. 1490"
          variant="filled"
          fullWidth
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="Address 2"
          value="Long Miles Burundi"
          variant="filled"
          fullWidth
          helperText="Optional"
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="Language"
          select
          value="english"
          variant="filled"
          fullWidth
          helperText="Default language; can be customized by team members"
        >
          <MenuItem value="english">English</MenuItem>
        </TextField>
      </Grid>

      <Grid item xs={12}>
        <TextField
          select
          label="Currency"
          value="Burundian Franc"
          variant="filled"
          fullWidth
          helperText="Default currency; customizable throughout the platform"
        >
          <MenuItem value="Burundian Franc">Burundian Franc</MenuItem>
        </TextField>
      </Grid>

      <Grid item xs={12} mt={1}>
        <Button>save changes</Button>
      </Grid>
    </Grid>
  );
};

export default EditForm;
