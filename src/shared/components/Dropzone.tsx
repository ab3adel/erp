import { useState } from "react";
import { Avatar, Box } from "@mui/material";
import { PersonOutline } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";

function readFile(file: any): any {
  return new Promise(function (resolve, reject) {
    const reader = new FileReader();

    reader.onload = function (event) {
      let _event$target;

      resolve(
        event === null || event === void 0
          ? void 0
          : (_event$target = event.target) === null || _event$target === void 0
          ? void 0
          : _event$target.result
      );
    };

    reader.onerror = function (event) {
      reader.abort();
      reject(event);
    };

    reader.readAsDataURL(file);
  });
}

function Dropzone() {
  const { getRootProps, getInputProps, open } = useDropzone({
    accept: {
      "image/*": [".png", ".gif", ".jpeg", ".jpg"],
    },
    maxFiles: 1,
    multiple: false,
    noClick: true,
    onDrop: async (files) => {
      const file = await readFile(files[0]);
      setFile(file);
    },
  });

  const [file, setFile] = useState();

  return (
    <Box
      height="144px"
      border="1px dashed #E0E0E0"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={1}
      {...getRootProps()}
      p={3}
    >
      <input {...getInputProps()} />
      <Avatar
        src={file}
        sx={{
          backgroundColor: "#008E8F0A",
          width: "64px",
          height: "64px",
          marginTop: 3,
        }}
      >
        <PersonOutline sx={{ color: "primary.dark" }} />
      </Avatar>
      <Box display="flex" gap="12px">
        <Box
          component="span"
          sx={{
            color: "primary.main",
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={open}
        >
          Click to upload
        </Box>
        <Box component="span">or drag and drop</Box>
      </Box>
    </Box>
  );
}

export default Dropzone;
