import { Avatar, Box, Button } from "@mui/material";
import { FunctionComponent, ReactNode, useRef } from "react";
import UploadFileIcon from "@mui/icons-material/FileUpload";

interface AvatarInputProps {
  helperText?: ReactNode;
  abbreviation?: string;
  src?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const AvatarInput: FunctionComponent<AvatarInputProps> = (props) => {
  const { helperText, src, onChange, abbreviation } = props;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => fileInputRef?.current?.click();

  return (
    <Box display="flex" columnGap={2} py={2}>
      <Avatar
        onClick={handleClick}
        src={src}
        sx={{ height: "40px", width: "40px" }}
      >
        {abbreviation}
      </Avatar>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={onChange}
      />
      <Box>
        <Button
          variant="outlined"
          startIcon={<UploadFileIcon />}
          sx={{ textTransform: "uppercase", mb: 1 }}
          onClick={handleClick}
        >
          upload file
        </Button>
        {helperText}
      </Box>
    </Box>
  );
};

export default AvatarInput;
