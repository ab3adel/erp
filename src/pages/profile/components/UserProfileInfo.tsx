import { CircularProgressWithLabel } from "@/shared/components/CircularProgressWithLabel";
import {
  Paper,
  Box,
  Badge,
  Avatar,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOfferOutlined";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import EditIcon from "@mui/icons-material/Edit";
import StayCurrentPortraitOutlinedIcon from "@mui/icons-material/StayCurrentPortraitOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";

import { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import TextField from "@mui/material/TextField";

interface UserData {
  name?: string;
  accountId?: string;
  type?: string;
  progressValue?: number;
  mobile?: string;
  whatsapp?: string;
  email?: string;
  subscription?: string;
  govId?: string;
  language?: string;
}

interface UserProfileInfoProps {
  userData: UserData;
}

export const UserProfileInfo: React.FC<UserProfileInfoProps> = ({
  userData,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [updatedContactDetails, setUpdatedContactDetails] = useState({
    mobile: userData.mobile,
    whatsapp: userData.whatsapp,
    email: userData.email,
    subscription: userData.subscription,
    language: userData.language,
  });
  const [locationDetailsEditMode, setLocationDetailsEditMode] = useState(false);
  const [updatedLocationDetails, setUpdatedLocationDetails] = useState({
    govId: userData.govId,
  });

  const handleSave = () => {
    // Save the updated contact details
    // You can implement your logic here, such as making an API call to update the contact details in the backend

    // Disable the editing mode and update the state
    setEditMode(false);
  };

  const handleSaveLocationDetails = () => {
    // Save the updated location details
    // You can implement your logic here, such as making an API call to update the location details in the backend

    // Disable the editing mode and update the state
    setLocationDetailsEditMode(false);
  };

  const {
    name,
    accountId,
    type,
    progressValue,
    mobile,
    whatsapp,
    email,
    subscription,
    govId,
    language,
  } = userData;

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        minWidth: 300,
        height: "100%",
        overflow: "auto",
      }}
    >
      <Box textAlign="center" my={2}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <Box
              sx={{
                width: 12,
                height: 12,
                bgcolor: "secondary.main",
                borderRadius: "50%",
              }}
            />
          }
        >
          <Avatar alt="Travis Howard" />
        </Badge>
        <Box mt={2}>
          <Typography
            variant="body1"
            fontWeight={600}
            sx={{ color: "common.black" }}
            gutterBottom
          >
            {name}
          </Typography>
          <Typography
            variant="body2"
            fontWeight={500}
            fontSize={12}
            sx={{ color: "text.secondary", mb: 1 }}
          >
            Account ID : {accountId}
          </Typography>
          <Typography
            variant="body2"
            fontWeight={500}
            sx={{ color: "primary.main", mb: 1 }}
          >
            {type}
          </Typography>
          <Box display="flex" columnGap={2} justifyContent="center">
            <CircularProgressWithLabel
              value={progressValue || 0}
              color="secondary"
            />
            <IconButton
              sx={{
                border: (theme) => `1px solid ${theme.palette.primary.main}`,
              }}
            >
              <LocalOfferIcon sx={{ color: "primary.main" }} />
            </IconButton>
            <IconButton
              sx={{
                border: (theme) => `1px solid ${theme.palette.primary.main}`,
              }}
            >
              <SmsOutlinedIcon sx={{ color: "primary.main" }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mt={4}
        >
          <Typography variant="body1" fontWeight={600}>
            Contact Details
          </Typography>
          {editMode ? (
            <IconButton onClick={handleSave}>
              <SaveIcon color="primary" />
            </IconButton>
          ) : (
            <IconButton onClick={() => setEditMode(true)}>
              <EditIcon />
            </IconButton>
          )}
        </Box>
        <Divider />
        <Box mt={2} display="flex" flexDirection="column" rowGap={1}>
          <Box>
            {editMode ? (
              <TextField
                variant="filled"
                label="Mobile"
                fullWidth
                sx={{ mb: 1 }}
                value={updatedContactDetails.mobile}
                onChange={(e) =>
                  setUpdatedContactDetails({
                    ...updatedContactDetails,
                    mobile: e.target.value,
                  })
                }
              />
            ) : (
              <Box>
                <Typography
                  variant="body2"
                  fontWeight={400}
                  fontSize={12}
                  gutterBottom
                  sx={{ color: "grey.700" }}
                >
                  Mobile
                </Typography>
                <Box display="flex" columnGap={1} alignItems="center">
                  <StayCurrentPortraitOutlinedIcon sx={{ color: "grey.700" }} />
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    sx={{ color: "grey.700" }}
                  >
                    {mobile}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
          <Box>
            {editMode ? (
              <TextField
                variant="filled"
                label="Whatsapp"
                fullWidth
                sx={{ mb: 1 }}
                value={updatedContactDetails.whatsapp}
                onChange={(e) =>
                  setUpdatedContactDetails({
                    ...updatedContactDetails,
                    whatsapp: e.target.value,
                  })
                }
              />
            ) : (
              <Box>
                <Typography
                  variant="body2"
                  fontWeight={400}
                  fontSize={12}
                  gutterBottom
                  sx={{ color: "grey.700" }}
                >
                  Whatsapp
                </Typography>
                <Box display="flex" columnGap={1} alignItems="center">
                  <WhatsAppIcon sx={{ color: "grey.700" }} />
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    sx={{ color: "grey.700" }}
                  >
                    {whatsapp}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
          <Box>
            {editMode ? (
              <TextField
                variant="filled"
                label="Email"
                fullWidth
                sx={{ mb: 1 }}
                value={updatedContactDetails.email}
                onChange={(e) =>
                  setUpdatedContactDetails({
                    ...updatedContactDetails,
                    email: e.target.value,
                  })
                }
              />
            ) : (
              <Box>
                <Typography
                  variant="body2"
                  fontWeight={400}
                  fontSize={12}
                  gutterBottom
                  sx={{ color: "grey.700" }}
                >
                  Email
                </Typography>
                <Box display="flex" columnGap={1} alignItems="center">
                  <MailOutlineOutlinedIcon sx={{ color: "grey.700" }} />
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    sx={{ color: "grey.700" }}
                  >
                    {email}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
          <Box>
            {editMode ? (
              <TextField
                variant="filled"
                label="Subscription"
                fullWidth
                sx={{ mb: 1 }}
                value={updatedContactDetails.subscription}
                onChange={(e) =>
                  setUpdatedContactDetails({
                    ...updatedContactDetails,
                    subscription: e.target.value,
                  })
                }
              />
            ) : (
              <Box>
                <Typography
                  variant="body2"
                  fontWeight={400}
                  fontSize={12}
                  gutterBottom
                  sx={{ color: "grey.700" }}
                >
                  Subscription
                </Typography>
                <Box display="flex" columnGap={1} alignItems="center">
                  <ContactMailOutlinedIcon sx={{ color: "grey.700" }} />
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    sx={{ color: "grey.700" }}
                  >
                    {subscription}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
          <Box>
            {editMode ? (
              <TextField
                variant="filled"
                label="Language"
                fullWidth
                sx={{ mb: 1 }}
                value={updatedContactDetails.language}
                onChange={(e) =>
                  setUpdatedContactDetails({
                    ...updatedContactDetails,
                    language: e.target.value,
                  })
                }
              />
            ) : (
              <Box>
                <Typography
                  variant="body2"
                  fontWeight={400}
                  fontSize={12}
                  gutterBottom
                  sx={{ color: "grey.700" }}
                >
                  Language
                </Typography>
                <Box display="flex" columnGap={1} alignItems="center">
                  <LanguageOutlinedIcon sx={{ color: "grey.700" }} />
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    sx={{ color: "grey.700" }}
                  >
                    {language}
                  </Typography>
                </Box>
              </Box>
            )}
            <Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mt={2}
              >
                <Typography
                  variant="body1"
                  fontWeight={600}
                  sx={{ color: "grey.700" }}
                >
                  Location Details
                </Typography>
                {locationDetailsEditMode ? (
                  <IconButton onClick={handleSaveLocationDetails}>
                    <SaveIcon color="primary" />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => setLocationDetailsEditMode(true)}>
                    <EditIcon sx={{ color: "grey.700" }} />
                  </IconButton>
                )}
              </Box>
              <Divider />
              <Box display="flex" flexDirection="column" rowGap={1} mt={1}>
                {locationDetailsEditMode ? (
                  <TextField
                    variant="filled"
                    label="Government ID"
                    fullWidth
                    sx={{ mb: 1 }}
                    value={updatedLocationDetails.govId}
                    onChange={(e) =>
                      setUpdatedLocationDetails({
                        ...updatedLocationDetails,
                        govId: e.target.value,
                      })
                    }
                  />
                ) : (
                  <Box>
                    <Typography
                      variant="body2"
                      fontWeight={400}
                      fontSize={12}
                      gutterBottom
                      sx={{ color: "grey.700" }}
                    >
                      Government ID
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      sx={{ color: "grey.700" }}
                    >
                      {govId}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};
