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
  Button,
  Menu,
  MenuItem,
  Backdrop,
  CircularProgress,
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
import { saveAccount } from "@/pages/relationships/views/accounts/graphql/mutations/saveAccount";
import { useGenericMutation } from "@/shared";
import { AccountInput } from "@/pages/relationships/views/accounts/types";
import { accountTypes } from "@/pages/relationships/views/accounts/graphql/queries/AccountTypesQuery";

export const UserProfileInfo: React.FC = () => {
  const [editMode, setEditMode] = useState(false);
  const { id } = useParams();
  const { data: types } = useQuery<{
    accountTypes: {
      data: Account["accountType"][];
    };
  }>(accountTypes);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openAccType = Boolean(anchorEl);
  const [updatedContactDetails, setUpdatedContactDetails] = useState<{
    email: string | undefined;
    language: string | undefined;
    mobile: string | undefined;
    subscription_type: string | undefined;
    whatsapp: string | undefined;
  }>();
  const [updatedLocationDetails, setUpdatedLocationDetails] = useState<{
    government_id?: string;
    district?: string;
    region?: string;
    address1?: string;
    address2?: string;
  }>();
  const [edit, { loading }] = useGenericMutation<
    {
      updateOrInsertAccount: {
        id: number;
      };
    },
    Variables
  >(saveAccount, { refetchQueries: ["AccountsQuery", "accountProfile"] });

  const { data } = useQuery<{ account: Account }, { id: number }>(
    accountProfile,
    {
      variables: {
        id: Number(id),
      },
      onCompleted: (data) => {
        setUpdatedContactDetails({
          email: data.account.contacts?.find(
            (contact) => contact.type === "email"
          )?.contact_info,
          language: data.account.language,
          mobile: data.account.contacts?.find(
            (contact) => contact.type === "phone"
          )?.contact_info,
          subscription_type: data.account.subscription_type,
          whatsapp: data.account.contacts?.find(
            (contact) => contact.type === "whatsapp"
          )?.contact_info,
        });
        setUpdatedLocationDetails({
          government_id: data.account.government_id,
          address1: data.account.address1,
          address2: data.account.address2,
          district: data.account.district,
          region: data.account.region,
        });
      },
    }
  );
  const [locationDetailsEditMode, setLocationDetailsEditMode] = useState(false);

  const getAccountContact = (type: string) => {
    return data?.account.contacts?.find((contact) => contact.type === type);
  };

  const handleSave = () => {
    const updatedAccount: AccountInput = {
      id: Number(id),
      contacts: [
        {
          ...(getAccountContact("phone") && {
            id: getAccountContact("phone")?.id,
          }),
          type: "phone",
          contact_info: updatedContactDetails?.mobile,
          is_primary: true,
        },
        {
          ...(getAccountContact("whatsapp") && {
            id: getAccountContact("whatsapp")?.id,
          }),
          type: "whatsapp",
          contact_info: updatedContactDetails?.whatsapp,
          is_primary: true,
        },
        {
          ...(getAccountContact("email") && {
            id: getAccountContact("email")?.id,
          }),
          type: "email",
          contact_info: updatedContactDetails?.email,
          is_primary: true,
        },
      ],
      subscription_type: updatedContactDetails?.subscription_type,
      language: updatedContactDetails?.language,
    };
    edit({
      variables: {
        input: updatedAccount,
      },
    });
    setEditMode(false);
  };

  const handleSaveLocationDetails = () => {
    const updatedLocationInput: AccountInput = {
      id: Number(id),
      ...updatedLocationDetails,
    };

    edit({
      variables: {
        input: updatedLocationInput,
      },
    });
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
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
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
          <Button
            variant="text"
            sx={{ color: "primary.main", mb: 1 }}
            onClick={(e) => {
              setAnchorEl(anchorEl ? null : e.currentTarget);
            }}
          >
            {data?.account.accountType?.category}
          </Button>
          <Menu
            open={openAccType}
            anchorEl={anchorEl}
            onClose={() => {
              setAnchorEl(null);
            }}
          >
            {types?.accountTypes.data.map((type) => (
              <MenuItem
                key={type?.id}
                onClick={() => {
                  setAnchorEl(null);
                  edit({
                    variables: {
                      input: {
                        id: Number(id),
                        type_id: type?.id as number,
                      },
                    },
                  });
                }}
              >
                {type?.name}
              </MenuItem>
            ))}
          </Menu>
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
          <Box mb={2}>
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
                    fontWeight={600}
                    sx={{ color: "text.primary" }}
                  >
                    {
                      data?.account.contacts?.find(
                        (contact) => contact.type === "phone"
                      )?.contact_info
                    }
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
          <Box mb={2}>
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
                    fontWeight={600}
                    sx={{ color: "text.primary" }}
                  >
                    {
                      data?.account.contacts?.find(
                        (contact) => contact.type === "whatsapp"
                      )?.contact_info
                    }
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
          <Box mb={2}>
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
                    fontWeight={600}
                    sx={{ color: "text.primary" }}
                  >
                    {
                      data?.account.contacts?.find(
                        (contact) => contact.type === "email"
                      )?.contact_info
                    }
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
          <Box mb={2}>
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
                select
              >
                {["sms", "whatsapp", "none"].map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
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
                    fontWeight={600}
                    sx={{ color: "text.primary" }}
                  >
                    {data?.account.subscription_type}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
          <Box mb={2}>
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
                select
              >
                {[
                  "Australia",
                  "Brazil",
                  "Canada",
                  "China",
                  "East Africa",
                  "Finland",
                  "France",
                  "Germany",
                  "Hong Kong",
                  "India",
                  "Ireland",
                  "Italy",
                  "Japan",
                  "Mexico and Central America",
                  "Netherlands",
                  "New Zealand",
                  "Sout America",
                  "Spain",
                  "Sweden",
                  "United Kingdom",
                  "United States",
                ].map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </TextField>
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
                    fontWeight={600}
                    sx={{ color: "text.primary" }}
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
                  <>
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
                    <TextField
                      variant="filled"
                      label="District"
                      fullWidth
                      sx={{ mb: 1 }}
                      value={updatedLocationDetails?.district}
                      onChange={(e) =>
                        setUpdatedLocationDetails({
                          ...updatedLocationDetails,
                          district: e.target.value,
                        })
                      }
                    />
                    <TextField
                      variant="filled"
                      label="Zone"
                      fullWidth
                      sx={{ mb: 1 }}
                      value={updatedLocationDetails?.region}
                      onChange={(e) =>
                        setUpdatedLocationDetails({
                          ...updatedLocationDetails,
                          region: e.target.value,
                        })
                      }
                    />
                    <TextField
                      variant="filled"
                      label="Address1"
                      fullWidth
                      sx={{ mb: 1 }}
                      value={updatedLocationDetails?.address1}
                      onChange={(e) =>
                        setUpdatedLocationDetails({
                          ...updatedLocationDetails,
                          address1: e.target.value,
                        })
                      }
                    />
                    <TextField
                      variant="filled"
                      label="Address2"
                      fullWidth
                      sx={{ mb: 1 }}
                      value={updatedLocationDetails?.address2}
                      onChange={(e) =>
                        setUpdatedLocationDetails({
                          ...updatedLocationDetails,
                          address2: e.target.value,
                        })
                      }
                    />
                  </>
                ) : (
                  <Box display="flex" flexDirection="column" rowGap={3}>
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
                        fontWeight={400}
                        sx={{ color: "text.primary" }}
                      >
                        {data?.account.government_id}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant="body2"
                        fontWeight={400}
                        fontSize={12}
                        gutterBottom
                        sx={{ color: "grey.700" }}
                      >
                        District
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight={400}
                        sx={{ color: "text.primary" }}
                      >
                        {data?.account.district}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant="body2"
                        fontWeight={400}
                        fontSize={12}
                        gutterBottom
                        sx={{ color: "grey.700" }}
                      >
                        Zone
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight={400}
                        sx={{ color: "text.primary" }}
                      >
                        {data?.account.region}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant="body2"
                        fontWeight={400}
                        fontSize={12}
                        gutterBottom
                        sx={{ color: "grey.700" }}
                      >
                        Address1
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight={400}
                        sx={{ color: "text.primary" }}
                      >
                        {data?.account.address1}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant="body2"
                        fontWeight={400}
                        fontSize={12}
                        gutterBottom
                        sx={{ color: "grey.700" }}
                      >
                        Address2
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight={400}
                        sx={{ color: "text.primary" }}
                      >
                        {data?.account.address2}
                      </Typography>
                    </Box>
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

type Variables = {
  input: AccountInput;
};
