import { CircularProgressWithLabel } from "@/shared/components/CircularProgressWithLabel";
import {
  Paper,
  Box,
  Badge,
  Avatar,
  Typography,
  IconButton,
  Divider,
  Tooltip,
} from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOfferOutlined";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";
import StayCurrentPortraitOutlinedIcon from "@mui/icons-material/StayCurrentPortraitOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";

import { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import TextField from "@mui/material/TextField";
import { useQuery } from "@apollo/client";
import { accountProfile } from "../graphql/queries/accountProfile";
import { Account } from "@/shared/models/models";
import { useParams } from "react-router-dom";

export const UserProfileInfo: React.FC = () => {
  const [editMode, setEditMode] = useState(false);
  const { id } = useParams();

  const [updatedContactDetails, setUpdatedContactDetails] = useState<{
    email: string | undefined;
    language: string | undefined;
    mobile: string | undefined;
    subscription_type: string | undefined;
    whatsapp: string | undefined;
  }>();
  const [updatedLocationDetails, setUpdatedLocationDetails] = useState<{
    government_id: string;
  }>();

  const { data } = useQuery<{ account: Account }, { id: number }>(
    accountProfile,
    {
      variables: {
        id: Number(id),
      },
      onCompleted: (data) => {
        setUpdatedContactDetails({
          email: "mostafa@gmail.com",
          language: data.account.language,
          mobile: "953434343",
          subscription_type: data.account.subscription_type,
          whatsapp: "953434343",
        });
        setUpdatedLocationDetails({
          government_id: data.account.government_id,
        });
      },
    }
  );
  const [locationDetailsEditMode, setLocationDetailsEditMode] = useState(false);

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

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        maxWidth: {
          xs: "100%",
          md: 300,
        },
        width: "100%",
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
            {data?.account.name}
          </Typography>
          <Typography
            variant="body2"
            fontWeight={500}
            fontSize={12}
            sx={{ color: "text.secondary", mb: 1 }}
          >
            Account ID : {data?.account.id}
          </Typography>
          <Typography
            variant="body2"
            fontWeight={500}
            sx={{ color: "primary.main", mb: 1 }}
          >
            {data?.account.accountType?.category}
          </Typography>
          <Box display="flex" columnGap={2} justifyContent="center">
            <Tooltip title="Completness">
              <CircularProgressWithLabel
                value={data?.account.completeness || 0}
                color="secondary"
              />
            </Tooltip>
            <Tooltip title="Tags">
              <IconButton
                sx={{
                  border: (theme) => `1px solid ${theme.palette.primary.main}`,
                }}
              >
                <LocalOfferIcon sx={{ color: "primary.main" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="message">
              <IconButton
                sx={{
                  border: (theme) => `1px solid ${theme.palette.primary.main}`,
                }}
              >
                <SmsOutlinedIcon sx={{ color: "primary.main" }} />
              </IconButton>
            </Tooltip>
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
            <IconButton onClick={handleSave} title="Save">
              <SaveIcon color="primary" />
            </IconButton>
          ) : (
            <Tooltip title="Edit">
              <IconButton onClick={() => setEditMode(true)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
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
                value={updatedContactDetails?.mobile}
                onChange={(e) =>
                  setUpdatedContactDetails({
                    ...updatedContactDetails!,
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
                    943454523
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
                value={updatedContactDetails?.whatsapp}
                onChange={(e) =>
                  setUpdatedContactDetails({
                    ...updatedContactDetails!,
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
                    943454523
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
                value={updatedContactDetails?.email}
                onChange={(e) =>
                  setUpdatedContactDetails({
                    ...updatedContactDetails!,
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
                    mostafamilly6@gmail.com
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
                value={updatedContactDetails?.subscription_type}
                onChange={(e) =>
                  setUpdatedContactDetails({
                    ...updatedContactDetails!,
                    subscription_type: e.target.value,
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
                    {data?.account.subscription_type}
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
                value={updatedContactDetails?.language}
                onChange={(e) =>
                  setUpdatedContactDetails({
                    ...updatedContactDetails!,
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
                    {data?.account.language}
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
                  <Tooltip title="Save">
                    <IconButton onClick={handleSaveLocationDetails}>
                      <SaveIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Edit">
                    <IconButton
                      onClick={() => setLocationDetailsEditMode(true)}
                    >
                      <EditIcon sx={{ color: "grey.700" }} />
                    </IconButton>
                  </Tooltip>
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
                    value={updatedLocationDetails?.government_id}
                    onChange={(e) =>
                      setUpdatedLocationDetails({
                        ...updatedLocationDetails,
                        government_id: e.target.value,
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
                      {data?.account.government_id}
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
