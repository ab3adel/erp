import {
  Box,
  Typography,
  Divider,
  FormControlLabel,
  Switch,
  FormHelperText,
  Button,
  Checkbox,
} from "@mui/material";
import { useLogic } from "./Notifications.logic.";

export const Notificationts = () => {
  const { form, isSubmittingDisabled, profileData } = useLogic();

  return (
    <Box mx="24px" py={4}>
      <Box>
        <Typography
          variant="h2"
          fontWeight={700}
          sx={{ color: "common.black", pt: 1, pb: 4 }}
        >
          Notifications
        </Typography>
        <Typography variant="body1">Privacy</Typography>
      </Box>
      <Divider orientation="horizontal" sx={{ pt: 3 }} />
      <Box sx={{ my: 3 }}>
        <FormControlLabel
          control={
            <Switch
              checked={form.values.email_notifications}
              onChange={form.handleChange}
              name="email_notifications"
            />
          }
          label="Email Notifications"
        />
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Emails (password change, system updates, etc.) will be sent to your
          email address: {profileData?.me?.email}
        </Typography>
      </Box>
      <Typography variant="body1">Email Notifications</Typography>
      <Divider orientation="horizontal" sx={{ pt: 3 }} />
      <Box sx={{ my: 3 }}>
        <Box my={3}>
          <FormControlLabel
            value="password_updates"
            control={
              <Checkbox
                checked={form.values.password_updates}
                onChange={form.handleChange}
                name="password_updates"
                disabled={!form.values.email_notifications}
              />
            }
            label="Password updates"
          />
        </Box>
        <Box my={3}>
          <FormControlLabel
            value="security_updates"
            control={
              <Checkbox
                checked={form.values.security_updates}
                onChange={form.handleChange}
                name="security_updates"
                disabled={!form.values.email_notifications}
              />
            }
            label="Security updates"
          />
          <FormHelperText sx={{ color: "text.secondary", fontSize: 14 }}>
            Get notified about all security, terms of use, and privacy policy
            updates
          </FormHelperText>
        </Box>
        <Box my={3}>
          <FormControlLabel
            value="communications"
            control={
              <Checkbox
                checked={form.values.communications}
                onChange={form.handleChange}
                name="communications"
                disabled={!form.values.email_notifications}
              />
            }
            label="Communications"
          />
          <FormHelperText sx={{ color: "text.secondary", fontSize: 14 }}>
            Get notified every time you receive a survey, form, or message from
            accounts
          </FormHelperText>
        </Box>

        <Box my={3}>
          <FormControlLabel
            value="mcultivo_app_updates"
            control={
              <Checkbox
                checked={form.values.Mcultivo_App_updates}
                onChange={form.handleChange}
                name="Mcultivo_App_updates"
                disabled={!form.values.email_notifications}
              />
            }
            label="M·Cultivo App updates"
          />
          <FormHelperText sx={{ color: "text.secondary", fontSize: 14 }}>
            Get notified about new features or updates occurring in the platform
          </FormHelperText>
        </Box>
      </Box>

      <Button
        disabled={isSubmittingDisabled}
        variant="contained"
        sx={{ textTransform: "uppercase" }}
        onClick={form.submitForm}
      >
        Save Changes
      </Button>
    </Box>
  );
};
