import { Box } from "@mui/material";
import { FunctionComponent, ReactNode } from "react";

interface PageSectionContainerProps {
  children?: ReactNode;
  disableGutter?: boolean;
}

const PageSectionContainer: FunctionComponent<PageSectionContainerProps> = (
  props
) => {
  const { children, disableGutter } = props;
  return (
    <Box mx={!disableGutter ? "24px" : undefined} py={4}>
      {children}
    </Box>
  );
};

export default PageSectionContainer;
