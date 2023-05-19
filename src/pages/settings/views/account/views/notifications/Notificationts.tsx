import {
  Box,
  Typography,
  Divider,
  FormControlLabel,
  Switch,
  RadioGroup,
  Radio,
  FormHelperText,
  Button,
} from "@mui/material";

export const Notificationts = () => {
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
          control={<Switch defaultChecked />}
          label="Email Notifications"
        />
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Emails (password change, system updates, etc.) will be sent to your
          email address: laura@longmilescoffee.com
        </Typography>
      </Box>
      <Typography variant="body1">Email Notifications</Typography>
      <Divider orientation="horizontal" sx={{ pt: 3 }} />
      <Box sx={{ my: 3 }}>
        <RadioGroup defaultValue="password_updates" sx={{ rowGap: "14px" }}>
          <FormControlLabel
            value="password_updates"
            control={<Radio />}
            label="Password updates"
          />
          <Box>
            <FormControlLabel
              value="security_updates"
              control={<Radio />}
              label="Security updates"
            />
            <FormHelperText sx={{ color: "text.secondary", fontSize: 14 }}>
              Get notified about all security, terms of use, and privacy policy
              updates
            </FormHelperText>
          </Box>
          <Box>
            <FormControlLabel
              value="communications"
              control={<Radio />}
              label="Communications"
            />
            <FormHelperText sx={{ color: "text.secondary", fontSize: 14 }}>
              Get notified every time you receive a survey, form, or message
              from accounts
            </FormHelperText>
          </Box>

          <Box>
            <FormControlLabel
              value="mcultivo_app_updates"
              control={<Radio />}
              label="M·Cultivo App updates"
            />
            <FormHelperText sx={{ color: "text.secondary", fontSize: 14 }}>
              Get notified about new features or updates occurring in the
              platform
            </FormHelperText>
          </Box>
        </RadioGroup>
      </Box>

      <Button variant="contained" sx={{ textTransform: "uppercase" }}>
        Save Changes
      </Button>
    </Box>
  );
};
