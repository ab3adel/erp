import { StepLabel, Stepper as MUIStepper, Step } from "@mui/material";
import { FunctionComponent } from "react";

interface StepperProps {
  activeStep: number;
}

const Stepper: FunctionComponent<StepperProps> = (props) => {
  const steps = ["Email", "Permissions & Access", "Send Invite"];

  const { activeStep } = props;

  return (
    <MUIStepper activeStep={activeStep}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </MUIStepper>
  );
};

export default Stepper;
