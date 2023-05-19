import { Box, Typography, Avatar, Button } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/FileUpload";
import AboutIcon from "@mui/icons-material/InfoOutlined";
import { useRef, useState } from "react";
import { GeneralInfoForm } from "./components/GeneralInfoForm";

export const General = () => {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUplaodClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  return (
    <Box mx="24px">
      <Box py={7}>
        <Typography variant="h2" sx={{ color: "common.black", mb: "16px" }}>
          Your Profile
        </Typography>
        <Typography variant="body1">
          These are the general settings of your account profile.
        </Typography>
      </Box>
      <Box>
        <Typography variant="body1">Avatar</Typography>
        <Box display="flex" columnGap={2} py={2}>
          <Avatar
            onClick={handleUplaodClick}
            src={selectedImage}
            sx={{ height: "40px", width: "40px" }}
          >
            OP
          </Avatar>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
          <Box>
            <Button
              variant="outlined"
              startIcon={<UploadFileIcon />}
              sx={{ textTransform: "uppercase", mb: 1 }}
              onClick={handleUplaodClick}
            >
              upload file
            </Button>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                display: "flex",
                alignItems: "center",
              }}
            >
              <AboutIcon sx={{ mr: 1 }} fontSize="small" /> Ideal dimensions:
              100 x 100 pixels.
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box my={1}>
        <GeneralInfoForm />
      </Box>
    </Box>
  );
};
