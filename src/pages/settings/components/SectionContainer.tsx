import { Box } from "@mui/material";
import { FunctionComponent, ReactNode } from "react";

interface PageSectionContainerProps {
  children?: ReactNode;
}

const PageSectionContainer: FunctionComponent<PageSectionContainerProps> = (
  props
) => {
  const { children } = props;
  return (
    <Box mx="24px" py={4}>
      {children}
    </Box>
  );
};

export default PageSectionContainer;
