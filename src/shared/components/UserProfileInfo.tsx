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
          <IconButton>
            <EditIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box mt={2} display="flex" flexDirection="column" rowGap={1}>
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
        </Box>
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
            <IconButton>
              <EditIcon sx={{ color: "grey.700" }} />
            </IconButton>
          </Box>
          <Divider />
          <Box display="flex" flexDirection="column" rowGap={1} mt={1}>
            <Typography
              variant="body2"
              fontWeight={400}
              fontSize={12}
              gutterBottom
              sx={{ color: "grey.700" }}
            >
              Govrment ID
            </Typography>
            <Typography
              variant="body2"
              fontWeight={500}
              sx={{ color: "grey.700" }}
            >
              {govId}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};
