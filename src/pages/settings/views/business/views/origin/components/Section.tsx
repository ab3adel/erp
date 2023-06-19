import React from "react";
import { Typography, Divider, Box } from "@mui/material";
import { isArray } from "lodash";

type SectionProps = {
  title: string;
  headline: string;
  subheadline: string;
  example?: string | React.ReactNode[];
  children?: React.ReactNode;
};

const Section = ({
  title,
  headline,
  subheadline,
  example,
  children,
}: SectionProps) => {
  return (
    <Box mb={5}>
      <Typography variant="body1" mb={3}>
        {title}
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <Typography variant="body1" mb={1}>
        {headline}
      </Typography>
      <Typography variant="body1" mb={3} color="text.secondary">
        {subheadline}
      </Typography>
      {example && isArray(example) ? (
        example.map((line, index) => (
          <Typography
            variant="body1"
            mb={index === example.length ? 3 : 0}
            color="text.secondary"
          >
            {line}
          </Typography>
        ))
      ) : (
        <Typography variant="body1" mb={3} color="text.secondary">
          {example}
        </Typography>
      )}
      {children}
    </Box>
  );
};

export default Section;
