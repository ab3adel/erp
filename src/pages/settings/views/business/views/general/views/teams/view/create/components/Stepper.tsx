import { StepLabel, Stepper as MUIStepper, Step } from "@mui/material";
import { FunctionComponent } from "react";

interface StepperProps {}

const Stepper: FunctionComponent<StepperProps> = () => {
  const steps = ["Email", "Permissions & Access", "Send Invite"];

  return (
    <MUIStepper activeStep={1}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </MUIStepper>
  );
};

export default Stepper;
